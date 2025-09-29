/**
 * Custom hook for navbar functionality
 */

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export interface UseNavbarOptions {
  initialMobileMenuOpen?: boolean;
  onUserAction?: (action: "profile" | "settings" | "logout") => void;
}

export function useNavbar(options: UseNavbarOptions = {}) {
  const { initialMobileMenuOpen = false, onUserAction } = options;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(
    initialMobileMenuOpen
  );
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-user-menu]")) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserAction = (action: "profile" | "settings" | "logout") => {
    onUserAction?.(action);
    setIsUserMenuOpen(false);
  };

  return {
    isMobileMenuOpen,
    isUserMenuOpen,
    isScrolled,
    pathname,
    toggleMobileMenu,
    toggleUserMenu,
    handleUserAction,
  };
}
