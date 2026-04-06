"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInLocalUser,
  signUpLocalUser,
} from "../../lib/local-auth";

import { Footer } from "../../components/layout/Footer";

type AuthMode = "sign-in" | "sign-up";

const initialFormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: false,
};

export default function RegisterPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"error" | "success">("success");

  function updateField<K extends keyof typeof initialFormState>(
    key: K,
    value: (typeof initialFormState)[K],
  ) {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleModeChange(nextMode: AuthMode) {
    setMode(nextMode);
    setStatusMessage("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const result =
        mode === "sign-up"
          ? signUpLocalUser({
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password,
            })
          : signInLocalUser({
              email: formData.email,
              password: formData.password,
            });

      if (result.ok) {
        setStatusTone("success");
        setStatusMessage("Success! Redirecting...");
        window.setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 500);
      } else {
        setStatusTone("error");
        setStatusMessage(result.message);
        setIsSubmitting(false);
      }
    } catch {
      setStatusTone("error");
      setStatusMessage("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface lg:flex-row">
      {/* Hero / Brand Panel - Hidden on small mobile, shown on tablet/desktop */}
      <div className="relative hidden w-full shrink-0 items-center justify-center overflow-hidden bg-primary px-8 py-12 text-on-primary md:flex lg:w-[45%] lg:px-12 xl:w-[50%]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(0_107_63),rgb(0_135_81))]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7pOwsVZUE-iOoFLPhpdqjrYzxvbY_w56rB2-C3yRZu4xCL8DEdI8joO17Wh1HOoiHqFSzmFgENRIFHqgDnXLm706vXA44bwPodBmtP8mHLQj7uJAJOIP7zfjvIJdymCm-7tQ_T9Gkyjw8nYIDDYv9wSB9TIfVWawTtY_0DMVXUAV5I47t54BCZFoGrGi9s2wCbNI7-8ZLks63Skob3iSm9ADc_DK2mU-z6QfrwzkanT8_OzOCfqDWo_Z9sY9UonbVgxmLX6QKpIw')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <div className="relative z-10 w-full max-w-xl text-center lg:text-left">
          <Link
            className="mb-12 inline-flex items-center gap-2 font-display text-2xl font-black lg:mb-24"
            href="/"
          >
            VoteLens
          </Link>

          <div className="space-y-6 lg:space-y-8">
            <h1 className="font-display text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl xl:text-7xl">
              Architecting <br />
              <span className="text-primary-fixed">Civil Transparency.</span>
            </h1>
            <p className="text-base leading-relaxed text-on-primary/80 sm:text-lg sm:leading-8">
              Join the official platform for verified civic data in Nigeria.
              Build your profile, track your polling unit, and participate in
              the future of democracy.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 border-t border-white/10 pt-12 lg:mt-24 lg:flex-row lg:items-start lg:gap-12 lg:pt-16">
            {[
              ["24M+", "Verified Users"],
              ["176K+", "Polling Units"],
            ].map(([value, label]) => (
              <div key={label}>
                <span className="font-display block text-2xl font-black text-primary-fixed lg:text-3xl">
                  {value}
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Form Panel */}
      <div className="flex w-full flex-1 flex-col px-6 py-12 sm:px-12 lg:px-16 lg:py-16 xl:px-24">
        <div className="mb-12 flex items-center justify-between md:hidden">
          <Link className="font-display text-xl font-black text-primary" href="/">
            VoteLens
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant"
            type="button"
          >
            ?
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <div className="mb-10 space-y-3 text-center lg:text-left">
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-on-surface lg:text-4xl">
              {mode === "sign-in" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {mode === "sign-in"
                ? "Enter your credentials to access your civic dashboard."
                : "Join the verified network of Nigerian citizens."}
            </p>
          </div>

          <div className="mb-10 flex border-b border-outline-variant/10">
            <button
              className={`flex-1 pb-4 text-sm font-bold tracking-tight transition-all ${
                mode === "sign-in"
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              onClick={() => handleModeChange("sign-in")}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`flex-1 pb-4 text-sm font-bold tracking-tight transition-all ${
                mode === "sign-up"
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              onClick={() => handleModeChange("sign-up")}
              type="button"
            >
              Create Account
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "sign-up" && (
              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  required
                  className="w-full rounded-[0.75rem] border border-outline-variant/20 bg-surface-container-low px-4 py-3.5 text-sm transition-all focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20"
                  id="fullName"
                  name="fullName"
                  placeholder="Adebayo Ibrahim"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                required
                className="w-full rounded-[0.75rem] border border-outline-variant/20 bg-surface-container-low px-4 py-3.5 text-sm transition-all focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20"
                id="email"
                name="email"
                placeholder="adebayo@example.ng"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </label>
                {mode === "sign-in" && (
                  <a
                    className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                    href="#"
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <input
                required
                className="w-full rounded-[0.75rem] border border-outline-variant/20 bg-surface-container-low px-4 py-3.5 text-sm transition-all focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20"
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </div>

            {statusMessage && (
              <div className={`rounded-[0.5rem] p-3 text-xs font-medium ${statusTone === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                {statusMessage}
              </div>
            )}

            <button
              className="primary-button mt-4 w-full py-4 text-sm font-bold uppercase tracking-[0.16em] disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? "Processing..."
                : mode === "sign-in"
                  ? "Access Dashboard"
                  : "Register Profile"}
            </button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-outline-variant/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant/40">
              Third Party Auth
            </span>
            <div className="h-[1px] flex-1 bg-outline-variant/10" />
          </div>

          <button
            className="flex w-full items-center justify-center gap-3 rounded-[0.75rem] border border-outline-variant/20 bg-surface-container-lowest py-4 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-low"
            type="button"
          >
            <Image
              alt="Google"
              height={18}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB23t_Pz_f-6yT0-3z57_wH6W8_C7P8o_Y4k5-o_iW_z_o"
              width={18}
            />
            Continue with Google
          </button>
        </div>

        <Footer
          branding={{ name: "VoteLens", tagline: "Nigeria" }}
          links={[]}
          copyright="© 2024 VoteLens Nigeria • Public Service Infrastructure"
        />
      </div>

      {/* Floating Support - Hidden on small mobile */}
      <button
        className="fixed bottom-6 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-on-surface text-surface shadow-glass transition-transform hover:scale-110 active:scale-95 sm:flex"
        type="button"
      >
        ?
      </button>
    </div>
  );
}
