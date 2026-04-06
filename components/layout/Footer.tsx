import Link from "next/link";
import { FooterProps } from "./types";

export const Footer = ({ branding, links, copyright }: FooterProps) => {
  return (
    <footer className="w-full py-8 mt-auto border-t border-outline-variant/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-6 px-8 text-center">
        <div className="flex items-center justify-center gap-2">
          {branding.logo || (
            <span className="font-display text-2xl font-black text-primary">
              {branding.name}
            </span>
          )}
          {branding.tagline && (
            <span className="border-l border-outline-variant/30 px-2 text-sm font-light text-on-surface-variant">
              {branding.tagline}
            </span>
          )}
        </div>

        {links && links.length > 0 && (
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-on-surface-variant">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-primary ${
                  link.highlight
                    ? "text-primary underline underline-offset-4"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="w-full border-t border-outline-variant/10 pt-8">
          <p className="text-xs text-on-surface-variant tracking-wide uppercase">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
