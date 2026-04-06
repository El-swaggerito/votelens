"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  HelpCircle,
  Search,
  Send,
  Library,
  ExternalLink,
  FileText,
  Map as MapIcon,
  TrendingUp,
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

export default function AIAssistantPage() {
  const router = useRouter();
  const [session, setSession] = useState<LocalSession | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPidgin, setIsPidgin] = useState(false);

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
    { label: "AI Assistant", href: "/dashboard/ai-assistant", active: true, icon: Bot },
    { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.4, ease: EASING }
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
          searchPlaceholder="Search civic updates..."
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col lg:flex-row gap-6 p-4 sm:p-8 overflow-hidden max-w-[1600px] mx-auto w-full"
        >
          {/* Left: Chat Interface */}
          <motion.section 
            variants={itemVariants}
            className="flex-1 flex flex-col bg-surface-container-lowest rounded-2xl shadow-civilized border border-outline-variant/10 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/20"
                >
                  <Bot className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">VoteLens Civic AI</h3>
                  <div className="flex items-center gap-1.5">
                    <motion.span 
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="h-2 w-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,107,63,0.4)]"
                    ></motion.span>
                    <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Always Verifying Data</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-on-surface-variant hidden sm:block">Explain in Pidgin</span>
                <button 
                  onClick={() => setIsPidgin(!isPidgin)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${isPidgin ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <motion.span 
                    animate={{ x: isPidgin ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0"
                  ></motion.span>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 max-h-[500px] custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {/* AI Intro */}
                <motion.div 
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex gap-4 max-w-[90%] sm:max-w-[85%]"
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-surface-container rounded-2xl rounded-tl-none p-4 text-sm text-on-surface leading-relaxed shadow-sm border border-outline-variant/5">
                      Welcome to your civic architect. I can help you verify your PVC status, find your polling unit, or explain electoral laws in simple terms. How can I serve you today?
                    </div>
                    <span className="text-[10px] text-on-surface-variant px-1 uppercase tracking-wider font-bold">System Agent • Just Now</span>
                  </div>
                </motion.div>

                {/* User Message Example */}
                <motion.div 
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 max-w-[90%] sm:max-w-[85%] ml-auto flex-row-reverse"
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="bg-primary text-white rounded-2xl rounded-tr-none p-4 text-sm leading-relaxed shadow-md">
                      How do I check my PVC status for the 2024 elections?
                    </div>
                    <span className="text-[10px] text-on-surface-variant px-1 uppercase tracking-wider font-bold">You • 2m ago</span>
                  </div>
                </motion.div>

                {/* AI Response Example */}
                <motion.div 
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.8 }}
                  className="flex gap-4 max-w-[90%] sm:max-w-[85%]"
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-4 w-full">
                    <div className="bg-surface-container rounded-2xl rounded-tl-none p-4 text-sm text-on-surface leading-relaxed shadow-sm border border-outline-variant/5">
                      Checking your PVC status is simple. You have two primary official channels:
                      <ul className="mt-3 space-y-2 list-disc pl-4">
                        <li>Visit the <span className="text-primary font-bold">INEC Voter Verification Portal</span> at cvr.inecnigeria.org.</li>
                        <li>Send your State, Surname, and the last 5 digits of your VIN to the official INEC shortcode.</li>
                      </ul>
                      Would you like me to guide you through the website steps?
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-tertiary-container/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded border border-tertiary/20 uppercase tracking-tighter cursor-default"
                      >
                        Verified by INEC Portal
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/10">
              <div className="mb-4">
                <p className="text-[10px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.2em]">Suggested Prompts</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "How do I check my PVC status?",
                    "Explain election results in simple English",
                    "Locate my Polling Unit",
                  ].map((prompt, idx) => (
                    <motion.button 
                      key={prompt}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 107, 63, 0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-full border border-outline-variant/30 text-[10px] font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all uppercase tracking-tight"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="relative flex items-center group">
                <input 
                  className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/20 rounded-xl py-4 pl-5 pr-14 text-sm placeholder:text-on-surface-variant/50 transition-all" 
                  placeholder="Type your civic question here..." 
                  type="text"
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 p-2 bg-primary text-white rounded-lg transition-all shadow-md shadow-primary/20"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* Right: Sidebar Resources */}
          <aside className="w-full lg:w-80 flex flex-col gap-6">
            {/* Resource Card 1: Official Links */}
            <motion.div 
              variants={itemVariants}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-civilized border border-outline-variant/5"
            >
              <h3 className="text-sm font-black text-primary mb-6 flex items-center gap-2 uppercase tracking-tight">
                <Library className="h-4 w-4" />
                Civic Resources
              </h3>
              <div className="space-y-3">
                {[
                  { title: "INEC Voter Portal", sub: "Verify details officially", icon: ExternalLink },
                  { title: "Electoral Act 2022", sub: "Full legal document", icon: FileText },
                  { title: "Polling Unit Finder", sub: "Interactive GIS Map", icon: MapIcon },
                ].map((resource, idx) => (
                  <motion.a 
                    key={resource.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(0, 107, 63, 0.05)" }}
                    className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low group transition-all border border-transparent hover:border-primary/10" 
                    href="#"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">{resource.title}</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5">{resource.sub}</span>
                    </div>
                    <resource.icon className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Resource Card 2: Trending Questions */}
            <motion.div 
              variants={itemVariants}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-civilized border border-outline-variant/5"
            >
              <h3 className="text-sm font-black text-primary mb-6 flex items-center gap-2 uppercase tracking-tight">
                <TrendingUp className="h-4 w-4" />
                Trending Now
              </h3>
              <ul className="space-y-4">
                {[
                  { id: "01", text: "What happens if I lose my PVC?" },
                  { id: "02", text: "Transferring polling units across states" },
                  { id: "03", text: "New guidelines for Diaspora voting" },
                ].map((trend, idx) => (
                  <motion.li 
                    key={trend.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <span className="text-primary font-black text-xs mt-0.5">{trend.id}</span>
                    <p className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                      {trend.text}
                    </p>
                  </motion.li>
  ))}
              </ul>
            </motion.div>

            {/* Profile Prompt Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-primary text-on-primary rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-primary/20"
            >
              <div className="relative z-10">
                <h4 className="text-lg font-black mb-2 font-display uppercase tracking-tight">Ready to Vote?</h4>
                <p className="text-xs opacity-90 mb-6 leading-relaxed font-medium">
                  Ensure your biometric verification is up to date before the registration deadline.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-primary font-black py-3 rounded-full text-xs transition-all uppercase tracking-widest shadow-md"
                >
                  Register to Vote
                </motion.button>
              </div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute -right-6 -bottom-6 opacity-10"
              >
                <IdCard className="h-24 w-24" />
              </motion.div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
              ></motion.div>
            </motion.div>
          </aside>
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
    </div>
  );
}
