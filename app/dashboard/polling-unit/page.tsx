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

export default function PollingUnitPage() {
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

        <div className="p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Map Canvas Section */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-civilized relative border border-outline-variant/10">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <button className="bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm border border-outline-variant/20 text-on-surface hover:bg-white transition-colors">
                    <Layers className="h-5 w-5" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm border border-outline-variant/20 text-on-surface hover:bg-white transition-colors">
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="h-[400px] sm:h-[500px] relative bg-surface-container-low">
                  <Image
                    alt="Interactive Map"
                    className="w-full h-full object-cover opacity-80"
                    height={1000}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmoyU5E5exK2IIxHvaDQXTdpi4Ll2OAIBC79UPLoa2f5qQ87FRH6I1sDwmoVI9nMxAZUYKX6vsdYy1Y9l94ULLEAnd5Flu-OzITOEdCDDkatCKtpM6E5giCTIbsqFQCABsKyVT7QHfcJu9KWQ9DsDM5X90DaX0L-xCMA7Z-TcCbcvoTBjmHFd0oouVSoUpX5CD9pvCzIA2bOADlPi5vEeG8lOWdvAAX9Rxrlexym98rc-53Da10RnXQb-3LFxdghhMv5Gd5urDBfA"
                    width={1200}
                  />
                  {/* Map Marker Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-bounce">
                        <MapPin className="text-white h-5 w-5" />
                      </div>
                      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-xl shadow-2xl border border-outline-variant/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-[10px] font-black text-primary uppercase tracking-tighter">Your Polling Unit</p>
                        <p className="text-xs font-bold text-on-surface mt-1">Victoria Island School</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Navigation className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-lg">Route Navigation</h3>
                      <p className="text-xs text-on-surface-variant">Estimated 12 mins from your current location</p>
                    </div>
                  </div>
                  <button className="primary-button px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest w-full sm:w-auto">
                    Start Navigation
                  </button>
                </div>
              </div>

              {/* Unit Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Unit Accessibility", value: "Fully Accessible", icon: Info },
                  { label: "Expected Crowd", value: "Moderate", icon: Users },
                  { label: "Opening Hours", value: "08:00 AM - 4:00 PM", icon: Clock },
                ].map((item) => (
                  <div key={item.label} className="bg-surface-container-lowest p-4 rounded-xl shadow-civilized border border-outline-variant/5">
                    <item.icon className="text-primary h-4 w-4 mb-2 opacity-60" />
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{item.label}</p>
                    <p className="font-bold text-on-surface text-sm mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Details Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-civilized border border-outline-variant/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-black text-on-surface font-display tracking-tight uppercase">Unit Profile</h2>
                  <span className="bg-tertiary-container/10 text-tertiary text-[10px] font-bold px-3 py-1 rounded-full">ACTIVE</span>
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
                    <div className="flex items-center justify-between p-3 bg-surface rounded-xl group cursor-pointer hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-primary">AO</div>
                        <div>
                          <p className="text-xs font-bold text-on-surface">Adeola Okafor</p>
                          <p className="text-[10px] text-on-surface-variant">Presiding Officer</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="w-full flex items-center justify-center gap-2 border-2 border-primary/20 text-primary py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all">
                      <MapIcon className="h-4 w-4" />
                      View Full Area Map
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert Card */}
              <div className="bg-secondary-container text-on-secondary-fixed-variant p-6 rounded-2xl relative overflow-hidden shadow-lg shadow-secondary/10">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Security Update
                  </h4>
                  <p className="text-xs leading-relaxed opacity-90">This polling unit is categorized as a low-risk zone. Enhanced security protocols will be active on election day.</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </div>
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
