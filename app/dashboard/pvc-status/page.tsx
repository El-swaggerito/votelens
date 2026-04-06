"use client";

import { useEffect, useState } from "react";
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
  Clock,
  ArrowRight,
  Truck,
  Check,
  Vote,
  Info,
  FileText,
  Users,
  AlertTriangle,
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

export default function PVCStatusPage() {
  const router = useRouter();
  const [session, setSession] = useState<LocalSession | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentSession = getStoredSession();
    if (!currentSession) {
      router.replace("/");
    } else {
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
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "PVC Status", href: "/dashboard/pvc-status", active: true, icon: IdCard },
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
          searchPlaceholder="Search registration..."
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Registration Progress Card */}
            <motion.div 
              variants={fadeInUp}
              className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-civilized flex flex-col justify-between border border-outline-variant/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1 rounded-md text-[10px] font-bold tracking-wide mb-2 inline-block uppercase"
                  >
                    VOTER ID: 90F2-XXXX-XXXX
                  </motion.span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-on-surface font-display tracking-tight">
                    Registration Status: <span className="text-primary">Verified</span>
                  </h2>
                </div>
                <motion.div 
                  initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="bg-tertiary-container/10 p-3 rounded-xl shrink-0 border border-tertiary-container/20"
                >
                  <CheckCircle2 className="text-tertiary h-8 w-8 sm:h-10 sm:w-10" />
                </motion.div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-on-surface-variant uppercase tracking-wider text-[10px]">Overall Progress</span>
                  <span className="text-primary font-display">85% Complete</span>
                </div>
                <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ delay: 0.8, duration: 1.5, ease: EASING }}
                    className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_12px_rgba(0,107,63,0.3)]"
                  ></motion.div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Your biometric data and documentation have been successfully cross-referenced with the national database. Your Permanent Voter&apos;s Card is currently in the <strong className="text-on-surface">final distribution phase</strong>.
                </p>
              </div>
            </motion.div>

            {/* Quick Action Card: Availability */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-primary/20 border border-white/10"
            >
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="z-10">
                <h3 className="text-lg font-bold mb-1 opacity-90 font-display">PVC Availability</h3>
                <p className="text-2xl font-black mb-4 tracking-tight font-display">Ready for Pickup</p>
                <motion.div 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-lg p-3 transition-colors"
                >
                  <Clock className="h-4 w-4 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider">Expires in 14 days</span>
                </motion.div>
              </div>
              <motion.button 
                whileHover={{ backgroundColor: "var(--surface-container-lowest)" }}
                whileTap={{ scale: 0.98 }}
                className="z-10 mt-6 w-full bg-white text-primary py-3 rounded-full font-black text-xs shadow-lg transition-all flex items-center justify-center space-x-2 uppercase tracking-widest"
              >
                <span>Get Pickup Directions</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Pickup Center Details */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-civilized flex flex-col border border-outline-variant/5"
            >
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="text-primary h-5 w-5" />
                <h3 className="text-lg font-bold text-on-surface font-display tracking-tight uppercase">Pickup Center</h3>
              </div>
              <div className="flex-1 space-y-4">
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/5 transition-all"
                >
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Assigned Center</p>
                  <p className="text-base font-bold text-on-surface">INEC LGA Office, Eti-Osa</p>
                  <p className="text-xs text-on-surface-variant mt-1">Km 15, Lekki-Epe Expressway, Lagos State.</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/5 transition-all"
                  >
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Queue Status</p>
                    <p className="text-sm font-bold text-tertiary uppercase">Low Traffic</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/5 transition-all"
                  >
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Avg. Wait Time</p>
                    <p className="text-sm font-bold text-on-surface uppercase">15 - 20 Mins</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Timeline / Roadmap */}
            <motion.div 
              variants={fadeInUp}
              className="lg:col-span-7 bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col shadow-inner border border-outline-variant/5"
            >
              <h3 className="text-lg font-bold text-on-surface font-display tracking-tight mb-8 uppercase">Journey to Election Day</h3>
              <div className="relative space-y-10">
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute left-4 top-2 bottom-2 w-0.5 bg-outline-variant/30 origin-top"
                ></motion.div>
                
                {[
                  { icon: Check, title: "Data Capture & Enrollment", sub: "Completed on Oct 12, 2023 • Alausa Enrollment Center", status: "completed" },
                  { icon: Check, title: "Verification & AFIS Filtering", sub: "Completed on Dec 05, 2023 • Cleared of duplicates", status: "completed" },
                  { icon: Truck, title: "PVC Collection Phase", sub: "Your card is now available at your designated LGA office. Please bring your registration slip.", status: "active" },
                  { icon: Vote, title: "Election Day Participation", sub: "Scheduled for Feb 2025 • Polling Unit 042", status: "pending" },
                ].map((step, idx) => (
                  <motion.div 
                    key={step.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + idx * 0.1 }}
                    className="relative flex items-start space-x-6 group"
                  >
                    <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-sm shrink-0 transition-all ${
                      step.status === "completed" ? "bg-tertiary-container text-white" : 
                      step.status === "active" ? "bg-white ring-4 ring-primary-container text-primary scale-110 shadow-md" : 
                      "bg-surface-container-high text-on-surface-variant"
                    }`}>
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className={`${step.status === "active" ? "bg-white p-4 rounded-xl shadow-sm -mt-2 border-l-4 border-primary" : ""}`}>
                      <h4 className={`font-bold text-sm ${step.status === "active" ? "text-primary uppercase tracking-tight" : "text-on-surface"} ${step.status === "pending" ? "opacity-50" : ""}`}>
                        {step.title}
                      </h4>
                      <p className={`text-[10px] mt-1 leading-relaxed ${step.status === "active" ? "text-on-surface-variant" : step.status === "pending" ? "text-on-surface-variant opacity-50" : "text-on-surface-variant"}`}>
                        {step.sub}
                      </p>
                      {step.status === "active" && (
                        <div className="mt-3 flex space-x-4">
                          <button className="text-[10px] font-black text-primary underline uppercase tracking-widest hover:opacity-70 transition-opacity">Download Slip</button>
                          <button className="text-[10px] font-black text-primary underline uppercase tracking-widest hover:opacity-70 transition-opacity">Remind Me Later</button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Alert/Notification Banner */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-12 bg-secondary-container/30 border-l-4 border-primary-container rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <Info className="text-primary-container h-8 w-8 shrink-0" />
              </motion.div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm font-bold text-on-secondary-container">Pro Tip: Saturday Collections</p>
                <p className="text-xs text-on-secondary-container opacity-80 mt-1">INEC centers are now open on Saturdays from 9 AM to 3 PM to facilitate faster collection before the deadline.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-[10px] font-black text-primary-container bg-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-primary-container hover:text-white transition-all uppercase tracking-widest shrink-0"
              >
                Check Weekend Slots
              </motion.button>
            </motion.div>
          </div>

          {/* Supporting Information Grid */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: FileText, title: "Required Documents", desc: "See the full list of what you need to present at the pickup center to claim your card." },
              { icon: Users, title: "Proxy Collection", desc: "Learn about the strict regulations regarding card collection for family members or third parties." },
              { icon: AlertTriangle, title: "Lost Registration Slip", desc: "Don't panic. Follow these steps if you have misplaced your temporary registration paper." },
            ].map((info) => (
              <motion.div 
                key={info.title}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 33, 16, 0.1)" }}
                className="bg-surface-container-lowest rounded-xl p-6 shadow-civilized group cursor-pointer border border-outline-variant/5 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-all">
                  <info.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-on-surface mb-2 font-display uppercase tracking-tight">{info.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{info.desc}</p>
              </motion.div>
            ))}
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
      <button 
        onClick={() => router.push("/dashboard/ai-assistant")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Bot className="h-6 w-6" />
      </button>
    </div>
  );
}
