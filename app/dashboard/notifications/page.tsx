"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Megaphone,
  AlertTriangle,
  Calendar,
  ArrowRight,
  Archive,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import {
  getStoredSession,
  clearStoredSession,
  getInitials,
  type LocalSession,
} from "../../../lib/local-auth";
import { Sidebar } from "../../../components/layout/Sidebar";
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";

const EASING = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function NotificationsPage() {
  const router = useRouter();
  const [session, setSession] = useState<LocalSession | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const currentSession = getStoredSession();
    if (!currentSession) {
      router.replace("/");
    } else {
      setSession(currentSession);
    }
  }, [router]);

  const handleLogout = () => {
    clearStoredSession();
    router.push("/");
  };

  if (!session) {
    return null;
  }

  const navigation = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "PVC Status", href: "/dashboard/pvc-status", icon: IdCard },
    { label: "Polling Unit", href: "/dashboard/polling-unit", icon: MapPin },
    { label: "History", href: "/dashboard/history", icon: HistoryIcon },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Journey", href: "/dashboard/journey", icon: Route },
    { label: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
    { label: "Notifications", href: "/dashboard/notifications", active: true, icon: Bell },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASING },
    },
  };

  const notificationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: EASING }
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      transition: { duration: 0.3, ease: "easeIn" as any } 
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-x-hidden">
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

      <main className="flex min-h-screen flex-1 flex-col lg:ml-64 w-full max-w-full">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          branding={{ name: "VoteLens" }}
          searchPlaceholder="Search alerts..."
          rightContent={
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.push("/dashboard/notifications")}
                className="relative p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors"
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-8 max-w-5xl mx-auto w-full flex-1 space-y-8"
        >
          {/* Filters & Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black text-on-surface tracking-tight font-display">Inbox</h3>
              <p className="text-on-surface-variant text-sm font-medium mt-1">Stay informed with the latest updates from VoteLens and INEC.</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex p-1 bg-surface-container-high rounded-xl w-full sm:w-fit overflow-x-auto no-scrollbar">
              <div className="flex min-w-max sm:min-w-0 w-full">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold bg-white text-primary rounded-lg shadow-sm transition-all uppercase tracking-widest whitespace-nowrap"
                >
                  All
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all uppercase tracking-widest whitespace-nowrap"
                >
                  Unread
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all uppercase tracking-widest whitespace-nowrap"
                >
                  Important
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Notifications List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {/* Alert Type: Announcement */}
              <motion.div 
                variants={notificationVariants}
                whileHover={{ x: 4, backgroundColor: "rgba(0, 107, 63, 0.02)" }}
                className="group relative bg-surface-container-lowest rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-civilized flex flex-col sm:flex-row items-start gap-4 sm:gap-5 border border-outline-variant/10 overflow-hidden"
              >
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "50%" }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-primary rounded-r-full hidden sm:block"
                ></motion.div>
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-secondary-container text-on-secondary-fixed-variant">Announcement</span>
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">2 hours ago</span>
                  </div>
                  <h4 className="text-lg font-bold text-on-surface mb-2 font-display">New Polling Unit Relocation Guidelines</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4">INEC has updated the procedures for polling unit transfers ahead of the upcoming municipal elections. Ensure your PVC is mapped to the correct ward.</p>
                  <div className="flex items-center gap-4">
                    <motion.button 
                      whileHover={{ x: 3 }}
                      className="text-primary font-bold text-xs flex items-center gap-1.5 hover:underline uppercase tracking-widest"
                    >
                      Read Full Guide
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1, color: "var(--primary)" }}
                      className="text-on-surface-variant transition-colors p-1"
                    >
                      <Archive className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Alert Type: Verification */}
              <motion.div 
                variants={notificationVariants}
                whileHover={{ x: 4, backgroundColor: "rgba(0, 107, 63, 0.02)" }}
                className="group bg-surface-container-lowest rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-civilized flex flex-col sm:flex-row items-start gap-4 sm:gap-5 border border-outline-variant/10"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-tertiary-container text-on-tertiary-container">Verification Success</span>
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Yesterday</span>
                  </div>
                  <h4 className="text-lg font-bold text-on-surface mb-2 font-display">PVC Information Successfully Validated</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4">Your voter identification details have been matched with the national database. You are now cleared for the civic journey phase.</p>
                  <div className="flex items-center gap-4">
                    <motion.button 
                      whileHover={{ x: 3 }}
                      onClick={() => router.push("/dashboard/profile")}
                      className="text-primary font-bold text-xs flex items-center gap-1.5 hover:underline uppercase tracking-widest"
                    >
                      View Profile
                      <ExternalLink className="h-3.5 w-3.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Alert Type: Urgent Alert */}
              <motion.div 
                variants={notificationVariants}
                whileHover={{ x: 4, backgroundColor: "rgba(186, 26, 26, 0.02)" }}
                className="group bg-surface-container-lowest rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-civilized flex flex-col sm:flex-row items-start gap-4 sm:gap-5 border border-outline-variant/10"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-error-container/10 flex items-center justify-center text-error">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <AlertTriangle className="h-6 w-6" />
                  </motion.div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-error-container text-on-error-container">Urgent Alert</span>
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Mar 12, 2024</span>
                  </div>
                  <h4 className="text-lg font-bold text-on-surface mb-2 font-display">Security Update: Action Required</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4">A new login was detected from a Chrome browser on Windows in Abuja. If this wasn&apos;t you, please secure your account immediately.</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-error text-on-error px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-md shadow-error/10 w-full sm:w-auto text-center"
                    >
                      Secure Account
                    </motion.button>
                    <motion.button 
                      whileHover={{ color: "var(--on-surface)" }}
                      className="text-on-surface-variant font-black text-[10px] uppercase tracking-widest transition-colors px-4 py-2 w-full sm:w-auto text-center"
                    >
                      I recognize this
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Alert Type: Reminder */}
              <motion.div 
                variants={notificationVariants}
                className="group bg-surface-container-lowest/50 rounded-2xl p-4 sm:p-6 border border-dashed border-outline-variant/20 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 opacity-80"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-surface-container text-on-surface-variant">Upcoming</span>
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Mar 10, 2024</span>
                  </div>
                  <h4 className="text-lg font-bold text-on-surface mb-2 font-display">Voter Registration Deadline Approaching</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed italic">The window for new registrations in your current district closes in 5 days. Ensure all friends and family are enrolled.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Empty State / Load More */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-col items-center"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-1 bg-surface-container-high rounded-full mb-8"
            ></motion.div>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 bg-surface-container-lowest text-primary font-black text-[10px] uppercase tracking-widest rounded-full shadow-civilized hover:shadow-glass transition-all border border-outline-variant/5"
            >
              Load Older Notifications
              <ChevronDown className="h-4 w-4" />
            </motion.button>
          </motion.div>
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
      <motion.button 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1.5
        }}
        onClick={() => router.push("/dashboard/ai-assistant")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-50"
      >
        <Bot className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
