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
  Search,
  Megaphone,
  Verified,
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

export default function NotificationsPage() {
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
    { label: "PVC Status", href: "/dashboard/pvc-status", icon: IdCard },
    { label: "Polling Unit", href: "/dashboard/polling-unit", icon: MapPin },
    { label: "History", href: "/dashboard/history", icon: HistoryIcon },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Journey", href: "/dashboard/journey", icon: Route },
    { label: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
    { label: "Notifications", href: "/dashboard/notifications", active: true, icon: Bell },
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

        <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full flex-1 space-y-8">
          {/* Filters & Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black text-on-surface tracking-tight font-display">Inbox</h3>
              <p className="text-on-surface-variant text-sm font-medium mt-1">Stay informed with the latest updates from VoteLens and INEC.</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex p-1 bg-surface-container-high rounded-xl w-fit">
              <button className="px-6 py-2 text-xs font-bold bg-white text-primary rounded-lg shadow-sm transition-all uppercase tracking-widest">
                All
              </button>
              <button className="px-6 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all uppercase tracking-widest">
                Unread
              </button>
              <button className="px-6 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all uppercase tracking-widest">
                Important
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {/* Alert Type: Announcement */}
            <div className="group relative bg-surface-container-lowest rounded-2xl p-6 transition-all duration-300 hover:shadow-civilized flex items-start gap-5 border border-outline-variant/10">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-primary rounded-r-full"></div>
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                <Megaphone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-secondary-container text-on-secondary-fixed-variant">Announcement</span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">2 hours ago</span>
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-2 font-display">New Polling Unit Relocation Guidelines</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">INEC has updated the procedures for polling unit transfers ahead of the upcoming municipal elections. Ensure your PVC is mapped to the correct ward.</p>
                <div className="flex items-center gap-4">
                  <button className="text-primary font-bold text-xs flex items-center gap-1.5 hover:underline uppercase tracking-widest">
                    Read Full Guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-1">
                    <Archive className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Alert Type: Verification */}
            <div className="group bg-surface-container-lowest rounded-2xl p-6 transition-all duration-300 hover:shadow-civilized flex items-start gap-5 border border-outline-variant/10">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-tertiary-container text-on-tertiary-container">Verification Success</span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Yesterday</span>
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-2 font-display">PVC Information Successfully Validated</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">Your voter identification details have been matched with the national database. You are now cleared for the civic journey phase.</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => router.push("/dashboard/profile")}
                    className="text-primary font-bold text-xs flex items-center gap-1.5 hover:underline uppercase tracking-widest"
                  >
                    View Profile
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Alert Type: Urgent Alert */}
            <div className="group bg-surface-container-lowest rounded-2xl p-6 transition-all duration-300 hover:shadow-civilized flex items-start gap-5 border border-outline-variant/10">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-error-container/10 flex items-center justify-center text-error">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-error-container text-on-error-container">Urgent Alert</span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Mar 12, 2024</span>
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-2 font-display">Security Update: Action Required</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">A new login was detected from a Chrome browser on Windows in Abuja. If this wasn&apos;t you, please secure your account immediately.</p>
                <div className="flex items-center gap-4">
                  <button className="bg-error text-on-error px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-md shadow-error/10">
                    Secure Account
                  </button>
                  <button className="text-on-surface-variant font-black text-[10px] uppercase tracking-widest hover:text-on-surface px-4 py-2">
                    I recognize this
                  </button>
                </div>
              </div>
            </div>

            {/* Alert Type: Reminder */}
            <div className="group bg-surface-container-lowest/50 rounded-2xl p-6 border border-dashed border-outline-variant/20 transition-all duration-300 flex items-start gap-5 opacity-80">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-surface-container text-on-surface-variant">Upcoming</span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Mar 10, 2024</span>
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-2 font-display">Voter Registration Deadline Approaching</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed italic">The window for new registrations in your current district closes in 5 days. Ensure all friends and family are enrolled.</p>
              </div>
            </div>
          </div>

          {/* Empty State / Load More */}
          <div className="mt-12 flex flex-col items-center">
            <div className="w-16 h-1 bg-surface-container-high rounded-full mb-8"></div>
            <button className="flex items-center gap-2 px-8 py-3 bg-surface-container-lowest text-primary font-black text-[10px] uppercase tracking-widest rounded-full shadow-civilized hover:shadow-glass transition-all active:scale-95 border border-outline-variant/5">
              Load Older Notifications
              <ChevronDown className="h-4 w-4" />
            </button>
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
