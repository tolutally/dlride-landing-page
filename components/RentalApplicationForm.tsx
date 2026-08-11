"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  FileText,
  LoaderCircle,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";

type Fields = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  rental_start_date: string;
  pickup_time: string;
  dropoff_time: string;
  rental_end_date: string;
  intended_vehicle_use: string;
  payment_method: string;
  additional_information: string;
  sms_consent: boolean;
};

type ErrorKey = keyof Fields | "drivers_license" | "proof_of_address" | "turnstile" | "submit";
type Errors = Partial<Record<ErrorKey, string>>;

type ApplicationSuccessResponse = {
  success: true;
  data: {
    application_number: string;
  };
};

type ApplicationErrorResponse = {
  success: false;
  error?: {
    code?: string;
    message?: string;
    fields?: unknown;
    field_errors?: unknown;
  };
  errors?: unknown;
};

const initialFields: Fields = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  street_address: "",
  city: "",
  state: "",
  postal_code: "",
  rental_start_date: "",
  pickup_time: "",
  dropoff_time: "",
  rental_end_date: "",
  intended_vehicle_use: "",
  payment_method: "",
  additional_information: "",
  sms_consent: false,
};

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2F5FAF] focus:ring-4 focus:ring-blue-100";
const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-100";
const acceptedDocuments = ".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf";
const submissionTimeoutMs = 30_000;
const backendFieldNames: Partial<Record<string, ErrorKey>> = {
  first_name: "first_name",
  last_name: "last_name",
  email: "email",
  phone: "phone",
  street_address: "street_address",
  city: "city",
  state: "state",
  postal_code: "postal_code",
  rental_start_date: "rental_start_date",
  pickup_time: "pickup_time",
  dropoff_time: "dropoff_time",
  rental_end_date: "rental_end_date",
  intended_vehicle_use: "intended_vehicle_use",
  payment_method: "payment_method",
  additional_information: "additional_information",
  sms_consent: "sms_consent",
  drivers_license: "drivers_license",
  proof_of_address: "proof_of_address",
  "cf-turnstile-response": "turnstile",
};

function todayISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
}

function daysBetween(start: string, end: string) {
  if (!start || !end) return null;
  const startTime = Date.parse(`${start}T00:00:00Z`);
  const endTime = Date.parse(`${end}T00:00:00Z`);
  return Math.round((endTime - startTime) / 86_400_000);
}

function minimumEndDate(start: string) {
  if (!start) return undefined;
  const date = new Date(`${start}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 7);
  return date.toISOString().slice(0, 10);
}

function isAcceptedDocument(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "pdf"].includes(extension ?? "");
}

function parseFieldErrors(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.entries(value).reduce<Errors>((mapped, [field, message]) => {
    const errorKey = backendFieldNames[field];
    const errorMessage = Array.isArray(message) ? message.find((item) => typeof item === "string") : message;
    if (errorKey && typeof errorMessage === "string") mapped[errorKey] = errorMessage;
    return mapped;
  }, {});
}

function isApplicationSuccess(value: unknown): value is ApplicationSuccessResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<ApplicationSuccessResponse>;
  return response.success === true && typeof response.data?.application_number === "string";
}

function getSubmissionError(response: Response, value: unknown) {
  if (response.status === 429) return "Too many application attempts. Please try again later.";
  if (!value || typeof value !== "object") return "We couldn't submit your application. Please try again.";

  const result = value as ApplicationErrorResponse;
  switch (result.error?.code) {
    case "BOT_VERIFICATION_FAILED":
      return "Verification failed. Please try again.";
    case "RATE_LIMITED":
      return "Too many application attempts. Please try again later.";
    case "VALIDATION_ERROR":
      return result.error.message || "Please review the highlighted fields and try again.";
    case "UPLOAD_ERROR":
      return "We couldn't upload your documents. Please try again.";
    default:
      return "We couldn't submit your application. Please try again.";
  }
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function SectionHeading({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#122A52] text-sm font-bold text-white">
        {number}
      </span>
      <div>
        <h3 className="text-xl font-bold tracking-tight text-[#122A52]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function DocumentUpload({
  name,
  label,
  file,
  error,
  disabled,
  onChange,
}: {
  name: "drivers_license" | "proof_of_address";
  label: string;
  file: File | null;
  error?: string;
  disabled: boolean;
  onChange: (file: File | null) => void;
}) {
  const pickerRef = useRef<HTMLInputElement>(null);
  const errorId = `${name}-error`;

  function selectFile(nextFile?: File) {
    if (!nextFile) return;
    onChange(nextFile);
  }

  function clearFile() {
    if (pickerRef.current) pickerRef.current.value = "";
    onChange(null);
  }

  return (
    <div>
      <label className="text-sm font-semibold text-slate-800" htmlFor={`${name}-picker`}>
        {label} <span className="text-red-600" aria-hidden="true">*</span>
      </label>
      <p className="mt-1 text-sm text-slate-500">JPG, JPEG, PNG or PDF</p>

      {file ? (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">{file.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Ready to upload
            </p>
          </div>
          <button
            type="button"
            onClick={clearFile}
            disabled={disabled}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Remove ${label.toLowerCase()}`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className={`mt-3 rounded-xl border border-dashed p-4 ${error ? "border-red-400 bg-red-50/40" : "border-slate-300 bg-slate-50"}`}>
          <label
            htmlFor={`${name}-picker`}
            className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2F5FAF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#264E91] focus-within:ring-4 focus-within:ring-blue-200"
          >
            <Upload className="h-4 w-4" aria-hidden="true" /> Choose file
            <input
              ref={pickerRef}
              id={`${name}-picker`}
              name={name}
              type="file"
              disabled={disabled}
              accept={acceptedDocuments}
              className="sr-only"
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => selectFile(event.target.files?.[0])}
            />
          </label>
        </div>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default function RentalApplicationForm() {
  const router = useRouter();
  const [fields, setFields] = useState(initialFields);
  const [driversLicense, setDriversLicense] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileAttempt, setTurnstileAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const submissionLockRef = useRef(false);
  const rentalDays = daysBetween(fields.rental_start_date, fields.rental_end_date);
  const rentalWeeks = rentalDays !== null && rentalDays >= 7 ? Math.ceil(rentalDays / 7) : null;
  const today = todayISO();

  function updateField<Key extends keyof Fields>(key: Key, value: Fields[Key]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, submit: undefined }));
  }

  function validate() {
    const next: Errors = {};
    const required: Array<[keyof Fields, string]> = [
      ["first_name", "Please enter your first name."],
      ["last_name", "Please enter your last name."],
      ["email", "Please enter your email address."],
      ["phone", "Please enter your phone number."],
      ["street_address", "Please enter your street address."],
      ["city", "Please enter your city."],
      ["state", "Please enter your state."],
      ["postal_code", "Please enter your ZIP code."],
      ["rental_start_date", "Please select a rental start date."],
      ["pickup_time", "Please select a pickup time."],
      ["dropoff_time", "Please select a drop-off time."],
      ["rental_end_date", "Please select a rental end date."],
      ["intended_vehicle_use", "Please select how you plan to use the vehicle."],
      ["payment_method", "Please select a preferred payment method."],
    ];

    required.forEach(([key, message]) => {
      if (typeof fields[key] === "string" && !fields[key].trim()) next[key] = message;
    });

    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (fields.rental_start_date && fields.rental_start_date < today) {
      next.rental_start_date = "Rental start date cannot be in the past.";
    }
    if (fields.rental_start_date && fields.rental_end_date) {
      if (rentalDays !== null && rentalDays <= 0) {
        next.rental_end_date = "Rental end date must be after the start date.";
      } else if (rentalDays !== null && rentalDays < 7) {
        next.rental_end_date = "Minimum rental period is 7 days.";
      }
    }
    if (!driversLicense) next.drivers_license = "Please upload your driver's licence.";
    if (driversLicense && !isAcceptedDocument(driversLicense)) {
      next.drivers_license = "Upload a JPG, JPEG, PNG or PDF file.";
    }
    if (!proofOfAddress) next.proof_of_address = "Please upload proof of address.";
    if (proofOfAddress && !isAcceptedDocument(proofOfAddress)) {
      next.proof_of_address = "Upload a JPG, JPEG, PNG or PDF file.";
    }
    if (!fields.sms_consent) {
      next.sms_consent = "You must consent to SMS notifications before submitting.";
    }
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      next.turnstile = "Please complete the security verification before submitting.";
    }

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLockRef.current) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => {
        const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
        firstInvalid?.focus();
      });
      return;
    }

    submissionLockRef.current = true;
    setIsSubmitting(true);
    setErrors((current) => ({ ...current, submit: undefined }));
    const nativePayload = new FormData(event.currentTarget);
    const submissionPayload = new FormData();
    Object.entries(fields).forEach(([name, value]) => {
      submissionPayload.set(name, typeof value === "boolean" ? String(value) : value);
    });
    submissionPayload.set("company_name", String(nativePayload.get("company_name") ?? ""));
    submissionPayload.set("cf-turnstile-response", turnstileToken ?? "");
    if (driversLicense) submissionPayload.set("drivers_license", driversLicense);
    if (proofOfAddress) submissionPayload.set("proof_of_address", proofOfAddress);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), submissionTimeoutMs);
    let submitted = false;

    try {
      const response = await fetch("/applications", {
        method: "POST",
        body: submissionPayload,
        signal: controller.signal,
      });
      const contentType = response.headers.get("content-type") ?? "";
      let result: unknown = null;
      if (contentType.includes("application/json")) {
        try {
          result = await response.json();
        } catch {
          result = null;
        }
      }

      if (response.ok && isApplicationSuccess(result)) {
        submitted = true;
        router.push(`/apply/success?application=${encodeURIComponent(result.data.application_number)}`);
        return;
      }

      const errorResponse = result && typeof result === "object" ? result as ApplicationErrorResponse : null;
      const fieldErrors = parseFieldErrors(errorResponse?.error?.fields ?? errorResponse?.error?.field_errors ?? errorResponse?.errors);
      const submitError = getSubmissionError(response, result);
      setErrors({
        ...fieldErrors,
        turnstile: errorResponse?.error?.code === "BOT_VERIFICATION_FAILED" ? submitError : fieldErrors.turnstile,
        submit: submitError,
      });
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
    } catch (error) {
      setErrors((current) => ({
        ...current,
        submit: error instanceof DOMException && error.name === "AbortError"
          ? "The request timed out. Please try again."
          : "We couldn't connect to the application service. Please check your connection and try again.",
      }));
    } finally {
      window.clearTimeout(timeout);
      if (!submitted) {
        setTurnstileToken(null);
        setTurnstileAttempt((current) => current + 1);
        submissionLockRef.current = false;
        setIsSubmitting(false);
      }
    }
  }

  function textField(
    name: keyof Pick<Fields, "first_name" | "last_name" | "email" | "phone" | "street_address" | "city" | "state" | "postal_code">,
    label: string,
    options: { type?: string; autoComplete?: string; inputMode?: "email" | "tel" | "numeric" } = {},
  ) {
    const errorId = `${name}-error`;
    return (
      <div className={name === "street_address" ? "sm:col-span-2" : undefined}>
        <label htmlFor={name} className="text-sm font-semibold text-slate-800">
          {label} <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id={name}
          name={name}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          inputMode={options.inputMode}
          value={fields[name]}
          onChange={(event) => updateField(name, event.target.value)}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? errorId : undefined}
          className={`${inputClass} ${errors[name] ? errorInputClass : ""}`}
        />
        <FieldError id={errorId} message={errors[name]} />
      </div>
    );
  }

  return (
    <form ref={formRef} className="mt-10 border-t border-slate-200 pt-10" noValidate onSubmit={handleSubmit}>
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_name">Company Name</label>
        <input id="company_name" name="company_name" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="mb-10 flex items-center justify-between gap-3 overflow-x-auto pb-2" aria-label="Application sections">
        {["Personal", "Address", "Rental", "Documents", "Consent"].map((label, index) => (
          <div key={label} className="flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF]">{index + 1}</span>
            <span className="hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>

      <section aria-labelledby="personal-heading">
        <div id="personal-heading"><SectionHeading number={1} title="Personal information" description="Tell us how to reach you about your application." /></div>
        <div className="grid gap-5 sm:grid-cols-2">
          {textField("first_name", "First Name", { autoComplete: "given-name" })}
          {textField("last_name", "Last Name", { autoComplete: "family-name" })}
          {textField("email", "Email Address", { type: "email", autoComplete: "email", inputMode: "email" })}
          {textField("phone", "Phone Number", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="address-heading">
        <div id="address-heading"><SectionHeading number={2} title="Address" description="Enter your current residential address." /></div>
        <div className="grid gap-5 sm:grid-cols-2">
          {textField("street_address", "Street Address", { autoComplete: "street-address" })}
          {textField("city", "City", { autoComplete: "address-level2" })}
          {textField("state", "State", { autoComplete: "address-level1" })}
          {textField("postal_code", "ZIP Code", { autoComplete: "postal-code", inputMode: "numeric" })}
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="rental-heading">
        <div id="rental-heading"><SectionHeading number={3} title="Rental details" description="Choose dates and tell us how you plan to use the car." /></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="rental_start_date" className="text-sm font-semibold text-slate-800">Rental Start Date <span className="text-red-600" aria-hidden="true">*</span></label>
            <input
              id="rental_start_date"
              name="rental_start_date"
              type="date"
              min={today}
              value={fields.rental_start_date}
              onChange={(event) => updateField("rental_start_date", event.target.value)}
              aria-invalid={Boolean(errors.rental_start_date)}
              aria-describedby={errors.rental_start_date ? "rental-start-error" : undefined}
              className={`${inputClass} ${errors.rental_start_date ? errorInputClass : ""}`}
            />
            <FieldError id="rental-start-error" message={errors.rental_start_date} />
          </div>
          <div>
            <label htmlFor="rental_end_date" className="text-sm font-semibold text-slate-800">Rental End Date <span className="text-red-600" aria-hidden="true">*</span></label>
            <input
              id="rental_end_date"
              name="rental_end_date"
              type="date"
              min={minimumEndDate(fields.rental_start_date)}
              value={fields.rental_end_date}
              onChange={(event) => updateField("rental_end_date", event.target.value)}
              aria-invalid={Boolean(errors.rental_end_date)}
              aria-describedby={errors.rental_end_date ? "rental-end-error" : undefined}
              className={`${inputClass} ${errors.rental_end_date ? errorInputClass : ""}`}
            />
            <FieldError id="rental-end-error" message={errors.rental_end_date} />
          </div>

          <div>
            <label htmlFor="pickup_time" className="text-sm font-semibold text-slate-800">Pickup Time <span className="text-red-600" aria-hidden="true">*</span></label>
            <input
              id="pickup_time"
              name="pickup_time"
              type="time"
              value={fields.pickup_time}
              onChange={(event) => updateField("pickup_time", event.target.value)}
              aria-invalid={Boolean(errors.pickup_time)}
              aria-describedby={errors.pickup_time ? "pickup-time-error" : undefined}
              className={`${inputClass} ${errors.pickup_time ? errorInputClass : ""}`}
            />
            <FieldError id="pickup-time-error" message={errors.pickup_time} />
          </div>

          <div>
            <label htmlFor="dropoff_time" className="text-sm font-semibold text-slate-800">Drop-off Time <span className="text-red-600" aria-hidden="true">*</span></label>
            <input
              id="dropoff_time"
              name="dropoff_time"
              type="time"
              value={fields.dropoff_time}
              onChange={(event) => updateField("dropoff_time", event.target.value)}
              aria-invalid={Boolean(errors.dropoff_time)}
              aria-describedby={errors.dropoff_time ? "dropoff-time-error" : undefined}
              className={`${inputClass} ${errors.dropoff_time ? errorInputClass : ""}`}
            />
            <FieldError id="dropoff-time-error" message={errors.dropoff_time} />
          </div>

          {rentalWeeks !== null && (
            <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-[#122A52]" role="status">
              <CalendarDays className="h-5 w-5 shrink-0 text-[#2F5FAF]" aria-hidden="true" />
              <p className="font-semibold">Rental duration: {rentalWeeks} {rentalWeeks === 1 ? "week" : "weeks"}</p>
            </div>
          )}

          <div>
            <label htmlFor="intended_vehicle_use" className="text-sm font-semibold text-slate-800">Intended Vehicle Use <span className="text-red-600" aria-hidden="true">*</span></label>
            <select
              id="intended_vehicle_use"
              name="intended_vehicle_use"
              value={fields.intended_vehicle_use}
              onChange={(event) => updateField("intended_vehicle_use", event.target.value)}
              aria-invalid={Boolean(errors.intended_vehicle_use)}
              aria-describedby={errors.intended_vehicle_use ? "vehicle-use-error" : undefined}
              className={`${inputClass} ${errors.intended_vehicle_use ? errorInputClass : ""}`}
            >
              <option value="">Select one</option>
              <option value="gig_work">Gig work (Uber Eats, Grubhub, etc.)</option>
              <option value="road_trips">Road trips</option>
              <option value="personal_use">Personal use</option>
              <option value="travel_nursing">Travel nursing</option>
              <option value="other">Other</option>
            </select>
            <FieldError id="vehicle-use-error" message={errors.intended_vehicle_use} />
          </div>

          <div>
            <label htmlFor="payment_method" className="text-sm font-semibold text-slate-800">Preferred Payment Method <span className="text-red-600" aria-hidden="true">*</span></label>
            <select
              id="payment_method"
              name="payment_method"
              value={fields.payment_method}
              onChange={(event) => updateField("payment_method", event.target.value)}
              aria-invalid={Boolean(errors.payment_method)}
              aria-describedby={errors.payment_method ? "payment-method-error" : undefined}
              className={`${inputClass} ${errors.payment_method ? errorInputClass : ""}`}
            >
              <option value="">Select one</option>
              <option value="Cash">Cash</option>
              <option value="e-transfer">e-Transfer</option>
              <option value="card">Card</option>
            </select>
            <FieldError id="payment-method-error" message={errors.payment_method} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="additional_information" className="text-sm font-semibold text-slate-800">Additional Information <span className="font-normal text-slate-500">(optional)</span></label>
            <textarea
              id="additional_information"
              name="additional_information"
              rows={4}
              value={fields.additional_information}
              onChange={(event) => updateField("additional_information", event.target.value)}
              className={`${inputClass} resize-y`}
              aria-describedby="additional-information-help"
            />
            <p id="additional-information-help" className="mt-2 text-sm text-slate-500">Tell us anything else that may help us review your application.</p>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="documents-heading">
        <div id="documents-heading"><SectionHeading number={4} title="Documents" description="Upload clear, readable copies. Your files will remain private." /></div>
        <div className="space-y-7">
          <DocumentUpload
            name="drivers_license"
            label="Driver's Licence"
            file={driversLicense}
            error={errors.drivers_license}
            disabled={isSubmitting}
            onChange={(file) => {
              setDriversLicense(file);
              setErrors((current) => ({ ...current, drivers_license: undefined, submit: undefined }));
            }}
          />
          <DocumentUpload
            name="proof_of_address"
            label="Proof of Address"
            file={proofOfAddress}
            error={errors.proof_of_address}
            disabled={isSubmitting}
            onChange={(file) => {
              setProofOfAddress(file);
              setErrors((current) => ({ ...current, proof_of_address: undefined, submit: undefined }));
            }}
          />
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="consent-heading">
        <div id="consent-heading"><SectionHeading number={5} title="Consent" description="Review and confirm before submitting." /></div>
        <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${errors.sms_consent ? "border-red-400 bg-red-50/40" : "border-slate-200 bg-slate-50"}`}>
          <input
            type="checkbox"
            name="sms_consent"
            checked={fields.sms_consent}
            onChange={(event) => updateField("sms_consent", event.target.checked)}
            aria-invalid={Boolean(errors.sms_consent)}
            aria-describedby={errors.sms_consent ? "sms-consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 rounded border-slate-400 accent-[#2F5FAF] focus:ring-4 focus:ring-blue-100"
          />
          <span className="text-sm leading-6 text-slate-700">
            I consent to receive SMS notifications and service-related updates from DLride Rentals LLC. Message and data rates may apply.
          </span>
        </label>
        <FieldError id="sms-consent-error" message={errors.sms_consent} />
      </section>

      <section className="mt-8" aria-labelledby="security-heading">
        <h3 id="security-heading" className="sr-only">Security verification</h3>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#122A52]">
            <ShieldCheck className="h-4 w-4 text-[#2F5FAF]" aria-hidden="true" />
            Secure verification
          </div>
          <TurnstileWidget
            key={turnstileAttempt}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
            onTokenChange={(token) => {
              setTurnstileToken(token);
              if (token) setErrors((current) => ({ ...current, turnstile: undefined }));
            }}
            onVerificationError={(message) => {
              setErrors((current) => ({ ...current, turnstile: message }));
            }}
          />
          <input type="hidden" name="cf-turnstile-response" value={turnstileToken ?? ""} readOnly />
          <FieldError id="turnstile-error" message={errors.turnstile} />
          <p className="mt-3 text-xs leading-5 text-slate-500">Verification must also be confirmed securely by the application server.</p>
        </div>
      </section>

      {errors.submit && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
          <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {errors.submit}
          </p>
        </div>
      )}

      <div className="sticky bottom-0 z-20 -mx-6 mt-8 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#2F5FAF] px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#264E91] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <ShieldCheck className="h-5 w-5" aria-hidden="true" />}
          {isSubmitting ? "Submitting application..." : "Submit application"}
        </button>
        <p className="mt-3 text-center text-xs leading-5 text-slate-500">Your documents and personal information will be handled securely.</p>
      </div>
    </form>
  );
}