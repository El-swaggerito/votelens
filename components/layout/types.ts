import { ReactNode, ComponentType } from "react";
import { LucideProps } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: ComponentType<LucideProps>;
  active?: boolean;
}

export interface BrandingProps {
  name: string;
  tagline?: string;
  logo?: ReactNode;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  branding: BrandingProps;
  footerActions?: ReactNode;
  userActions?: ReactNode;
}

export interface NavbarProps {
  onMenuClick?: () => void;
  branding: BrandingProps;
  navigation?: NavItem[];
  rightContent?: ReactNode;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export interface FooterLink {
  label: string;
  href: string;
  highlight?: boolean;
}

export interface FooterProps {
  branding: BrandingProps;
  links: FooterLink[];
  copyright: string;
}
