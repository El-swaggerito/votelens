"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  clearStoredSession,
  getInitials,
  getStoredSession,
  type LocalSession,
} from "../lib/local-auth";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

// Senior-level Animation Constants
 const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Custom cubic-bezier for professional feel
 const DURATION = 0.8;
 
 const fadeInUp = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
   transition: { duration: DURATION, ease: EASING },
 };

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
      <Navbar
        branding={{ name: "VoteLens" }}
        showSearch={false}
        rightContent={
          session ? (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold tracking-[0.14em] text-on-primary">
                {getInitials(session.fullName)}
              </div>
              <button
                className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                onClick={handleSignOut}
                type="button"
              >
                Sign out
              </button>
            </motion.div>
          ) : (
            <Link
              className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
              href="/register"
            >
              Sign in
            </Link>
          )
        }
      />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-12 sm:px-8 lg:pb-32 lg:pt-24">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(0_107_63_/_0.05),transparent_45%,rgb(40_135_49_/_0.05))]" />
          <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex flex-col items-center text-center space-y-8 lg:items-start lg:text-left"
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-md bg-secondary-container px-4 py-2 text-sm font-medium text-on-secondary-fixed-variant"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tertiary-container text-xs font-bold text-on-tertiary-container">
                  ✓
                </span>
                Official Civic Data Platform
              </motion.div>

              <div className="space-y-6">
                <motion.h1 
                  variants={fadeInUp}
                  className="font-display text-4xl font-black leading-[1.1] tracking-[-0.05em] text-on-surface xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                >
                  Your Vote,
                  <br />
                  <span className="text-primary">Your Voice,</span>
                  <br />
                  Your Future
                </motion.h1>

                <motion.p 
                  variants={fadeInUp}
                  className="max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg sm:leading-8 lg:text-xl"
                >
                  Navigate the democratic landscape with architectural precision.
                  VoteLens provides the verified data and tools you need to build
                  Nigeria&apos;s future.
                </motion.p>
                {session ? (
                  <motion.div variants={fadeInUp} className="space-y-4">
                    <p className="text-sm font-semibold tracking-[0.14em] text-primary">
                      Signed in locally as {session.fullName}
                    </p>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                    >
                      Go to Dashboard →
                    </Link>
                  </motion.div>
                ) : null}
              </div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col w-full xs:flex-row xs:w-auto gap-4 pt-2"
              >
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
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASING, delay: 0.2 }}
              className="relative w-full max-w-2xl mx-auto lg:max-w-none"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(45deg,rgb(0_107_63_/_0.2),rgb(92_120_101_/_0.1))] blur-3xl" />
              <div className="relative rounded-[1.5rem] bg-surface-container-lowest p-4 shadow-[0_24px_48px_rgb(0_33_16_/_0.08)] sm:p-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.4, ease: EASING }}
                >
                  <Image
                    alt="VoteLens UI Preview"
                    className="mb-6 w-full rounded-[1rem] object-cover aspect-[4/3] lg:aspect-auto"
                    height={900}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvu88wqHRWoOIbZGsurfgXerGzD_kIUc3NsmoI8wDD9HvvI1MILOcR9Y4hkl6ECqqy146JCi4NXrQlRfXiqWrdF6P8FOAkIYr9-ha10_QYvnJl1Ug7zOeBQn7ZzohQY401GNnmiU75I37GqI6SX9-YphS-bpKWmVgl7FJqhxskxmFOOF6XphQaT_YN1UuAItGNcJvWbP11NNbhsIAyYkpT3WGDve9yuAW5ilKblLeQq5P-xOszGqCHDHN-KYk3e1DSavRNkU08wxQ"
                    width={1200}
                    priority
                  />
                </motion.div>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    ["24M+", "Voters"],
                    ["176K", "Units"],
                    ["99%", "Verified"],
                  ].map(([value, label], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + (index * 0.1), duration: 0.5, ease: EASING }}
                      className="rounded-[1rem] bg-surface-container-low px-4 py-4 text-center"
                    >
                      <span className="font-display block text-xl sm:text-2xl font-black text-primary">
                        {value}
                      </span>
                      <span className="mt-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-on-surface-variant">
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 py-20 sm:px-8 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-[1600px]">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASING }}
              className="mb-12 text-center lg:text-left lg:mb-16"
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-on-surface">
                Democratic Toolset
              </h2>
              <p className="mt-4 text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0">
                Curated digital instruments for every citizen architect.
              </p>
            </motion.div>

            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6"
            >
              {featureCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeInUp}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 33, 16, 0.1)" }}
                  className={`${card.className} rounded-[1.5rem] p-6 sm:p-8 shadow-[0_12px_28px_rgb(0_33_16_/_0.05)] transition-all`}
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-8 lg:py-32 overflow-hidden">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASING }}
              className="relative order-2 md:order-1 max-w-2xl mx-auto md:max-w-none"
            >
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: EASING }}
              >
                <Image
                  alt="Verification Process"
                  className="relative z-10 rounded-[2rem] shadow-[0_24px_48px_rgb(0_33_16_/_0.08)] w-full"
                  height={900}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgxA_HT6c1AnRrkJNpCpmZiaN6oY3sJR47jk-CsRmHA-NpCjJIUKFfAKo48bR7XsciDhdzEaUTfeRzsw0R7aFOB4zNppTMZx6pzg1WCKZKES9QqIgkHiN_uthlvJ33xLShXlyYF3Pc6gDq27E1aE-HbQZP0Mr8aBje1-xD_SmfvXR17fqfxyVlOUoGFV4DIBvESViiUhFzIbCqgiQyLpso2_KgcvyX1AYi5DIklFBH1YNFF9AO0rXoxs-M9f1zotJP8flhopRzxTU"
                  width={1200}
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASING }}
                className="absolute -bottom-6 right-4 sm:-right-6 z-20 rounded-[1.25rem] bg-surface-container-lowest p-4 sm:p-6 shadow-[0_16px_36px_rgb(0_33_16_/_0.08)]"
              >
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
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASING }}
              className="space-y-8 order-1 md:order-2 text-center md:text-left"
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-on-surface">
                Built on Pillars of <span className="text-primary">Truth</span>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed sm:leading-8 text-on-surface-variant">
                VoteLens isn&apos;t just an app; it&apos;s a foundation for trust.
                Our systems are built using high-fidelity architectural principles
                to ensure every byte of information is verified and actionable.
              </p>

              <div className="space-y-6 text-left">
                {trustPoints.map((point, index) => (
                  <motion.div 
                    key={point.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.5, ease: EASING }}
                    className="flex items-start gap-4 max-w-xl mx-auto md:mx-0"
                  >
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-on-background px-4 py-20 text-on-primary sm:px-8 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASING }}
            className="mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgb(25_28_29),rgb(20_24_24))] shadow-2xl"
          >
            <div
              className="grid grid-cols-1 gap-12 p-6 sm:p-12 lg:grid-cols-2 lg:p-16 xl:p-24 relative"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.02)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7pOwsVZUE-iOoFLPhpdqjrYzxvbY_w56rB2-C3yRZu4xCL8DEdI8joO17Wh1HOoiHqFSzmFgENRIFHqgDnXLm706vXA44bwPodBmtP8mHLQj7uJAJOIP7zfjvIJdymCm-7tQ_T9Gkyjw8nYIDDYv9wSB9TIfVWawTtY_0DMVXUAV5I47t54BCZFoGrGi9s2wCbNI7-8ZLks63Skob3iSm9ADc_DK2mU-z6QfrwzkanT8_OzOCfqDWo_Z9sY9UonbVgxmLX6QKpIw')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="text-center lg:text-left relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASING }}
                  className="font-display text-3xl sm:text-4xl font-black tracking-[-0.04em] lg:text-5xl xl:text-6xl"
                >
                  Decipher the Law with AI
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8, ease: EASING }}
                  className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-relaxed sm:leading-8 text-white/80 mx-auto lg:mx-0"
                >
                  Don&apos;t get lost in legal jargon. Our AI Assistant translates
                  complex electoral acts into simple, actionable guidance tailored
                  to your specific situation.
                </motion.p>

                <div className="mt-10 space-y-4 text-left max-w-lg mx-auto lg:mx-0">
                  {aiPrompts.map((prompt, index) => (
                    <motion.div
                      key={prompt}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (index * 0.1), duration: 0.5, ease: EASING }}
                      whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      className="flex items-center gap-4 rounded-[1rem] border border-white/5 bg-white/10 p-4 backdrop-blur-sm cursor-default"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs sm:text-sm font-bold tracking-[0.12em] text-primary-fixed">
                        AI
                      </span>
                      <span className="text-sm">{prompt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: EASING }}
                className="rounded-[1.5rem] bg-surface-container-lowest p-6 sm:p-8 text-on-surface shadow-[0_24px_48px_rgb(0_0_0_/_0.24)] max-w-md mx-auto w-full lg:max-w-none lg:mx-0 relative z-10"
              >
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
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5, ease: EASING }}
                    className="flex gap-3"
                  >
                    <div className="max-w-[85%] rounded-[1rem] rounded-tl-none bg-surface-container-low p-4 text-sm leading-relaxed">
                      Hello! I&apos;m your VoteLens Assistant. How can I help you
                      navigate your civic duties today?
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.5, ease: EASING }}
                    className="flex flex-col items-end gap-3"
                  >
                    <div className="max-w-[85%] rounded-[1rem] rounded-tr-none bg-primary p-4 text-sm leading-relaxed text-on-primary shadow-lg">
                      I need to know the deadline for voter transfer.
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.6, duration: 0.5, ease: EASING }}
                    className="flex gap-3"
                  >
                    <div className="max-w-[85%] rounded-[1rem] rounded-tl-none bg-surface-container-low p-4 text-sm leading-relaxed">
                      The deadline for voter transfer for the next cycle is
                      currently scheduled for October 15th. Would you like me to
                      find your nearest center?
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 flex gap-2 border-t border-outline-variant/10 pt-6">
                  <input
                    className="flex-1 min-w-0 rounded-[0.75rem] bg-surface-container-low px-4 py-3 text-sm outline-none focus:outline-2 focus:outline-primary transition-all"
                    placeholder="Type your question..."
                    type="text"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.75rem] bg-primary text-on-primary hover:brightness-110 shadow-md"
                    type="button"
                  >
                    →
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer
        branding={{ name: "VoteLens", tagline: "Nigeria" }}
        links={[
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "INEC Portal", href: "#", highlight: true },
          { label: "Contact Us", href: "#" },
        ]}
        copyright="© 2024 VoteLens Nigeria. Curating Truth for the Electorate."
      />
    </div>
  );
}
