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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getStoredSession,
  clearStoredSession,
  getInitials,
  type LocalSession,
} from "../../lib/local-auth";

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
import { Sidebar } from "../../components/layout/Sidebar";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function DashboardPage() {
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
      // and prevent cascading renders.
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
    {
      label: "Dashboard",
      href: "/dashboard",
      active: true,
      icon: LayoutDashboard,
    },
    { label: "Profile", href: "/dashboard/profile", icon: User },
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
          searchPlaceholder="Search electoral data..."
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
          className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto w-full"
        >
          {/* Welcome Header */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-on-surface tracking-tight">
                Welcome, {session.fullName.split(" ")[0]}
              </h2>
              <p className="text-on-surface-variant mt-2 text-base sm:text-lg">
                Your civic footprint is 85% complete. You&apos;re ready for the next cycle.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-on-surface-variant">Election Countdown:</span>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-surface-container-lowest px-4 py-2 rounded-xl shadow-civilized border border-outline-variant/10"
              >
                <span className="text-primary font-black text-lg">142</span>
                <span className="ml-2 text-[10px] uppercase text-on-surface-variant font-bold tracking-widest">Days</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Bento Grid Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Status Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="md:col-span-8 bg-surface-container-lowest rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-civilized border border-outline-variant/5"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl transition-colors duration-500 group-hover:bg-primary/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-lg text-xs font-bold flex items-center gap-2"
                  >
                    <span className="text-[14px]">✓</span> PVC VERIFIED
                  </motion.span>
                  <span className="text-on-surface-variant text-xs font-medium">Updated: 2 hours ago</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-display leading-tight">Permanent Voter Card Status</h3>
                  <p className="text-on-surface-variant max-w-md">Your registration is fully active and linked to the INEC central database. You are eligible to vote in all upcoming elections.</p>
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    ["VIN Number", "90F5 **** 2281"],
                    ["State/LGA", "Lagos / Eti-Osa"],
                    ["Last Validated", "Oct 24, 2024"],
                  ].map(([label, value], idx) => (
                    <motion.div 
                      key={label} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/5"
                    >
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">{label}</p>
                      <p className="font-bold text-on-surface">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Action Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/dashboard/polling-unit")}
              className="md:col-span-4 bg-primary p-6 sm:p-8 rounded-xl text-on-primary shadow-lg shadow-primary/20 flex flex-col justify-between h-full group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute bottom-0 right-0 p-2 opacity-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-8xl">📍</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Find Polling Unit</h3>
                <p className="text-primary-fixed/80 text-sm leading-relaxed">View the exact geographic coordinates and navigation route to your assigned voting station.</p>
              </div>
              <div className="mt-8 flex items-center justify-between relative z-10">
                <span className="text-sm font-bold border-b border-primary-fixed">Get Directions</span>
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </div>
            </motion.div>

            {/* Polling Unit Map Snippet */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-civilized border border-outline-variant/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-primary font-display uppercase tracking-widest">Polling Unit 012</h4>
                <span className="text-on-surface-variant">•••</span>
              </div>
              <div className="h-40 rounded-xl overflow-hidden mb-4 relative bg-surface-container-low">
                <Image
                  alt="Polling Unit Map"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  height={300}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmoyU5E5exK2IIxHvaDQXTdpi4Ll2OAIBC79UPLoa2f5qQ87FRH6I1sDwmoVI9nMxAZUYKX6vsdYy1Y9l94ULLEAnd5Flu-OzITOEdCDDkatCKtpM6E5giCTIbsqFQCABsKyVT7QHfcJu9KWQ9DsDM5X90DaX0L-xCMA7Z-TcCbcvoTBjmHFd0oouVSoUpX5CD9pvCzIA2bOADlPi5vEeG8lOWdvAAX9Rxrlexym98rc-53Da10RnXQb-3LFxdghhMv5Gd5urDBfA"
                  width={400}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm font-bold">Victoria Island Primary School</p>
              <p className="text-xs text-on-surface-variant mt-1">Block B, Gate 2 Entrance</p>
            </motion.div>

            {/* Civic Timeline */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="md:col-span-5 bg-surface-container-lowest rounded-xl p-6 shadow-civilized border border-outline-variant/5"
            >
              <h4 className="text-sm font-bold text-primary font-display uppercase tracking-widest mb-6">Recent Civic Activity</h4>
              <div className="space-y-6">
                {[
                  { title: "Registration Verified", desc: "Successfully synced biometric data with the National Register.", time: "YESTERDAY" },
                  { title: "Candidate Profile View", desc: "You compared 3 gubernatorial candidates for the Lagos 2025 cycle.", time: "3 DAYS AGO" },
                  { title: "Town Hall Participation", desc: "Attended 'Civic Tech for Accountability' digital summit.", time: "1 WEEK AGO" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold shadow-sm"
                      >
                        ✓
                      </motion.div>
                      {idx !== 2 && <div className="w-0.5 h-full bg-outline-variant/10 my-1"></div>}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
                      <p className="text-[10px] text-on-surface-variant/60 mt-2 font-bold">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Election Metric */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="md:col-span-3 bg-surface-container-high rounded-xl p-6 flex flex-col justify-between shadow-civilized border border-outline-variant/5"
            >
              <div>
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Upcoming</h4>
                <div className="space-y-1">
                  <p className="text-xl font-bold font-display text-on-surface">Gubernatorial Elections</p>
                  <p className="text-sm text-primary font-bold">Lagos State</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Engagement Target</span>
                  <span className="text-[10px] font-bold text-primary">65%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 1, duration: 1.5, ease: EASING }}
                    className="h-full bg-primary rounded-full"
                  ></motion.div>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-4 leading-relaxed font-medium">
                  Voter engagement in your PU is higher than the state average of 42%.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Detailed Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informational Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border border-outline-variant/5"
            >
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 text-primary text-xl font-bold">📖</div>
              <h5 className="text-lg font-bold font-display mb-2">Voter Rights Handbook</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">Know your rights at the polling unit and understand the 2022 Electoral Act provisions for transparency.</p>
              <button className="mt-6 text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all group">
                Download PDF <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </button>
            </motion.div>

            {/* AI Assistant Prompt */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border border-outline-variant/5"
            >
              <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-4 text-primary text-xl font-bold">🤖</div>
              <h5 className="text-lg font-bold font-display mb-2">Ask Lens AI</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">Get instant, verified answers about electoral laws, polling locations, or registration requirements.</p>
              <div className="mt-6 flex gap-2">
                <input className="flex-1 text-xs bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary px-4 outline-none transition-all" placeholder="What is a VIN?" type="text" />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => router.push("/dashboard/ai-assistant")}
                  className="p-2 bg-primary text-on-primary rounded-lg shadow-md transition-transform"
                >
                  →
                </motion.button>
              </div>
            </motion.div>

            {/* Verified Profile Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border border-outline-variant/5 flex items-center gap-4 overflow-hidden relative"
            >
              <div className="flex-1">
                <h5 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter mb-1">Account Shield</h5>
                <p className="text-lg font-bold font-display text-on-surface">Two-Factor Active</p>
                <p className="text-xs text-on-surface-variant mt-1">Your biometric data is encrypted.</p>
                <button className="mt-4 px-4 py-1.5 border border-outline-variant/20 text-[10px] font-bold rounded-lg hover:bg-surface-container-low transition-colors uppercase tracking-widest">
                  Manage Security
                </button>
              </div>
              <div className="w-20 h-20 relative shrink-0">
                <svg className="w-full h-full text-primary" viewBox="0 0 36 36">
                  <path className="stroke-current opacity-10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                  <motion.path 
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: "100, 100" }}
                    transition={{ delay: 1.2, duration: 1.5, ease: EASING }}
                    className="stroke-current" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    strokeWidth="3"
                  ></motion.path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">100%</div>
              </div>
            </motion.div>
          </div>
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
