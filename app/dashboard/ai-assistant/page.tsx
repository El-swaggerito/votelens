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

export default function AIAssistantPage() {
  const router = useRouter();
  const [session, setSession] = useState<LocalSession | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPidgin, setIsPidgin] = useState(false);

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
    { label: "AI Assistant", href: "/dashboard/ai-assistant", active: true, icon: Bot },
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

        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 sm:p-8 overflow-hidden max-w-[1600px] mx-auto w-full">
          {/* Left: Chat Interface */}
          <section className="flex-1 flex flex-col bg-surface-container-lowest rounded-2xl shadow-civilized border border-outline-variant/10 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">VoteLens Civic AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-tertiary"></span>
                    <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Always Verifying Data</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-on-surface-variant">Explain in Pidgin</span>
                <button 
                  onClick={() => setIsPidgin(!isPidgin)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${isPidgin ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${isPidgin ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 max-h-[500px] custom-scrollbar">
              {/* AI Intro */}
              <div className="flex gap-4 max-w-[90%] sm:max-w-[85%] animate-in fade-in slide-in-from-left-2">
                <div className="mt-1 h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="bg-surface-container rounded-2xl rounded-tl-none p-4 text-sm text-on-surface leading-relaxed shadow-sm">
                    Welcome to your civic architect. I can help you verify your PVC status, find your polling unit, or explain electoral laws in simple terms. How can I serve you today?
                  </div>
                  <span className="text-[10px] text-on-surface-variant px-1 uppercase tracking-wider font-bold">System Agent • Just Now</span>
                </div>
              </div>

              {/* User Message Example */}
              <div className="flex gap-4 max-w-[90%] sm:max-w-[85%] ml-auto flex-row-reverse animate-in fade-in slide-in-from-right-2">
                <div className="mt-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="space-y-2 text-right">
                  <div className="bg-primary text-white rounded-2xl rounded-tr-none p-4 text-sm leading-relaxed shadow-md">
                    How do I check my PVC status for the 2024 elections?
                  </div>
                  <span className="text-[10px] text-on-surface-variant px-1 uppercase tracking-wider font-bold">You • 2m ago</span>
                </div>
              </div>

              {/* AI Response Example */}
              <div className="flex gap-4 max-w-[90%] sm:max-w-[85%] animate-in fade-in slide-in-from-left-2">
                <div className="mt-1 h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-4 w-full">
                  <div className="bg-surface-container rounded-2xl rounded-tl-none p-4 text-sm text-on-surface leading-relaxed shadow-sm">
                    Checking your PVC status is simple. You have two primary official channels:
                    <ul className="mt-3 space-y-2 list-disc pl-4">
                      <li>Visit the <span className="text-primary font-bold">INEC Voter Verification Portal</span> at cvr.inecnigeria.org.</li>
                      <li>Send your State, Surname, and the last 5 digits of your VIN to the official INEC shortcode.</li>
                    </ul>
                    Would you like me to guide you through the website steps?
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-tertiary-container/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded border border-tertiary/20 uppercase tracking-tighter">Verified by INEC Portal</span>
                  </div>
                </div>
              </div>
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
                  ].map((prompt) => (
                    <button 
                      key={prompt}
                      className="px-4 py-2 rounded-full border border-outline-variant/30 text-[10px] font-bold text-on-surface-variant hover:bg-primary/5 hover:border-primary hover:text-primary transition-all uppercase tracking-tight"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative flex items-center group">
                <input 
                  className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/20 rounded-xl py-4 pl-5 pr-14 text-sm placeholder:text-on-surface-variant/50 transition-all" 
                  placeholder="Type your civic question here..." 
                  type="text"
                />
                <button className="absolute right-3 p-2 bg-primary text-white rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Right: Sidebar Resources */}
          <aside className="w-full lg:w-80 flex flex-col gap-6">
            {/* Resource Card 1: Official Links */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-civilized border border-outline-variant/5">
              <h3 className="text-sm font-black text-primary mb-6 flex items-center gap-2 uppercase tracking-tight">
                <Library className="h-4 w-4" />
                Civic Resources
              </h3>
              <div className="space-y-3">
                {[
                  { title: "INEC Voter Portal", sub: "Verify details officially", icon: ExternalLink },
                  { title: "Electoral Act 2022", sub: "Full legal document", icon: FileText },
                  { title: "Polling Unit Finder", sub: "Interactive GIS Map", icon: MapIcon },
                ].map((resource) => (
                  <a 
                    key={resource.title}
                    className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-primary/5 group transition-all border border-transparent hover:border-primary/10" 
                    href="#"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">{resource.title}</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5">{resource.sub}</span>
                    </div>
                    <resource.icon className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Resource Card 2: Trending Questions */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-civilized border border-outline-variant/5">
              <h3 className="text-sm font-black text-primary mb-6 flex items-center gap-2 uppercase tracking-tight">
                <TrendingUp className="h-4 w-4" />
                Trending Now
              </h3>
              <ul className="space-y-4">
                {[
                  { id: "01", text: "What happens if I lose my PVC?" },
                  { id: "02", text: "Transferring polling units across states" },
                  { id: "03", text: "New guidelines for Diaspora voting" },
                ].map((trend) => (
                  <li key={trend.id} className="flex items-start gap-4 group cursor-pointer">
                    <span className="text-primary font-black text-xs mt-0.5">{trend.id}</span>
                    <p className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                      {trend.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile Prompt Card */}
            <div className="bg-primary text-on-primary rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-primary/20">
              <div className="relative z-10">
                <h4 className="text-lg font-black mb-2 font-display uppercase tracking-tight">Ready to Vote?</h4>
                <p className="text-xs opacity-90 mb-6 leading-relaxed font-medium">
                  Ensure your biometric verification is up to date before the registration deadline.
                </p>
                <button className="w-full bg-white text-primary font-black py-3 rounded-full text-xs hover:bg-primary-fixed hover:text-on-primary-fixed transition-all active:scale-95 uppercase tracking-widest shadow-md">
                  Register to Vote
                </button>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10">
                <IdCard className="h-24 w-24" />
              </div>
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </aside>
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

      {/* Floating AI Assistant (Disabled on this page since it IS the assistant) */}
    </div>
  );
}
