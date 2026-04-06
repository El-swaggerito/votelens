"use client";

import Link from "next/link";
import { SidebarProps } from "./types";

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
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-surface-container-lowest border-r border-outline-variant/10 lg:flex">
        <div className="flex flex-col h-full py-6 px-4 space-y-2">
          <div className="flex items-center space-x-3 px-2 mb-8">
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
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
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
              );
            })}
          </nav>

          {footerActions && (
            <div className="pt-4 mt-4 border-t border-outline-variant/10">
              {footerActions}
            </div>
          )}

          {userActions && (
            <div className="mt-auto pt-6 space-y-1">
              {userActions}
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 transform bg-surface-container-lowest transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
      </aside>
    </>
  );
};
