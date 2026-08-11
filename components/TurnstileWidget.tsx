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

  const [scriptReady, setScriptReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile)
  );

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onVerificationErrorRef.current = onVerificationError;
  }, [onTokenChange, onVerificationError]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.turnstile) {
      setScriptReady(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) return;

    let stallTimer: number | undefined;
    const clearStallTimer = () => {
      if (stallTimer !== undefined) window.clearTimeout(stallTimer);
    };

    const resetVerification = (message: string, shouldReset = true) => {
      clearStallTimer();
      onTokenChangeRef.current(null);
      onVerificationErrorRef.current(message);
      if (shouldReset) {
        window.setTimeout(() => {
          if (widgetIdRef.current) {
            try {
              window.turnstile?.reset(widgetIdRef.current);
            } catch {
              // Ignore reset errors
            }
          }
        }, 0);
      }
    };

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "rental_application",
        appearance: "always",
        size: "flexible",
        theme: "light",
        retry: "never",
        "refresh-expired": "never",
        "response-field": false,
        callback: (token) => {
          clearStallTimer();
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
    } catch {
      resetVerification("Could not initialize security verification. Please reload the page.", false);
    }

    stallTimer = window.setTimeout(() => {
      resetVerification(
        "Verification is taking longer than expected. Try reloading the page or opening this site in a standard browser tab.",
        false,
      );
    }, 15_000);

    return () => {
      clearStallTimer();
      if (widgetIdRef.current) {
        try {
          window.turnstile?.remove(widgetIdRef.current);
        } catch {
          // Ignore remove errors
        }
      }
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
        onError={() => onVerificationErrorRef.current("Security verification script failed to load. Please check your network or ad blocker.")}
      />
      <div ref={containerRef} className="min-h-[65px] w-full" aria-label="Security verification" />
    </>
  );
}