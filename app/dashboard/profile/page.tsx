"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  IdCard,
  MapPin,
  History as HistoryIcon,
  BarChart3,
  Route,
  Bot,
  Bell,
  CheckCircle2,
  Edit,
  Map,
  Fingerprint,
  Smile,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getStoredSession,
  clearStoredSession,
  getInitials,
  type LocalSession,
} from "../../../lib/local-auth";

// Animation Constants
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.6;

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
import { Sidebar } from "../../../components/layout/Sidebar";
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<LocalSession | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentSession = getStoredSession();
    if (!currentSession) {
      router.replace("/");
    } else {
      // Use a microtask to avoid synchronous state updates in the effect body
      Promise.resolve().then(() => {
        setSession(currentSession);
        setIsLoading(false);
      });
    }
  }, [router]);

  const handleLogout = () => {
    clearStoredSession();
    router.push("/");
  };

  if (isLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-bold text-primary animate-pulse">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  const navigation = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/profile", active: true, icon: User },
    { label: "PVC Status", href: "/dashboard/pvc-status", icon: IdCard },
    { label: "Polling Unit", href: "/dashboard/polling-unit", icon: MapPin },
    { label: "History", href: "/dashboard/history", icon: HistoryIcon },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    { label: "Journey", href: "/dashboard/journey", icon: Route },
    { label: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
    { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        branding={{ name: "VoteLens", tagline: "The Civic Architect" }}
        navigation={navigation}
        footerActions={
          <button className="primary-button w-full py-3 text-sm font-bold shadow-lg shadow-primary/10">
            Register to Vote
          </button>
        }
        userActions={
          <>
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors"
              type="button"
            >
              <span className="text-sm">Logout</span>
            </button>
            <button
              className="flex w-full items-center space-x-3 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors"
              type="button"
            >
              <span className="text-sm">Help</span>
            </button>
          </>
        }
      />

      <main className="flex min-h-screen flex-1 flex-col lg:ml-64">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          branding={{ name: "VoteLens" }}
          searchPlaceholder="Search civic records..."
          rightContent={
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.push("/dashboard/notifications")}
                className="relative p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-on-surface leading-none">
                    {session.fullName}
                  </p>
                  <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider font-bold">
                    Verified Voter
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary font-bold shadow-sm">
                  {getInitials(session.fullName)}
                </div>
              </div>
            </div>
          }
        />

        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-8"
        >
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              {/* Header Info */}
              <motion.div 
                variants={fadeInUp}
                className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center shadow-civilized border border-outline-variant/5"
              >
                <div className="relative group">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 rounded-full border-4 border-secondary-container overflow-hidden shadow-md"
                  >
                    <Image
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="Profile Picture"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7d-3y0pRKsyBWaocIkw40l7vVt6m_aRapFMQ9bLdHnAUqOw6QvrWTCDwV9hi9SUyKt7omzhGHNcgn5Kl-Q1t6yAZrNvohTxBiR_HQ9paLDH9YDDdZ-q418YFuAdeMrh3oruQhJKbr05YBZHLY_MTs7JvSeNuCs7bKMhjs2LjaEVbCSlhxIJRf0JxPbx8mqzl0J8ksyTvVjj5CNi8XiIfCJkSSWTGTr-2pelope8VLfsgRxGcQsWLBLmQ-qzvykpS33WmAqBKZjqE"
                      width={128}
                      height={128}
                    />
                  </motion.div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-lg z-10"
                  >
                    <Edit className="h-4 w-4" />
                  </motion.button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-3xl sm:text-4xl font-black text-on-surface font-display tracking-tight uppercase">
                      {session.fullName}
                    </h3>
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-tertiary-container/10 px-3 py-1 rounded-md flex items-center space-x-1.5 border border-tertiary-container/20"
                    >
                      <CheckCircle2 className="text-tertiary-container h-4 w-4 fill-tertiary-container/20" />
                      <span className="text-tertiary-container text-[10px] font-bold uppercase tracking-wider">
                        Verified Voter
                      </span>
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      ["Voter ID (VIN)", "90F5 B002 1109 8831 422", "text-primary tabular-nums"],
                      ["Registration Date", "Oct 14, 2011", "text-on-surface"],
                      ["Status", "Active", "text-on-surface"],
                      ["Last Updated", "2 hours ago", "text-on-surface-variant font-medium"],
                    ].map(([label, value, valueClass], idx) => (
                      <motion.div 
                        key={label}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                      >
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                          {label}
                        </p>
                        <div className="flex items-center space-x-1.5">
                          {label === "Status" && (
                            <div className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></div>
                          )}
                          <p className={`font-bold text-sm ${valueClass}`}>
                            {value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Geographical & Polling Unit Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 space-y-6 shadow-civilized border border-outline-variant/5"
                >
                  <div className="flex items-center justify-between border-b border-surface-container pb-4">
                    <h4 className="text-sm font-bold text-primary flex items-center uppercase tracking-wider">
                      <MapPin className="mr-2 h-4 w-4" />
                      Geographical Identity
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      ["State of Registration", "LAGOS"],
                      ["Local Government Area", "ETI-OSA"],
                      ["Registration Ward", "VICTORIA ISLAND I (WARD 01)"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-sm text-on-surface-variant">
                          {label}
                        </span>
                        <span className="text-sm font-bold text-on-surface">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 space-y-6 shadow-civilized border border-outline-variant/5"
                >
                  <div className="flex items-center justify-between border-b border-surface-container pb-4">
                    <h4 className="text-sm font-bold text-primary flex items-center uppercase tracking-wider">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Polling Unit Assignment
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-1">
                        Designated Unit
                      </span>
                      <p className="text-sm font-bold text-on-surface">
                        POLLING UNIT 024 - KURAMO PRIMARY SCHOOL
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-on-surface-variant">
                        Unit Code
                      </span>
                      <span className="text-sm font-bold text-primary font-mono bg-primary/5 px-2 py-0.5 rounded">
                        24-08-11-024
                      </span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02, backgroundColor: "var(--surface-container-low)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center space-x-2 text-xs font-bold text-primary border border-primary/20 py-2.5 rounded-lg transition-all"
                    >
                      <Map className="h-4 w-4" />
                      <span>VIEW DIRECTIONS</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Biometric Log */}
              <motion.div 
                variants={fadeInUp}
                className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-civilized border border-outline-variant/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider">
                    Biometric Verification Log
                  </h4>
                  <span className="text-[10px] font-bold text-on-surface-variant px-2 py-1 bg-surface-container rounded uppercase">
                    Audit Trail
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Fingerprint, title: "Fingerprint Recapture", sub: "Continuous Voter Registration (CVR) - Center 04", date: "Aug 12, 2022" },
                    { icon: Smile, title: "Facial Biometric Update", sub: "Mobile INEC Portal Validation", date: "Dec 01, 2023" },
                  ].map((log, idx) => (
                    <motion.div 
                      key={log.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-transparent hover:border-outline-variant/10 transition-all"
                    >
                      <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                        <log.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">
                          {log.title}
                        </p>
                        <p className="text-[10px] text-on-surface-variant truncate">
                          {log.sub}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-tertiary">SUCCESS</p>
                        <p className="text-[10px] text-on-surface-variant">
                          {log.date}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Actions */}
            <div className="lg:col-span-4 space-y-8">
              {/* PVC Status Card */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-primary p-6 sm:p-8 rounded-xl text-white relative overflow-hidden group shadow-lg shadow-primary/20 border border-white/10"
              >
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      <CreditCard className="h-8 w-8 opacity-80" />
                    </motion.div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                      Official PVC
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold opacity-70 uppercase tracking-[0.2em] mb-1">
                      PVC Collection Status
                    </p>
                    <h3 className="text-2xl font-black font-display tracking-tight leading-tight">
                      READY FOR PICKUP
                    </h3>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-bold opacity-70 mb-2 uppercase tracking-wider">
                      Collection Center
                    </p>
                    <p className="text-sm font-bold leading-tight">
                      INEC Local Government Office, Eti-Osa, Igbo Efon
                    </p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-white text-primary rounded-full font-black text-xs shadow-lg transition-all uppercase tracking-widest"
                  >
                    Download Slip (PDF)
                  </motion.button>
                </div>
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              </motion.div>

              {/* Voter Stats */}
              <motion.div 
                variants={fadeInUp}
                className="bg-surface-container-high rounded-xl p-6 sm:p-8 space-y-6 shadow-civilized border border-outline-variant/5"
              >
                <h4 className="text-[10px] font-black text-on-surface-variant tracking-[0.2em] uppercase">
                  Voter Statistics
                </h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-2xl font-black font-display text-on-surface">
                        3
                      </p>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Elections Participated
                      </p>
                    </div>
                    <CheckCircle2 className="text-primary/20 h-10 w-10" />
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ delay: 1, duration: 1.2, ease: EASING }}
                      className="bg-primary h-2 rounded-full shadow-[0_0_8px_rgba(0,107,63,0.4)]"
                    ></motion.div>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded shrink-0">
                        <CheckCircle2 className="text-primary h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-on-surface">
                          Identity Trust Score: 98%
                        </p>
                        <p className="text-[10px] text-on-surface-variant leading-relaxed">
                          Based on biometric and document verification consistency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                variants={fadeInUp}
                className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border-l-4 border-primary"
              >
                <h5 className="text-[10px] font-bold text-on-surface mb-4 uppercase tracking-widest">
                  Quick Actions
                </h5>
                <div className="space-y-1">
                  {[
                    "Update Address",
                    "Request Card Replacement",
                    "Transfer Polling Unit",
                  ].map((action) => (
                    <motion.button
                      key={action}
                      whileHover={{ x: 4, backgroundColor: "var(--surface-container-low)" }}
                      className="w-full text-left px-3 py-2.5 text-xs font-medium text-on-surface-variant hover:text-primary rounded-lg transition-all flex items-center justify-between group"
                    >
                      {action}
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>

        <Footer
          branding={{ name: "VoteLens", tagline: "Nigeria" }}
          links={[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "INEC Portal", href: "#" },
            { label: "Contact Us", href: "#" },
          ]}
          copyright="© 2024 VoteLens Nigeria. Curating Truth for the Electorate."
        />
      </main>

      {/* Floating AI Assistant */}
      <button 
        onClick={() => router.push("/dashboard/ai-assistant")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Bot className="h-6 w-6" />
      </button>
    </div>
  );
}
