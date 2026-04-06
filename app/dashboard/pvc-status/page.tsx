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
import {
  getStoredSession,
  clearStoredSession,
  getInitials,
  type LocalSession,
} from "../../../lib/local-auth";
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

        <div className="p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Registration Progress Card */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-civilized flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1 rounded-md text-[10px] font-bold tracking-wide mb-2 inline-block uppercase">
                    VOTER ID: 90F2-XXXX-XXXX
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-on-surface font-display tracking-tight">
                    Registration Status: <span className="text-primary">Verified</span>
                  </h2>
                </div>
                <div className="bg-tertiary-container/10 p-3 rounded-xl shrink-0">
                  <CheckCircle2 className="text-tertiary h-8 w-8 sm:h-10 sm:w-10" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-on-surface-variant uppercase tracking-wider text-[10px]">Overall Progress</span>
                  <span className="text-primary font-display">85% Complete</span>
                </div>
                <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[85%] rounded-full"></div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Your biometric data and documentation have been successfully cross-referenced with the national database. Your Permanent Voter&apos;s Card is currently in the <strong className="text-on-surface">final distribution phase</strong>.
                </p>
              </div>
            </div>

            {/* Quick Action Card: Availability */}
            <div className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-primary/20">
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="z-10">
                <h3 className="text-lg font-bold mb-1 opacity-90 font-display">PVC Availability</h3>
                <p className="text-2xl font-black mb-4 tracking-tight font-display">Ready for Pickup</p>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-lg p-3">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Expires in 14 days</span>
                </div>
              </div>
              <button className="z-10 mt-6 w-full bg-white text-primary py-3 rounded-full font-black text-xs shadow-lg hover:bg-surface-container-lowest transition-all active:scale-95 flex items-center justify-center space-x-2 uppercase tracking-widest">
                <span>Get Pickup Directions</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Pickup Center Details */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-civilized flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="text-primary h-5 w-5" />
                <h3 className="text-lg font-bold text-on-surface font-display tracking-tight uppercase">Pickup Center</h3>
              </div>
              <div className="flex-1 space-y-4">
                <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/5">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Assigned Center</p>
                  <p className="text-base font-bold text-on-surface">INEC LGA Office, Eti-Osa</p>
                  <p className="text-xs text-on-surface-variant mt-1">Km 15, Lekki-Epe Expressway, Lagos State.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/5">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Queue Status</p>
                    <p className="text-sm font-bold text-tertiary uppercase">Low Traffic</p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/5">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Avg. Wait Time</p>
                    <p className="text-sm font-bold text-on-surface uppercase">15 - 20 Mins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline / Roadmap */}
            <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col shadow-inner">
              <h3 className="text-lg font-bold text-on-surface font-display tracking-tight mb-8 uppercase">Journey to Election Day</h3>
              <div className="relative space-y-10">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-outline-variant/30"></div>
                
                <div className="relative flex items-start space-x-6">
                  <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-container text-white shadow-sm shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Data Capture & Enrollment</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1">Completed on Oct 12, 2023 • Alausa Enrollment Center</p>
                  </div>
                </div>

                <div className="relative flex items-start space-x-6">
                  <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-container text-white shadow-sm shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Verification & AFIS Filtering</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1">Completed on Dec 05, 2023 • Cleared of duplicates</p>
                  </div>
                </div>

                <div className="relative flex items-start space-x-6">
                  <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white ring-4 ring-primary-container text-primary shadow-md shrink-0">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm -mt-2 border-l-4 border-primary">
                    <h4 className="font-bold text-primary text-sm uppercase tracking-tight">PVC Collection Phase</h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Your card is now available at your designated LGA office. Please bring your registration slip.</p>
                    <div className="mt-3 flex space-x-4">
                      <button className="text-[10px] font-black text-primary underline uppercase tracking-widest hover:opacity-70 transition-opacity">Download Slip</button>
                      <button className="text-[10px] font-black text-primary underline uppercase tracking-widest hover:opacity-70 transition-opacity">Remind Me Later</button>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-start space-x-6">
                  <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant shrink-0">
                    <Vote className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface opacity-50 text-sm">Election Day Participation</h4>
                    <p className="text-[10px] text-on-surface-variant opacity-50 mt-1">Scheduled for Feb 2025 • Polling Unit 042</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert/Notification Banner */}
            <div className="lg:col-span-12 bg-secondary-container/30 border-l-4 border-primary-container rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
              <Info className="text-primary-container h-8 w-8 shrink-0" />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm font-bold text-on-secondary-container">Pro Tip: Saturday Collections</p>
                <p className="text-xs text-on-secondary-container opacity-80 mt-1">INEC centers are now open on Saturdays from 9 AM to 3 PM to facilitate faster collection before the deadline.</p>
              </div>
              <button className="text-[10px] font-black text-primary-container bg-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-primary-container hover:text-white transition-all uppercase tracking-widest shrink-0">
                Check Weekend Slots
              </button>
            </div>
          </div>

          {/* Supporting Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-civilized group cursor-pointer hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-on-surface mb-2 font-display">Required Documents</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">See the full list of what you need to present at the pickup center to claim your card.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-civilized group cursor-pointer hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-on-surface mb-2 font-display">Proxy Collection</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">Learn about the strict regulations regarding card collection for family members or third parties.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-civilized group cursor-pointer hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-on-surface mb-2 font-display">Lost Registration Slip</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">Don&apos;t panic. Follow these steps if you have misplaced your temporary registration paper.</p>
            </div>
          </div>
        </div>

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
