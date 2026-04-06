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
  Flame,
  CheckCircle2,
  Map,
  Share2,
  ChevronRight,
  Megaphone,
  ScrollText,
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

export default function JourneyPage() {
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
    { label: "Journey", href: "/dashboard/journey", active: true, icon: Route },
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

        <div className="p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-12">
          <header className="space-y-2">
            <h2 className="text-3xl font-black text-primary tracking-tight font-display">Civic Journey</h2>
            <p className="text-on-surface-variant text-sm font-medium">Your path to shaping Nigeria&apos;s future</p>
          </header>

          {/* Hero Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* My Impact Card */}
            <div className="md:col-span-2 bg-primary-container p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-lg">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-white text-[10px] font-bold tracking-widest uppercase mb-4">My Impact</span>
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">You&apos;ve influenced 12<br/>voters this month.</h3>
              </div>
              <div className="flex items-center space-x-6 relative z-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-surface-container-high">
                      <Image
                        alt={`Influenced voter ${i}`}
                        src={`https://i.pravatar.cc/100?u=${i + 10}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white flex items-center justify-center text-white text-xs font-bold">+9</div>
                </div>
                <p className="text-white/80 text-xs sm:text-sm font-medium">Friends successfully verified their PVCs using your referral link.</p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </div>

            {/* Streak Card */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl flex flex-col justify-between shadow-civilized border border-outline-variant/10">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-secondary-container rounded-xl">
                    <Flame className="text-primary h-6 w-6 fill-primary/20" />
                  </div>
                  <span className="text-4xl font-black text-primary font-display">14</span>
                </div>
                <h4 className="text-xl font-bold text-on-surface">Day Streak</h4>
                <p className="text-on-surface-variant text-sm mt-2">You&apos;ve checked civic updates daily for 2 weeks!</p>
              </div>
              <div className="mt-6 flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-1.5 flex-1 bg-primary rounded-full"></div>
                ))}
                {[6, 7].map((i) => (
                  <div key={i} className="h-1.5 flex-1 bg-surface-container-high rounded-full"></div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-on-surface font-display">Your Timeline</h3>
                <p className="text-on-surface-variant">Tracing your civic engagement journey</p>
              </div>
              <div className="px-4 py-2 bg-tertiary-container rounded-lg text-white text-xs font-bold flex items-center w-fit">
                <CheckCircle2 className="h-4 w-4 mr-2 fill-white/20" />
                85% COMPLETE
              </div>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary to-surface-container-high"></div>
              
              <div className="space-y-12">
                {/* Step 1: Completed */}
                <div className="relative flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center z-10 border-4 border-surface shadow-lg">
                    <User className="text-white h-6 w-6" />
                  </div>
                  <div className="ml-6 sm:ml-8 bg-surface-container-lowest p-6 rounded-2xl flex-1 shadow-civilized border border-outline-variant/10 transition-transform group-hover:translate-x-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <h5 className="text-lg font-bold text-on-surface">Voter Registration</h5>
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-fixed-variant text-[10px] font-bold rounded-md uppercase">COMPLETED JAN 12</span>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed">You successfully registered as a voter at the Lagos Mainland INEC office. Your basic details have been captured and verified.</p>
                  </div>
                </div>

                {/* Step 2: Completed */}
                <div className="relative flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center z-10 border-4 border-surface shadow-lg">
                    <MapPin className="text-white h-6 w-6" />
                  </div>
                  <div className="ml-6 sm:ml-8 bg-surface-container-lowest p-6 rounded-2xl flex-1 shadow-civilized border border-outline-variant/10 transition-transform group-hover:translate-x-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <h5 className="text-lg font-bold text-on-surface">Polling Unit Verified</h5>
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-fixed-variant text-[10px] font-bold rounded-md uppercase">COMPLETED FEB 05</span>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed">Polling Unit: <strong className="text-on-surface">PU 023, Sabo-Yaba</strong>. We&apos;ve mapped the exact coordinates to help you plan your travel on election day.</p>
                    <div className="mt-4 flex gap-4">
                      <button className="text-primary text-xs font-bold flex items-center hover:underline gap-1.5">
                        <Map className="h-4 w-4" /> View Map
                      </button>
                      <button className="text-primary text-xs font-bold flex items-center hover:underline gap-1.5">
                        <Share2 className="h-4 w-4" /> Share Location
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3: Current */}
                <div className="relative flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-4 border-primary flex items-center justify-center z-10 shadow-lg ring-8 ring-primary/5">
                    <IdCard className="text-primary h-6 w-6" />
                  </div>
                  <div className="ml-6 sm:ml-8 bg-white p-6 sm:p-8 rounded-2xl flex-1 shadow-glass ring-2 ring-primary/10 transition-transform group-hover:translate-x-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <h5 className="text-lg font-bold text-primary">PVC Collection Verification</h5>
                      <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-md uppercase">IN PROGRESS</span>
                    </div>
                    <p className="text-on-surface text-sm leading-relaxed mb-6">Your Permanent Voter Card is ready for collection! Please visit the local government office to finalize this step.</p>
                    <div className="flex flex-col sm:flex-row items-center p-4 bg-surface-container-low rounded-xl gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <IdCard className="text-primary h-6 w-6" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-xs font-bold text-on-surface">Collection Center: Yaba LG Office</p>
                        <p className="text-xs text-on-surface-variant">Hours: 9:00 AM - 4:00 PM</p>
                      </div>
                      <button className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest shadow-md hover:brightness-110 active:scale-95 transition-all">Verify Receipt</button>
                    </div>
                  </div>
                </div>

                {/* Step 4: Upcoming */}
                <div className="relative flex items-start group opacity-60">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center z-10 border-4 border-surface shadow-sm">
                    <ScrollText className="text-on-surface-variant h-6 w-6" />
                  </div>
                  <div className="ml-6 sm:ml-8 bg-surface-container-low p-6 rounded-2xl flex-1 border border-dashed border-outline-variant transition-transform group-hover:translate-x-1">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-lg font-bold text-on-surface-variant">Election Day Participation</h5>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Upcoming</span>
                    </div>
                    <p className="text-on-surface-variant text-sm italic">Unlock this milestone after verifying your PVC collection.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Civic Milestones & Tips */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-on-surface font-display uppercase tracking-tight">Upcoming Milestones</h3>
              <div className="space-y-4">
                {[
                  { title: "Community Town Hall", time: "Next Tuesday, 5:00 PM • Virtual", icon: Megaphone, color: "bg-orange-100 text-orange-600" },
                  { title: "Manifesto Review Session", time: "Dec 15 • AI-led Comparison", icon: ScrollText, color: "bg-blue-100 text-blue-600" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center p-4 bg-surface-container-lowest rounded-2xl shadow-civilized border border-outline-variant/5 group cursor-pointer hover:bg-surface-container-low transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h6 className="text-sm font-bold text-on-surface">{item.title}</h6>
                      <p className="text-xs text-on-surface-variant">{item.time}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#002110] p-8 rounded-3xl text-white flex flex-col sm:flex-row items-center gap-8 overflow-hidden relative shadow-2xl">
              <div className="relative z-10 text-center sm:text-left">
                <h4 className="text-xl font-black mb-3 font-display">Expert Tip</h4>
                <p className="text-primary-fixed text-sm leading-relaxed mb-6 italic">
                  &quot;Verify your polling unit at least two weeks before election day to avoid last-minute logistics issues.&quot;
                </p>
                <button className="text-xs font-bold tracking-widest uppercase border-b-2 border-primary-fixed pb-1 hover:text-white transition-colors">
                  Read Civic Guide
                </button>
              </div>
              <div className="relative flex-shrink-0 z-10 w-24 h-24 sm:w-32 sm:h-32">
                <Image
                  alt="Civic Expert"
                  className="rounded-full border-4 border-primary-fixed/30 object-cover"
                  src="https://i.pravatar.cc/150?u=expert"
                  fill
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
          </section>
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
