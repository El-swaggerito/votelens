"use client";

import Link from "next/link";
import { NavbarProps } from "./types";
import { motion } from "framer-motion";

// Animation Constants
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Navbar = ({
  onMenuClick,
  branding,
  navigation,
  rightContent,
  showSearch = true,
  searchPlaceholder = "Search...",
}: NavbarProps) => {
  return (
    <motion.header 
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASING }}
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-civilized"
    >
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-3 sm:px-8">
        <div className="flex flex-1 items-center max-w-xl">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="mr-4 p-2 lg:hidden text-on-surface-variant"
              aria-label="Open menu"
            >
              ☰
            </button>
          )}
          
          <Link href="/" className="mr-8 flex items-center lg:hidden">
             <span className="font-display text-xl font-black text-primary">
              {branding.name}
            </span>
          </Link>

          {showSearch && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: EASING }}
              className="relative w-full hidden sm:block"
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" aria-hidden="true">
                ⌕
              </span>
              <input
                className="w-full rounded-xl bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20"
                placeholder={searchPlaceholder}
                type="text"
                aria-label="Search"
              />
            </motion.div>
          )}
        </div>

        <div className="flex items-center space-x-4 ml-4 sm:ml-8">
          {navigation && navigation.length > 0 && (
            <nav className="hidden xl:flex items-center space-x-6 text-sm font-semibold font-display">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4, ease: EASING }}
                >
                  <Link
                    href={item.href}
                    className={`${
                      item.active
                        ? "text-primary border-b-2 border-primary"
                        : "text-on-surface-variant hover:text-primary"
                    } pb-1 transition-all`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}
          
          {rightContent && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: EASING }}
              className="flex items-center space-x-3 pl-4 sm:pl-6 border-l border-outline-variant/10"
            >
              {rightContent}
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

