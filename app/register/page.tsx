import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-surface text-on-surface">
      <div className="flex h-screen w-full flex-col bg-surface md:flex-row">
        <section className="relative hidden h-full overflow-hidden bg-[linear-gradient(135deg,#006b3f_0%,#008751_100%)] md:flex md:w-1/2 lg:w-3/5">
          <div className="absolute inset-0 opacity-10">
            <svg
              aria-hidden="true"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="register-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#register-grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-16">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] bg-white shadow-lg">
                <span className="font-display text-lg font-black text-primary">
                  VL
                </span>
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                VoteLens
              </span>
            </div>

            <div className="max-w-xl">
              <h1 className="font-display text-5xl font-bold leading-[1.1] text-white lg:text-6xl">
                Empowering the
                <br />
                <span className="text-primary-fixed">Civic Architect</span> in you.
              </h1>
              <p className="mb-8 mt-6 text-lg font-medium leading-relaxed text-primary-fixed/80">
                Join Nigeria&apos;s premier digital infrastructure for electoral
                transparency. Access real-time PVC tracking, polling unit
                insights, and AI-powered civic analytics.
              </p>
              <div className="inline-flex items-center rounded-[1rem] border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-primary-fixed">
                  ✓
                </span>
                <span className="text-sm font-medium tracking-wide text-white">
                  Official INEC Data Integration
                </span>
              </div>
            </div>

            <div className="text-xs uppercase tracking-[0.2em] text-primary-fixed/60">
              © 2024 VoteLens Nigeria. Curating Truth for the Electorate.
            </div>
          </div>

          <div className="absolute bottom-[-10%] right-[-10%] h-[80%] w-[80%] opacity-20">
            <Image
              alt="Abstract Civic Illustration"
              className="h-full w-full object-contain mix-blend-screen"
              height={1400}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQZzIrAzf0qg-Lj_VVn47NsWC-b30HzrZfkVr2-LzZJG1xsxverc5aco-YhUApNXiBtVqRQR4I2XYZ-t9ZKlYpwuAez3FjfTRCPkcsu7S2Ryr1MTO06hCYu4s9X-N_t6htoEw08AWbMiQ6tJtrdMzHJWcXdVeLKykjOw5qMweul2F5AUe-Hx4LSvcVXbXPkN0KA35oRaoKGIvnqZ2XLm-eHGYoXlSw0NZ3fa2Qe7qrcVsWkLTowev013ajfdM6Nb3ZPBU8VpFMssw"
              width={1400}
            />
          </div>
        </section>

        <section className="flex h-full w-full flex-col justify-center bg-surface-container-lowest px-6 md:w-1/2 md:px-12 lg:w-2/5 lg:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-12 flex items-center justify-center md:hidden">
              <span className="font-display text-3xl font-black tracking-tight text-primary">
                VoteLens
              </span>
            </div>

            <div className="mb-10 text-center md:text-left">
              <h2 className="font-display text-3xl font-bold text-on-surface">
                Welcome Back
              </h2>
              <p className="mt-2 font-medium text-on-surface-variant">
                Please enter your credentials to access your dashboard.
              </p>
            </div>

            <div className="mb-8 flex space-x-8 border-b border-surface-container-high">
              <button
                className="border-b-2 border-primary pb-4 text-sm font-bold text-primary"
                type="button"
              >
                Sign In
              </button>
              <button
                className="pb-4 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface"
                type="button"
              >
                Create Account
              </button>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  className="ml-1 block text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
                    @
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-[1rem] bg-surface-container-low py-3.5 pl-11 pr-4 text-on-surface outline-none transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:outline-2 focus:outline-primary"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label
                    className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs font-bold text-primary hover:underline"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
                    •
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-[1rem] bg-surface-container-low py-3.5 pl-11 pr-12 text-on-surface outline-none transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:outline-2 focus:outline-primary"
                    placeholder="••••••••"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-outline transition-colors hover:text-on-surface"
                    type="button"
                  >
                    ◌
                  </button>
                </div>
              </div>

              <div className="flex items-center px-1">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-outline-variant text-primary"
                />
                <label
                  className="ml-3 block text-sm font-medium text-on-surface-variant"
                  htmlFor="remember-me"
                >
                  Keep me logged in for 30 days
                </label>
              </div>

              <button
                className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#006b3f_0%,#008751_100%)] px-6 py-4 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                type="button"
              >
                Sign In to Your Dashboard
                <span className="ml-2" aria-hidden>
                  →
                </span>
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-container-high" />
              </div>
              <div className="relative flex justify-center text-xs font-bold uppercase tracking-[0.16em]">
                <span className="bg-surface-container-lowest px-4 text-outline">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                className="group flex w-full items-center justify-center rounded-[1rem] border border-outline-variant bg-surface-container-lowest px-4 py-3.5 transition-colors hover:bg-surface-container-low"
                type="button"
              >
                <Image
                  alt="Google"
                  className="mr-3 h-5 w-5 transition-transform group-hover:scale-110"
                  height={20}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX_qsOOCqM468Jvee-1oi991BHiqmYbcUayLKSmvhlbXqp0teLmXvnu77STy9ECggq3QAyocqBmN8RNF7sLGKHDLIZUBolR5jMycWw0cmc_b7rSTZxJApYu2R_hrWedTAsxcO3HrWg6Ft_RvQVAZJriT-KxB3uRyup-gO8yWuKkMaYT7L2WJBFee7UFOQRAHv67Algf0zbzz96A64Lhb_2KHI_VTPZFioTWfkROCHJqH7_xV3N6WG5yBphGUnHfOiBRvLMCCEsulY"
                  width={20}
                />
                <span className="text-sm font-semibold text-on-surface">
                  Sign in with Google
                </span>
              </button>
            </div>

            <p className="mt-10 px-6 text-center text-xs leading-relaxed text-on-surface-variant">
              By continuing, you agree to VoteLens Nigeria&apos;s{" "}
              <a className="font-bold text-primary hover:underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="font-bold text-primary hover:underline" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="mx-auto mt-auto w-full max-w-md pb-8 pt-10">
            <Link
              className="flex items-center text-xs font-bold text-on-surface-variant transition-colors hover:text-primary"
              href="/"
            >
              <span className="mr-2" aria-hidden>
                ←
              </span>
              Back to landing page
            </Link>
          </div>
        </section>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#006b3f_0%,#008751_100%)] text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
          type="button"
        >
          💬
        </button>
      </div>
    </main>
  );
}
