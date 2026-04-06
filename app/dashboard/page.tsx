"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getStoredSession,
  clearStoredSession,
  getInitials,
  type LocalSession,
} from "../../lib/local-auth";

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

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      {/* SideNavBar - Desktop */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-surface-container-lowest border-r border-outline-variant/10 lg:flex">
        <div className="flex flex-col h-full py-6 px-4 space-y-2">
          <div className="flex items-center space-x-3 px-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-on-primary shadow-sm">
              <span className="text-xl font-bold">VL</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary leading-none">VoteLens</h1>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">The Civic Architect</p>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1">
            {[
              { name: "Dashboard", active: true },
              { name: "Profile" },
              { name: "PVC Status" },
              { name: "Polling Unit" },
              { name: "History" },
              { name: "Analytics" },
              { name: "Journey" },
              { name: "AI Assistant" },
            ].map((item) => (
              <button
                key={item.name}
                className={`flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  item.active
                    ? "bg-primary/8 text-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
                type="button"
              >
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="pt-4 mt-4 border-t border-outline-variant/10">
            <button className="primary-button w-full py-3 text-sm font-bold shadow-lg shadow-primary/10">
              Register to Vote
            </button>
          </div>

          <div className="mt-auto pt-6 space-y-1">
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
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 transform bg-surface-container-lowest transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full py-6 px-4">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-on-primary">
                <span className="text-xl font-bold">VL</span>
              </div>
              <span className="text-lg font-bold text-primary">VoteLens</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2">✕</button>
          </div>
          <nav className="flex-1 space-y-1">
            {["Dashboard", "Profile", "PVC Status", "Polling Unit", "History", "Analytics", "Journey", "AI Assistant"].map((name) => (
              <button
                key={name}
                className="flex w-full items-center px-3 py-3 text-on-surface-variant hover:bg-surface-container-low rounded-lg"
                type="button"
              >
                {name}
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6 space-y-4">
            <button className="primary-button w-full py-3 text-sm font-bold">Register to Vote</button>
            <button onClick={handleLogout} className="w-full text-center text-sm font-bold text-on-surface-variant">Logout</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex min-h-screen flex-1 flex-col lg:ml-64">
        {/* TopNavBar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-civilized">
          <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-3 sm:px-8">
            <div className="flex flex-1 items-center max-w-xl">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="mr-4 p-2 lg:hidden text-on-surface-variant"
              >
                ☰
              </button>
              <div className="relative w-full hidden xs:block">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">⌕</span>
                <input
                  className="w-full rounded-xl bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20"
                  placeholder="Search electoral data..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-4 sm:ml-8">
              <nav className="hidden xl:flex items-center space-x-6 text-sm font-semibold font-display">
                <a className="text-primary border-b-2 border-primary pb-1" href="#">Dashboard</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Education</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Voter Map</a>
              </nav>
              <div className="flex items-center space-x-3 pl-4 sm:pl-6 border-l border-outline-variant/10">
                <button className="relative p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                  <span>🔔</span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-on-surface leading-none">{session.fullName}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider font-bold">Verified Voter</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary font-bold shadow-sm">
                    {getInitials(session.fullName)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Canvas */}
        <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
              <div className="bg-surface-container-lowest px-4 py-2 rounded-xl shadow-civilized border border-outline-variant/10">
                <span className="text-primary font-black text-lg">142</span>
                <span className="ml-2 text-[10px] uppercase text-on-surface-variant font-bold tracking-widest">Days</span>
              </div>
            </div>
          </div>

          {/* Bento Grid Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Status Card */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-civilized">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl transition-colors duration-500 group-hover:bg-primary/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-lg text-xs font-bold flex items-center gap-2">
                    <span className="text-[14px]">✓</span> PVC VERIFIED
                  </span>
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
                  ].map(([label, value]) => (
                    <div key={label} className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/5">
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">{label}</p>
                      <p className="font-bold text-on-surface">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="md:col-span-4 bg-primary p-6 sm:p-8 rounded-xl text-on-primary shadow-lg shadow-primary/20 flex flex-col justify-between h-full group cursor-pointer overflow-hidden relative">
              <div className="absolute bottom-0 right-0 p-2 opacity-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-8xl">📍</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Find Polling Unit</h3>
                <p className="text-primary-fixed/80 text-sm leading-relaxed">View the exact geographic coordinates and navigation route to your assigned voting station.</p>
              </div>
              <div className="mt-8 flex items-center justify-between relative z-10">
                <span className="text-sm font-bold border-b border-primary-fixed">Get Directions</span>
                <span className="text-xl">→</span>
              </div>
            </div>

            {/* Polling Unit Map Snippet */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-civilized">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-primary font-display uppercase tracking-widest">Polling Unit 012</h4>
                <span className="text-on-surface-variant">•••</span>
              </div>
              <div className="h-40 rounded-xl overflow-hidden mb-4 relative bg-surface-container-low">
                <Image
                  alt="Polling Unit Map"
                  className="w-full h-full object-cover"
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
            </div>

            {/* Civic Timeline */}
            <div className="md:col-span-5 bg-surface-container-lowest rounded-xl p-6 shadow-civilized">
              <h4 className="text-sm font-bold text-primary font-display uppercase tracking-widest mb-6">Recent Civic Activity</h4>
              <div className="space-y-6">
                {[
                  { title: "Registration Verified", desc: "Successfully synced biometric data with the National Register.", time: "YESTERDAY" },
                  { title: "Candidate Profile View", desc: "You compared 3 gubernatorial candidates for the Lagos 2025 cycle.", time: "3 DAYS AGO" },
                  { title: "Town Hall Participation", desc: "Attended 'Civic Tech for Accountability' digital summit.", time: "1 WEEK AGO" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">✓</div>
                      {idx !== 2 && <div className="w-0.5 h-full bg-outline-variant/10 my-1"></div>}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
                      <p className="text-[10px] text-on-surface-variant/60 mt-2 font-bold">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Election Metric */}
            <div className="md:col-span-3 bg-surface-container-high rounded-xl p-6 flex flex-col justify-between shadow-civilized">
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
                  <div className="h-full bg-primary w-[65%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-4 leading-relaxed font-medium">
                  Voter engagement in your PU is higher than the state average of 42%.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informational Card */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border border-outline-variant/5">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 text-primary text-xl font-bold">📖</div>
              <h5 className="text-lg font-bold font-display mb-2">Voter Rights Handbook</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">Know your rights at the polling unit and understand the 2022 Electoral Act provisions for transparency.</p>
              <button className="mt-6 text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                Download PDF ↗
              </button>
            </div>

            {/* AI Assistant Prompt */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border border-outline-variant/5">
              <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-4 text-primary text-xl font-bold">🤖</div>
              <h5 className="text-lg font-bold font-display mb-2">Ask Lens AI</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">Get instant, verified answers about electoral laws, polling locations, or registration requirements.</p>
              <div className="mt-6 flex gap-2">
                <input className="flex-1 text-xs bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary px-4" placeholder="What is a VIN?" type="text" />
                <button className="p-2 bg-primary text-on-primary rounded-lg shadow-md transition-transform active:scale-95">
                  →
                </button>
              </div>
            </div>

            {/* Verified Profile Card */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-civilized border border-outline-variant/5 flex items-center gap-4">
              <div className="flex-1">
                <h5 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter mb-1">Account Shield</h5>
                <p className="text-lg font-bold font-display text-on-surface">Two-Factor Active</p>
                <p className="text-xs text-on-surface-variant mt-1">Your biometric data is encrypted.</p>
                <button className="mt-4 px-4 py-1.5 border border-outline-variant/20 text-[10px] font-bold rounded-lg hover:bg-surface-container-low transition-colors">
                  MANAGE SECURITY
                </button>
              </div>
              <div className="w-20 h-20 relative">
                <svg className="w-full h-full text-primary" viewBox="0 0 36 36">
                  <path className="stroke-current opacity-10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                  <path className="stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="100, 100" strokeWidth="3"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">100%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-8 mt-auto bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="flex flex-col items-center justify-center space-y-4 px-8">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {["Privacy Policy", "Terms of Service", "INEC Portal", "Contact Us"].map((item) => (
                <a key={item} className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">{item}</a>
              ))}
            </div>
            <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">
              © 2024 VoteLens Nigeria. Curating Truth for the Electorate.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
