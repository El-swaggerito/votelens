"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  Navigation,
  Info,
  Clock,
  Users,
  ChevronRight,
  Filter,
  Layers,
  Map as MapIcon,
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
const STAGGER = 0.1;

export default function PollingUnitPage() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER,
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

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: EASING },
    },
  };

  const navigation = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "PVC Status", href: "/dashboard/pvc-status", icon: IdCard },
    { label: "Polling Unit", href: "/dashboard/polling-unit", active: true, icon: MapPin },
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

      <main className="flex min-h-screen flex-1 flex-col lg:ml-64">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          branding={{ name: "VoteLens" }}
          searchPlaceholder="Search polling units..."
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
          className="p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Map Canvas Section */}
            <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
              <motion.div 
                variants={mapVariants}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-civilized relative border border-outline-variant/10"
              >
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm border border-outline-variant/20 text-on-surface hover:bg-white transition-colors"
                  >
                    <Layers className="h-5 w-5" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm border border-outline-variant/20 text-on-surface hover:bg-white transition-colors"
                  >
                    <Filter className="h-5 w-5" />
                  </motion.button>
                </div>
                
                <div className="h-[400px] sm:h-[500px] relative bg-surface-container-low overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ duration: 2, ease: EASING }}
                    className="w-full h-full"
                  >
                    <Image
                      alt="Interactive Map"
                      className="w-full h-full object-cover"
                      height={1000}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmoyU5E5exK2IIxHvaDQXTdpi4Ll2OAIBC79UPLoa2f5qQ87FRH6I1sDwmoVI9nMxAZUYKX6vsdYy1Y9l94ULLEAnd5Flu-OzITOEdCDDkatCKtpM6E5giCTIbsqFQCABsKyVT7QHfcJu9KWQ9DsDM5X90DaX0L-xCMA7Z-TcCbcvoTBjmHFd0oouVSoUpX5CD9pvCzIA2bOADlPi5vEeG8lOWdvAAX9Rxrlexym98rc-53Da10RnXQb-3LFxdghhMv5Gd5urDBfA"
                      width={1200}
                    />
                  </motion.div>
                  {/* Map Marker Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <motion.div 
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 12 }}
                      className="relative"
                    >
                      <motion.div 
                        animate={{ 
                          y: [0, -8, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut"
                        }}
                        className="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center"
                      >
                        <MapPin className="text-white h-5 w-5" />
                      </motion.div>
                      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-xl shadow-2xl border border-outline-variant/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-[10px] font-black text-primary uppercase tracking-tighter">Your Polling Unit</p>
                        <p className="text-xs font-bold text-on-surface mt-1">Victoria Island School</p>
                      </div>
                      {/* Marker Shadow */}
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut"
                        }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm"
                      />
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: EASING }}
                  className="bg-white/90 backdrop-blur-md p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/10"
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ rotate: 15 }}
                      className="bg-primary/10 p-3 rounded-xl"
                    >
                      <Navigation className="text-primary h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-on-surface text-lg">Route Navigation</h3>
                      <p className="text-xs text-on-surface-variant">Estimated 12 mins from your current location</p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="primary-button px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest w-full sm:w-auto"
                  >
                    Start Navigation
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Unit Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Unit Accessibility", value: "Fully Accessible", icon: Info },
                  { label: "Expected Crowd", value: "Moderate", icon: Users },
                  { label: "Opening Hours", value: "08:00 AM - 4:00 PM", icon: Clock },
                ].map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-surface-container-lowest p-4 rounded-xl shadow-civilized border border-outline-variant/5"
                  >
                    <item.icon className="text-primary h-4 w-4 mb-2 opacity-60" />
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{item.label}</p>
                    <p className="font-bold text-on-surface text-sm mt-1">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar Details Panel */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-civilized border border-outline-variant/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-black text-on-surface font-display tracking-tight uppercase">Unit Profile</h2>
                  <motion.span 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-tertiary-container/10 text-tertiary text-[10px] font-bold px-3 py-1 rounded-full"
                  >
                    ACTIVE
                  </motion.span>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">Designated Center</p>
                    <h3 className="text-xl font-bold text-on-surface leading-tight">Victoria Island Primary School, Block B</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-outline-variant/10">
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Unit Code</p>
                      <p className="font-mono font-bold text-primary">24-08-11-024</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Registered Voters</p>
                      <p className="font-bold text-on-surface tabular-nums">742 Citizens</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Contact Officials</p>
                    <motion.div 
                      whileHover={{ x: 5, backgroundColor: "rgba(0, 107, 63, 0.05)" }}
                      className="flex items-center justify-between p-3 bg-surface rounded-xl group cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-primary">AO</div>
                        <div>
                          <p className="text-xs font-bold text-on-surface">Adeola Okafor</p>
                          <p className="text-[10px] text-on-surface-variant">Presiding Officer</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                    </motion.div>
                  </div>

                  <div className="pt-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 border-2 border-primary/20 text-primary py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all"
                    >
                      <MapIcon className="h-4 w-4" />
                      View Full Area Map
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Alert Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-secondary-container text-on-secondary-fixed-variant p-6 rounded-2xl relative overflow-hidden shadow-lg shadow-secondary/10"
              >
                <div className="relative z-10">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Info className="h-4 w-4" />
                    </motion.div>
                    Security Update
                  </h4>
                  <p className="text-xs leading-relaxed opacity-90">This polling unit is categorized as a low-risk zone. Enhanced security protocols will be active on election day.</p>
                </div>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" 
                />
              </motion.div>
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
