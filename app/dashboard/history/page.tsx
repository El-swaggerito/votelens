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
  ArrowRight,
  ShieldCheck,
  Info,
  Star,
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

export default function ElectionHistoryPage() {
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
    { label: "History", href: "/dashboard/history", active: true, icon: HistoryIcon },
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

      <main className="flex min-h-screen flex-1 flex-col lg:ml-64 w-full max-w-full overflow-x-hidden">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          branding={{ name: "VoteLens" }}
          searchPlaceholder="Search past elections, candidates..."
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

        <div className="p-3 sm:p-8 max-w-[1400px] w-full mx-auto space-y-8 sm:space-y-12 overflow-x-hidden">
          {/* Hero Header Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end overflow-hidden">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-fixed-variant text-[10px] font-bold rounded-md uppercase tracking-wider">
                Historical Data Repository
              </span>
              <h1 className="text-2xl sm:text-6xl font-black text-on-background leading-tight tracking-tighter font-display break-words">
                Tracing the Path of <br className="hidden sm:block" />
                <span className="text-primary italic">Democratic Resilience.</span>
              </h1>
              <p className="text-on-surface-variant text-sm sm:text-lg max-w-2xl leading-relaxed">
                Explore Nigeria&apos;s electoral journey from 1999 to the present.
                Comprehensive data visualization of results, turnout trends, and
                historical milestones.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border border-outline-variant/10 w-full max-w-xs text-center space-y-2">
                <span className="text-4xl font-black text-primary font-display">
                  24+
                </span>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Years of Democracy
                </p>
                <div className="h-1 w-12 bg-primary mx-auto"></div>
              </div>
            </div>
          </section>

          {/* Filters and Tabs */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex bg-surface-container-low p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth">
              <div className="flex min-w-max md:min-w-0">
                <button className="px-4 sm:px-6 py-2 bg-surface-container-lowest text-primary font-bold rounded-lg shadow-sm text-xs whitespace-nowrap">
                  All Elections
                </button>
                <button className="px-4 sm:px-6 py-2 text-on-surface-variant hover:text-primary font-medium text-xs transition-colors whitespace-nowrap">
                  Presidential
                </button>
                <button className="px-4 sm:px-6 py-2 text-on-surface-variant hover:text-primary font-medium text-xs transition-colors whitespace-nowrap">
                  Gubernatorial
                </button>
                <button className="px-4 sm:px-6 py-2 text-on-surface-variant hover:text-primary font-medium text-xs transition-colors whitespace-nowrap">
                  Legislative
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <div className="flex items-center gap-3 min-w-max md:min-w-0">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest shrink-0">
                  Filter Year:
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 border-2 border-primary text-primary font-bold rounded-full text-[10px] uppercase tracking-wider whitespace-nowrap">
                    2023
                  </button>
                  <button className="px-4 py-1.5 border-2 border-transparent bg-surface-container-high text-on-surface-variant font-bold rounded-full text-[10px] uppercase tracking-wider hover:border-outline-variant transition-all whitespace-nowrap">
                    2019
                  </button>
                  <button className="px-4 py-1.5 border-2 border-transparent bg-surface-container-high text-on-surface-variant font-bold rounded-full text-[10px] uppercase tracking-wider hover:border-outline-variant transition-all whitespace-nowrap">
                    2015
                  </button>
                  <button className="px-4 py-1.5 border-2 border-transparent bg-surface-container-high text-on-surface-variant font-bold rounded-full text-[10px] uppercase tracking-wider hover:border-outline-variant transition-all whitespace-nowrap">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Archive Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 2023 Presidential Card */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-civilized hover:shadow-glass transition-all flex flex-col md:flex-row group border border-transparent hover:border-primary/10">
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <Image
                  alt="Crowd voting in Nigeria"
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  height={600}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp2WBYD-sv2xDJN4rfaiDc18N6ogljZ7E8Ldhf7xKRsGzeOMoc7yehqS-GiozQlq2zEhWmY40J_0-I_aQVWPCglVFjjaVzzh7s5BHS0zcGalXwvhPlInW0HpaNgTjE1O1CJK1nqV49_9oYd6EvmT5IhBv70_u-7QFJp0gMxWUYEhVaw1tBOdmSqObLePVO0XtKmQYZWHNBwMDoo0bCouIPSGj8luTDXvsw-NO56NpJvewet7z6ymZQ94hAO4-_H99EM8GLrDhoaZo"
                  width={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                    Latest Archive
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black font-display">
                    2023 General Election
                  </h3>
                </div>
              </div>
              <div className="md:w-1/2 p-6 sm:p-8 space-y-6 flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Winner
                    </p>
                    <p className="font-bold text-lg text-primary">
                      Bola Tinubu (APC)
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Turnout
                    </p>
                    <p className="font-bold text-lg tabular-nums">26.72%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-medium text-on-surface-variant">
                      Lead Margin
                    </span>
                    <span className="text-sm font-black text-on-surface">
                      1.8M Votes
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[37%]"></div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                  View Full Result Breakdown
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2019 Presidential Card */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-civilized border border-outline-variant/10 space-y-6 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    Feb 23, 2019
                  </span>
                  <h3 className="text-2xl font-black text-on-background font-display">
                    2019 Presidential
                  </h3>
                </div>
                <ShieldCheck className="text-primary h-8 w-8" />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-sm text-on-surface-variant">Winner</span>
                  <span className="text-sm font-bold">M. Buhari (APC)</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-sm text-on-surface-variant">
                    Total Votes
                  </span>
                  <span className="text-sm font-bold tabular-nums">27.3M</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-sm text-on-surface-variant">
                    States Won
                  </span>
                  <span className="text-sm font-bold">19 of 36</span>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <div className="flex-1 text-center py-3 bg-surface-container-low rounded-lg">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    APC
                  </p>
                  <p className="text-lg font-black text-primary tabular-nums">
                    55.6%
                  </p>
                </div>
                <div className="flex-1 text-center py-3 bg-surface-container-low rounded-lg">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    PDP
                  </p>
                  <p className="text-lg font-black text-on-surface-variant tabular-nums">
                    41.2%
                  </p>
                </div>
              </div>
            </div>

            {/* History Timeline Section */}
            <div className="lg:col-span-3 pt-12 space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-on-background uppercase tracking-tight font-display">
                  The Democratic Journey
                </h2>
                <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
              </div>
              <div className="relative px-4">
                {/* Vertical Line */}
                <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-outline-variant/30 to-surface sm:transform sm:-translate-x-1/2"></div>
                <div className="space-y-16">
                  {/* 2015 Point */}
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between group pl-12 sm:pl-0">
                    <div className="sm:w-[45%] text-left sm:text-right sm:pr-8 space-y-2 mb-4 sm:mb-0">
                      <h4 className="text-lg sm:text-xl font-black text-primary font-display">
                        2015 Transition
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        First time an incumbent president was defeated in
                        Nigeria&apos;s history.
                      </p>
                    </div>
                    <div className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-8 ring-primary/10 z-10 top-2 sm:top-auto"></div>
                    <div className="sm:w-[45%] sm:pl-8 w-full">
                      <div className="relative h-40 sm:h-32 w-full overflow-hidden rounded-xl">
                        <Image
                          alt="Historic handshake"
                          className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-sm"
                          height={200}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCADCiVN4l2itbQkYTYEDLn02Q_mWMwp-1FaJI69yGKwXhuU6cJ7qc0opH_NvJ4YThoIb9BdkAuJkMl6mk3MOy0Ak0TzKxpv8a63Yc_1othAUK9EFI3F0UE5jQRSHbLqnwaf7qyI9doQ2-jq8FDLqFEZsKzPT5yjVO46QdStfti_0_jq8UNV__ogAbqmqSjLA47N9asYLiforPlw0KNCOG88bL0-lb0da-fhtK5ZhAoSS5Nk3_u3mYhrcBHGCVKnsp63uy2lVgLRaA"
                          width={300}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 2011 Point */}
                  <div className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center justify-between group pl-12 sm:pl-0">
                    <div className="sm:w-[45%] text-left sm:pl-8 space-y-2 mb-4 sm:mb-0">
                      <h4 className="text-lg sm:text-xl font-black text-on-background font-display">
                        2011 Reforms
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Introduction of biometric registration systems.
                      </p>
                    </div>
                    <div className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-on-surface-variant ring-4 ring-on-surface-variant/10 z-10 top-2 sm:top-auto"></div>
                    <div className="sm:w-[45%] sm:pr-8 w-full">
                      <div className="w-full h-24 sm:h-32 bg-surface-container-high rounded-xl border-2 border-dashed border-outline-variant flex items-center justify-center p-4 text-center">
                        <p className="text-[10px] sm:text-xs font-bold text-outline uppercase tracking-widest">
                          Biometric Era Begins
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 1999 Point */}
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between group pl-12 sm:pl-0">
                    <div className="sm:w-[45%] text-left sm:text-right sm:pr-8 space-y-2 mb-4 sm:mb-0">
                      <h4 className="text-lg sm:text-xl font-black text-on-background font-display">
                        1999 Fourth Republic
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Return to civilian rule after military governance.
                      </p>
                    </div>
                    <div className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container ring-8 ring-primary-container/10 z-10 flex items-center justify-center shadow-lg top-1 sm:top-auto">
                      <Star className="text-white h-3 w-3 fill-white" />
                    </div>
                    <div className="sm:w-[45%] sm:pl-8 w-full">
                      <div className="aspect-square w-16 bg-primary text-white flex items-center justify-center rounded-xl font-black text-xl sm:text-2xl rotate-3 group-hover:rotate-0 transition-transform font-display">
                        99
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Transparency Note */}
          <section className="bg-surface-container-low p-6 sm:p-8 rounded-xl border-l-4 border-primary space-y-4">
            <div className="flex items-center gap-3">
              <Info className="text-primary h-5 w-5" />
              <h3 className="font-bold text-lg uppercase tracking-tight font-display">
                Archival Integrity Notice
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-4xl">
              All data presented in this archive is sourced directly from
              certified INEC (Independent National Electoral Commission)
              reports. VoteLens maintains a strict non-partisan commitment to
              curating truth for the Nigerian electorate. Historical results are
              final and for educational purposes.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              <a
                className="text-[10px] font-black text-primary underline uppercase tracking-widest hover:opacity-70 transition-opacity"
                href="#"
              >
                Download 2023 Summary (PDF)
              </a>
              <a
                className="text-[10px] font-black text-primary underline uppercase tracking-widest hover:opacity-70 transition-opacity"
                href="#"
              >
                Visit INEC Portal
              </a>
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
