"use client";

import Link from "next/link";
import { SidebarProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";

// Animation Constants
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Sidebar = ({
  isOpen,
  onClose,
  navigation,
  branding,
  footerActions,
  userActions,
}: SidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: EASING }}
        className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-surface-container-lowest border-r border-outline-variant/10 lg:flex"
      >
        <div className="flex flex-col h-full py-6 px-4 space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: EASING }}
            className="flex items-center space-x-3 px-2 mb-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-on-primary shadow-sm">
              {branding.logo || (
                <span className="text-xl font-bold">
                  {branding.name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary leading-none">
                {branding.name}
              </h1>
              {branding.tagline && (
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
                  {branding.tagline}
                </p>
              )}
            </div>
          </motion.div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4, ease: EASING }}
                >
                  <Link
                    href={item.href}
                    className={`flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      item.active
                        ? "bg-primary/8 text-primary font-bold shadow-sm"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {footerActions && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-4 mt-4 border-t border-outline-variant/10"
            >
              {footerActions}
            </motion.div>
          )}

          {userActions && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-auto pt-6 space-y-1"
            >
              {userActions}
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-screen w-64 bg-surface-container-lowest lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full py-6 px-4">
              <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-on-primary">
                    {branding.logo || (
                      <span className="text-xl font-bold">
                        {branding.name.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {branding.name}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-on-surface-variant"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex w-full items-center px-3 py-3 rounded-lg transition-colors ${
                        item.active
                          ? "bg-primary/8 text-primary font-bold"
                          : "text-on-surface-variant hover:bg-surface-container-low"
                      }`}
                      onClick={onClose}
                    >
                      {Icon && <Icon className="mr-3 h-5 w-5 shrink-0" />}
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              {(footerActions || userActions) && (
                <div className="mt-auto pt-6 space-y-4">
                  {footerActions}
                  {userActions}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

