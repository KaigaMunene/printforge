/**
 * Type definitions for navbar components
 */

import { NavItem } from "./index";

export interface NavbarProps {
  logo?: {
    src: string;
    alt: string;
    href?: string;
  };
  items: NavItem[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onUserAction?: (action: "profile" | "settings" | "logout") => void;
  className?: string;
  variant?: "default" | "transparent" | "fixed";
  showMobileMenu?: boolean;
  onMobileMenuToggle?: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  user?: NavbarProps["user"];
  onClose: () => void;
  onUserAction?: NavbarProps["onUserAction"];
}

export interface UserMenuProps {
  user: NavbarProps["user"];
  onAction: NavbarProps["onUserAction"];
  isOpen: boolean;
  onToggle: () => void;
}
