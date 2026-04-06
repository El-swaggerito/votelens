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
  Vote,
  Verified,
  Map as MapIcon,
  Clock,
  Plus,
  Minus,
  Filter,
  FileDown,
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

export default function AnalyticsPage() {
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
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      active: true,
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
          searchPlaceholder="Search districts or parties..."
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

        <div className="p-3 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6 sm:space-y-8 overflow-x-hidden">
          {/* Summary Stats Bento Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                label: "Total Votes Cast",
                value: "24,892,104",
                change: "+12.4%",
                icon: Vote,
                tone: "tertiary",
              },
              {
                label: "Accredited Voters",
                value: "25,231,008",
                change: "Live",
                icon: Verified,
                tone: "neutral",
              },
              {
                label: "Reporting Units",
                value: "173,402",
                change: "98% reporting",
                icon: MapIcon,
                tone: "error",
              },
              {
                label: "Last Result Entry",
                value: "Lagos/Ikeja",
                change: "Update: 2m ago",
                icon: Clock,
                tone: "primary",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-container-lowest p-4 sm:p-6 rounded-xl shadow-civilized flex flex-col justify-between group min-w-0 overflow-hidden border border-outline-variant/5"
              >
                <div className="flex justify-between items-start">
                  <span className="p-2 bg-secondary-container text-primary rounded-lg shrink-0">
                    <stat.icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap overflow-hidden text-ellipsis ${
                      stat.tone === "tertiary"
                        ? "text-tertiary-container bg-tertiary-container/10"
                        : stat.tone === "error"
                          ? "text-error bg-error-container/20"
                          : stat.tone === "primary"
                            ? "text-primary-container bg-primary-container/10"
                            : "text-on-surface-variant bg-surface-container-low"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4 min-w-0">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest truncate">
                    {stat.label}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-on-surface font-display mt-1 break-all">
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
          </section>

          {/* Main Analytics Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Party Performance Chart */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-4 sm:p-8 shadow-civilized overflow-hidden flex flex-col border border-outline-variant/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
                <div>
                  <h4 className="text-lg font-bold text-primary font-display uppercase tracking-tight">
                    National Lead Performance
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Aggregated results across all 36 states
                  </p>
                </div>
                <div className="flex bg-surface-container-low p-1 rounded-full w-full sm:w-auto overflow-hidden">
                  <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                    Bar Chart
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-full text-on-surface-variant text-[10px] font-bold uppercase tracking-wider hover:bg-surface-variant transition-all whitespace-nowrap">
                    Line Trend
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-x-auto no-scrollbar pt-2 sm:pt-4">
                <div className="flex items-end gap-6 sm:gap-12 min-h-[250px] sm:min-h-[300px] min-w-[400px]">
                  {[
                    { name: "Party A", value: "8.4M", height: "85%", color: "bg-primary" },
                    { name: "Party B", value: "7.2M", height: "72%", color: "bg-secondary-fixed-dim" },
                    { name: "Party C", value: "5.8M", height: "58%", color: "bg-tertiary-fixed-dim" },
                    { name: "Others", value: "1.2M", height: "15%", color: "bg-surface-variant" },
                  ].map((party) => (
                    <div key={party.name} className="flex-1 flex flex-col items-center gap-4">
                      <div className={`w-full ${party.color} rounded-t-xl relative group transition-all duration-500 hover:brightness-110`} style={{ height: party.height }}>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-background text-white px-3 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-10">
                          {party.value}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        {party.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            <div className="lg:col-span-4 bg-[#002110] text-white rounded-xl p-4 sm:p-8 flex flex-col relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-20 blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-3 mb-8">
                <Bot className="text-primary-fixed h-6 w-6" />
                <h4 className="text-lg font-bold font-display uppercase tracking-tight">
                  AI Live Insights
                </h4>
              </div>
              <div className="space-y-6 relative z-10">
                {[
                  {
                    tag: "Trend Alert",
                    content: "Party B is showing significant gains in the North-Central region compared to 2019 data.",
                  },
                  {
                    tag: "Voter Behavior",
                    content: "Youth turnout in urban centers has exceeded projections by 14%, favoring non-incumbent parties.",
                  },
                  {
                    tag: "Projected Outcome",
                    content: "Based on current reporting from 70% of polling units, a run-off scenario probability has increased to 35%.",
                  },
                ].map((insight) => (
                  <div key={insight.tag} className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                    <p className="text-[10px] font-black text-primary-fixed uppercase tracking-[0.2em] mb-2">
                      {insight.tag}
                    </p>
                    <p className="text-sm text-secondary-fixed leading-relaxed">
                      {insight.content}
                    </p>
                  </div>
                ))}
              </div>
              <button className="mt-10 w-full py-4 bg-primary-fixed text-on-primary-fixed font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-black/20">
                Ask Assistant Anything
              </button>
            </div>
          </section>

          {/* Map & Regional Breakdown */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-8 h-[400px] sm:h-[500px] flex flex-col shadow-inner border border-outline-variant/10 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h4 className="text-lg font-bold text-on-surface font-display uppercase tracking-tight">
                  Regional Lead Density
                </h4>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary shrink-0"></span> Party A
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-secondary shrink-0"></span> Party B
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-tertiary shrink-0"></span> Party C
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-xl overflow-hidden relative border border-outline-variant/10 shadow-sm">
                <Image
                  alt="Regional Lead Map"
                  className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
                  height={800}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkbxAmIUpxxUKqlQQawXM0ZRlMbVcNtkmjsdjcvJn5z5zrfkGwNT7ey_p9YuhFWVb6Pa8JPxLg_h9veoKDn9WoiU-IHIIhijkUxRK0l5EXiS0LF6fWgmLiDSTeguwqQEuGQC_96wH2-m1vjGFd_v8XvZQDQIkgy5eJ4hthuE695aKnT3UYoRVGBNJXa83srcvrbXVMS5Sltr_mf2xZVyzb1RoYz1timBwPduXBrA5NyP2WgK9RgtAHVEnMtWCiTcihq9PyVqOvFeQ"
                  width={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-primary border border-outline-variant/10 hover:scale-105 active:scale-95 transition-all">
                    <Plus className="h-5 w-5" />
                  </button>
                  <button className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-primary border border-outline-variant/10 hover:scale-105 active:scale-95 transition-all">
                    <Minus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-8 shadow-civilized flex flex-col border border-outline-variant/5">
              <h4 className="text-lg font-bold text-on-surface font-display uppercase tracking-tight mb-6 sm:mb-8">
                Regional Breakdown
              </h4>
              <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 pr-2 custom-scrollbar">
                {[
                  { name: "Lagos State", counted: "82%", a: "1.2M", b: "0.8M", c: "0.6M", aw: 45, bw: 30, cw: 25 },
                  { name: "Kano State", counted: "94%", a: "0.9M", b: "1.7M", c: "0.4M", aw: 30, bw: 55, cw: 15 },
                  { name: "Rivers State", counted: "65%", a: "0.8M", b: "0.3M", c: "0.5M", aw: 50, bw: 20, cw: 30 },
                ].map((region) => (
                  <div key={region.name} className="p-4 sm:p-5 bg-surface rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all group min-w-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-black text-on-surface uppercase tracking-tight truncate mr-2">
                        {region.name}
                      </span>
                      <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded whitespace-nowrap shrink-0">
                        {region.counted}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full flex overflow-hidden shadow-inner">
                      <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${region.aw}%` }}></div>
                      <div className="bg-secondary h-full transition-all duration-1000" style={{ width: `${region.bw}%` }}></div>
                      <div className="bg-tertiary h-full transition-all duration-1000" style={{ width: `${region.cw}%` }}></div>
                    </div>
                    <div className="flex flex-wrap justify-start mt-3 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.1em] gap-x-4 gap-y-2">
                      <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> A: {region.a}</span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> B: {region.b}</span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> C: {region.c}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Data Table Section */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-civilized overflow-hidden border border-outline-variant/5">
            <div className="p-4 sm:p-8 border-b border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h4 className="text-lg font-bold text-on-surface font-display uppercase tracking-tight">
                  Senate Seat Distribution
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Live tabulation by constituency
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select className="flex-1 md:flex-none bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant focus:ring-2 focus:ring-primary/20">
                  <option>All Zones</option>
                  <option>North West</option>
                  <option>South East</option>
                </select>
                <button className="bg-surface-container-low p-2.5 rounded-xl text-on-surface-variant hover:text-primary transition-colors">
                  <Filter className="h-4 w-4" />
                </button>
                <button className="flex-1 md:flex-none bg-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/10 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <FileDown className="h-3.5 w-3.5" />
                  Export CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto no-scrollbar w-full">
              <table className="w-full text-left min-w-[600px] sm:min-w-[800px]">
                <thead className="bg-surface-container-low text-on-surface-variant text-[10px] uppercase font-black tracking-[0.2em]">
                  <tr>
                    <th className="px-4 sm:px-8 py-5">Constituency</th>
                    <th className="px-4 sm:px-8 py-5">Current Lead</th>
                    <th className="px-4 sm:px-8 py-5">Vote Count</th>
                    <th className="px-4 sm:px-8 py-5">Margin</th>
                    <th className="px-4 sm:px-8 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {[
                    { name: "Abuja FCT Central", lead: "Party A", count: "142,301", margin: "+12,042", color: "bg-primary", status: "Verified" },
                    { name: "Edo South", lead: "Party C", count: "98,124", margin: "+4,521", color: "bg-tertiary", status: "Pending" },
                    { name: "Kaduna North", lead: "Party B", count: "210,049", margin: "+45,100", color: "bg-secondary", status: "Verified" },
                  ].map((row) => (
                    <tr key={row.name} className="hover:bg-surface-container-low/30 transition-colors group">
                      <td className="px-4 sm:px-8 py-6 font-bold text-on-surface uppercase tracking-tight">{row.name}</td>
                      <td className="px-4 sm:px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-md ${row.color} shadow-sm group-hover:scale-110 transition-transform`}></div>
                          <span className="font-bold text-on-surface-variant uppercase text-xs">{row.lead}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-8 py-6 font-bold tabular-nums">{row.count}</td>
                      <td className="px-4 sm:px-8 py-6 text-tertiary font-black tabular-nums">{row.margin}</td>
                      <td className="px-4 sm:px-8 py-6">
                        <span className={`px-3 py-1.5 ${row.status === "Verified" ? "bg-tertiary-container text-white" : "bg-secondary-container text-on-secondary-fixed-variant"} text-[10px] font-black uppercase rounded-lg shadow-sm whitespace-nowrap`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
