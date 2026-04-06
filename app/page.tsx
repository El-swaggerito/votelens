"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  clearStoredSession,
  getStoredSession,
  type LocalSession,
} from "../lib/local-auth";

const featureCards = [
  {
    title: "Civic Dashboard",
    description:
      "Your personalized command center for upcoming elections, verified candidate profiles, and local engagement opportunities.",
    accent: "DA",
    className: "md:col-span-4 lg:col-span-3 bg-surface-container-lowest",
    bodyClassName: "text-on-surface",
    footer: (
      <div className="mt-6 flex items-center justify-between rounded-[1rem] bg-surface-container-low px-4 py-4">
        <span className="text-sm font-medium">Electoral Readiness</span>
        <span className="rounded-md bg-tertiary-container px-3 py-1 text-xs font-bold text-on-tertiary-container">
          READY
        </span>
      </div>
    ),
  },
  {
    title: "PVC Status Tracker",
    description:
      "Real-time integration with national databases to track your card&apos;s journey from registration to collection.",
    accent: "ID",
    className: "md:col-span-2 lg:col-span-3 bg-primary text-on-primary",
    bodyClassName: "text-on-primary",
    footer: (
      <button className="mt-8 rounded-full bg-on-primary px-6 py-2 text-sm font-bold text-primary">
        Check Status
      </button>
    ),
  },
  {
    title: "AI Civic Assistant",
    description:
      "Ask any question about electoral laws, polling processes, or candidate manifestos in plain language.",
    accent: "AI",
    className: "md:col-span-3 lg:col-span-2 bg-secondary text-white",
    bodyClassName: "text-white/80",
  },
  {
    title: "Polling Unit Finder",
    description:
      "Precise GPS mapping to your registered polling unit with live transit estimates and peak hour alerts.",
    accent: "PU",
    className: "md:col-span-3 lg:col-span-2 bg-surface-container-lowest",
    bodyClassName: "text-on-surface-variant",
  },
  {
    title: "Vote History",
    description:
      "Maintain a secure, encrypted record of your democratic participation and engagement milestones.",
    accent: "VH",
    className: "md:col-span-6 lg:col-span-2 bg-surface-container-lowest",
    bodyClassName: "text-on-surface-variant",
  },
];

const trustPoints = [
  {
    title: "End-to-End Encryption",
    description:
      "Your personal data and registration details are secured with bank-grade encryption protocols.",
    accent: "SE",
  },
  {
    title: "Live Sync Engine",
    description:
      "Real-time updates directly from national electoral servers ensuring you never have outdated information.",
    accent: "LS",
  },
];

const aiPrompts = [
  "What do I do if I lost my PVC?",
  "How is a winner calculated in the Guber race?",
  "Where is the nearest registration center?",
];

export default function Home() {
  const [session, setSession] = useState<LocalSession | null>(() =>
    getStoredSession(),
  );

  function handleSignOut() {
    clearStoredSession();
    setSession(null);
  }

  return (
    <div className="flex-1 bg-surface text-on-surface">
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-12 sm:px-8 lg:pb-32 lg:pt-24">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(0_107_63_/_0.05),transparent_45%,rgb(40_135_49_/_0.05))]" />
          <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <div className="flex flex-col items-center text-center space-y-8 lg:items-start lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-md bg-secondary-container px-4 py-2 text-sm font-medium text-on-secondary-fixed-variant">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tertiary-container text-xs font-bold text-on-tertiary-container">
                  ✓
                </span>
                Official Civic Data Platform
              </div>

              <div className="space-y-6">
                <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.05em] text-on-surface xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                  Your Vote,
                  <br />
                  <span className="text-primary">Your Voice,</span>
                  <br />
                  Your Future
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg sm:leading-8 lg:text-xl">
                  Navigate the democratic landscape with architectural precision.
                  VoteLens provides the verified data and tools you need to build
                  Nigeria&apos;s future.
                </p>
                {session ? (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold tracking-[0.14em] text-primary">
                      Signed in locally as {session.fullName}
                    </p>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                    >
                      Go to Dashboard →
                    </Link>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col w-full xs:flex-row xs:w-auto gap-4 pt-2">
                {session ? (
                  <button
                    className="primary-button flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold w-full xs:w-auto"
                    onClick={handleSignOut}
                    type="button"
                  >
                    Sign Out
                    <span aria-hidden>→</span>
                  </button>
                ) : (
                  <Link
                    className="primary-button flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold w-full xs:w-auto"
                    href="/register"
                  >
                    Register
                    <span aria-hidden>→</span>
                  </Link>
                )}
                <button className="ghost-button px-8 py-4 text-lg font-bold w-full xs:w-auto">
                  How It Works
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(45deg,rgb(0_107_63_/_0.2),rgb(92_120_101_/_0.1))] blur-3xl" />
              <div className="relative rounded-[1.5rem] bg-surface-container-lowest p-4 shadow-[0_24px_48px_rgb(0_33_16_/_0.08)] sm:p-8">
                <Image
                  alt="VoteLens UI Preview"
                  className="mb-6 w-full rounded-[1rem] object-cover aspect-[4/3] lg:aspect-auto"
                  height={900}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvu88wqHRWoOIbZGsurfgXerGzD_kIUc3NsmoI8wDD9HvvI1MILOcR9Y4hkl6ECqqy146JCi4NXrQlRfXiqWrdF6P8FOAkIYr9-ha10_QYvnJl1Ug7zOeBQn7ZzohQY401GNnmiU75I37GqI6SX9-YphS-bpKWmVgl7FJqhxskxmFOOF6XphQaT_YN1UuAItGNcJvWbP11NNbhsIAyYkpT3WGDve9yuAW5ilKblLeQq5P-xOszGqCHDHN-KYk3e1DSavRNkU08wxQ"
                  width={1200}
                  priority
                />
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    ["24M+", "Voters"],
                    ["176K", "Units"],
                    ["99%", "Verified"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1rem] bg-surface-container-low px-4 py-4 text-center"
                    >
                      <span className="font-display block text-xl sm:text-2xl font-black text-primary">
                        {value}
                      </span>
                      <span className="mt-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-on-surface-variant">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 py-20 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-12 text-center lg:text-left lg:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-on-surface">
                Democratic Toolset
              </h2>
              <p className="mt-4 text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0">
                Curated digital instruments for every citizen architect.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6">
              {featureCards.map((card) => (
                <div
                  key={card.title}
                  className={`${card.className} rounded-[1.5rem] p-6 sm:p-8 shadow-[0_12px_28px_rgb(0_33_16_/_0.05)] transition-all hover:shadow-[0_18px_36px_rgb(0_33_16_/_0.08)] hover:-translate-y-1`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-[1rem] text-sm font-black tracking-[0.14em] ${
                      card.className.includes("bg-primary")
                        ? "bg-white/12 text-on-primary"
                        : card.className.includes("bg-secondary")
                          ? "bg-white/12 text-primary-fixed"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    {card.accent}
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.03em]">
                    {card.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed sm:leading-7 ${card.bodyClassName}`}>
                    {card.description}
                  </p>
                  {card.footer}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-24">
            <div className="relative order-2 md:order-1 max-w-2xl mx-auto md:max-w-none">
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
              <Image
                alt="Verification Process"
                className="relative z-10 rounded-[2rem] shadow-[0_24px_48px_rgb(0_33_16_/_0.08)] w-full"
                height={900}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgxA_HT6c1AnRrkJNpCpmZiaN6oY3sJR47jk-CsRmHA-NpCjJIUKFfAKo48bR7XsciDhdzEaUTfeRzsw0R7aFOB4zNppTMZx6pzg1WCKZKES9QqIgkHiN_uthlvJ33xLShXlyYF3Pc6gDq27E1aE-HbQZP0Mr8aBje1-xD_SmfvXR17fqfxyVlOUoGFV4DIBvESViiUhFzIbCqgiQyLpso2_KgcvyX1AYi5DIklFBH1YNFF9AO0rXoxs-M9f1zotJP8flhopRzxTU"
                width={1200}
              />
              <div className="absolute -bottom-6 right-4 sm:-right-6 z-20 rounded-[1.25rem] bg-surface-container-lowest p-4 sm:p-6 shadow-[0_16px_36px_rgb(0_33_16_/_0.08)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-container font-bold text-on-tertiary-container">
                    ✓
                  </div>
                  <div>
                    <span className="block font-bold text-sm sm:text-base text-on-surface">
                      Data Integrity
                    </span>
                    <span className="text-[10px] sm:text-xs text-on-surface-variant">
                      Validated via INEC Node
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 md:order-2 text-center md:text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-on-surface">
                Built on Pillars of <span className="text-primary">Truth</span>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed sm:leading-8 text-on-surface-variant">
                VoteLens isn&apos;t just an app; it&apos;s a foundation for trust.
                Our systems are built using high-fidelity architectural principles
                to ensure every byte of information is verified and actionable.
              </p>

              <div className="space-y-6 text-left">
                {trustPoints.map((point) => (
                  <div key={point.title} className="flex items-start gap-4 max-w-xl mx-auto md:mx-0">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-secondary-container text-sm font-bold tracking-[0.12em] text-primary">
                      {point.accent}
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-on-surface">
                        {point.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed sm:leading-7 text-on-surface-variant">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-on-background px-4 py-20 text-on-primary sm:px-8 lg:py-32">
          <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgb(25_28_29),rgb(20_24_24))]">
            <div
              className="grid grid-cols-1 gap-12 p-6 sm:p-12 lg:grid-cols-2 lg:p-16 xl:p-24"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.02)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7pOwsVZUE-iOoFLPhpdqjrYzxvbY_w56rB2-C3yRZu4xCL8DEdI8joO17Wh1HOoiHqFSzmFgENRIFHqgDnXLm706vXA44bwPodBmtP8mHLQj7uJAJOIP7zfjvIJdymCm-7tQ_T9Gkyjw8nYIDDYv9wSB9TIfVWawTtY_0DMVXUAV5I47t54BCZFoGrGi9s2wCbNI7-8ZLks63Skob3iSm9ADc_DK2mU-z6QfrwzkanT8_OzOCfqDWo_Z9sY9UonbVgxmLX6QKpIw')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="text-center lg:text-left">
                <h2 className="font-display text-3xl sm:text-4xl font-black tracking-[-0.04em] lg:text-5xl xl:text-6xl">
                  Decipher the Law with AI
                </h2>
                <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-relaxed sm:leading-8 text-white/80 mx-auto lg:mx-0">
                  Don&apos;t get lost in legal jargon. Our AI Assistant translates
                  complex electoral acts into simple, actionable guidance tailored
                  to your specific situation.
                </p>

                <div className="mt-10 space-y-4 text-left max-w-lg mx-auto lg:mx-0">
                  {aiPrompts.map((prompt) => (
                    <div
                      key={prompt}
                      className="flex items-center gap-4 rounded-[1rem] border border-white/5 bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs sm:text-sm font-bold tracking-[0.12em] text-primary-fixed">
                        AI
                      </span>
                      <span className="text-sm">{prompt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-surface-container-lowest p-6 sm:p-8 text-on-surface shadow-[0_24px_48px_rgb(0_0_0_/_0.24)] max-w-md mx-auto w-full lg:max-w-none lg:mx-0">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
                    AI
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold">CivicBot</h4>
                    <span className="text-[10px] sm:text-xs font-bold text-primary">
                      Online &amp; Ready
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="max-w-[85%] rounded-[1rem] rounded-tl-none bg-surface-container-low p-4 text-sm leading-relaxed">
                      Hello! I&apos;m your VoteLens Assistant. How can I help you
                      navigate your civic duties today?
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="max-w-[85%] rounded-[1rem] rounded-tr-none bg-primary p-4 text-sm leading-relaxed text-on-primary">
                      I need to know the deadline for voter transfer.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="max-w-[85%] rounded-[1rem] rounded-tl-none bg-surface-container-low p-4 text-sm leading-relaxed">
                      The deadline for voter transfer for the next cycle is
                      currently scheduled for October 15th. Would you like me to
                      find your nearest center?
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-2 border-t border-outline-variant/10 pt-6">
                  <input
                    className="flex-1 min-w-0 rounded-[0.75rem] bg-surface-container-low px-4 py-3 text-sm outline-none focus:outline-2 focus:outline-primary"
                    placeholder="Type your question..."
                    type="text"
                  />
                  <button
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.75rem] bg-primary text-on-primary hover:brightness-110 active:scale-95 transition-all"
                    type="button"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-outline-variant/10 bg-surface-container-lowest px-6 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-black text-primary">
              VoteLens
            </span>
            <span className="border-l border-outline-variant/30 px-2 text-sm font-light text-on-surface-variant">
              Nigeria
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-on-surface-variant">
            {["Privacy Policy", "Terms of Service", "INEC Portal", "Contact Us"].map(
              (item) => (
                <a
                  key={item}
                  className={`transition-colors hover:text-primary ${
                    item === "INEC Portal"
                      ? "text-primary underline underline-offset-4"
                      : ""
                  }`}
                  href="#"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          <div className="w-full border-t border-outline-variant/10 pt-8 text-center">
            <p className="text-xs text-on-surface-variant tracking-wide">
              © 2024 VoteLens Nigeria. Curating Truth for the Electorate.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
