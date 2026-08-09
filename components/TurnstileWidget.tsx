"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileOptions = {
  sitekey: string;
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
  size?: "normal" | "flexible" | "compact";
  theme?: "auto" | "light" | "dark";
  retry?: "auto" | "never";
  "refresh-expired"?: "auto" | "manual" | "never";
  "response-field"?: boolean;
  callback: (token: string) => void;
  "error-callback": (errorCode: string) => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function TurnstileWidget({
  siteKey,
  onTokenChange,
  onVerificationError,
}: {
  siteKey?: string;
  onTokenChange: (token: string | null) => void;
  onVerificationError: (message?: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onVerificationErrorRef = useRef(onVerificationError);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onVerificationErrorRef.current = onVerificationError;
  }, [onTokenChange, onVerificationError]);

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) return;

    const resetVerification = (message: string, shouldReset = true) => {
      onTokenChangeRef.current(null);
      onVerificationErrorRef.current(message);
      if (shouldReset) {
        window.setTimeout(() => {
          if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
        }, 0);
      }
    };

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "rental_application",
      appearance: "interaction-only",
      size: "flexible",
      theme: "light",
      retry: "never",
      "refresh-expired": "never",
      "response-field": false,
      callback: (token) => {
        onVerificationErrorRef.current();
        onTokenChangeRef.current(token);
      },
      "error-callback": (errorCode) => {
        const isConfigurationError = ["110100", "110110", "110200", "400020", "400070"].includes(errorCode);
        resetVerification(
          isConfigurationError
            ? "Secure verification is temporarily unavailable. Please try again later."
            : "We couldn't verify that you're human. Please try again.",
          !isConfigurationError,
        );
      },
      "expired-callback": () => resetVerification("Verification expired. Please complete it again."),
      "timeout-callback": () => resetVerification("Verification timed out. Please try again."),
    });

    return () => {
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [scriptReady, siteKey]);

  if (!siteKey) {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900" role="status">
        Secure verification is temporarily unavailable. Please try again later.
      </p>
    );
  }

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-[65px] w-full" aria-label="Security verification" />
    </>
  );
}