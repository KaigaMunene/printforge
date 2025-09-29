"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavbarProps, MobileMenuProps, UserMenuProps } from "@/types/navbar";

/**
 * Main Navbar Component
 * A responsive navigation bar with mobile menu support
 */
export function Navbar({
  logo,
  items,
  user,
  className,
  variant = "default",
  showMobileMenu = true,
  onMobileMenuToggle,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMobileMenuToggle?.();
  };

  const navbarClasses = cn(
    "w-full bg-white border-b border-gray-200 shadow-sm",
    (variant === "fixed" ? "fixed top-0 z-50" : "") +
      (variant === "transparent"
        ? " bg-transparent border-transparent shadow-none"
        : ""),
    className
  );

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo ? (
              <Link href={logo.href || "/"} className="flex items-center">
                <Image src={logo.src} alt={logo.alt} className="h-8 w-auto" />
              </Link>
            ) : (
              <Link href="/" className="text-xl font-bold text-gray-900">
                PrintForge
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {items.map(item => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>

          {/* User Menu / Auth
          <div className="hidden md:block">
            {user ? (
              <UserMenu
                user={user}
                onAction={handleUserAction}
                isOpen={isUserMenuOpen}
                onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div> */}

          {/* Mobile menu button */}
          {showMobileMenu && (
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          items={items}
          user={user}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

/**
 * Navigation Link Component
 */
function NavLink({
  item,
  isActive,
}: {
  item: {
    label: string;
    href: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  isActive: boolean;
}) {
  const linkClasses = cn(
    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
    isActive
      ? "bg-blue-100 text-blue-700"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
  );

  return (
    <Link href={item.href} className={linkClasses}>
      <div className="flex items-center space-x-2">
        {item.icon && <item.icon className="h-4 w-4" />}
        <span>{item.label}</span>
      </div>
    </Link>
  );
}

/**
 * Mobile Menu Component
 */
function MobileMenu({
  isOpen,
  items,
  user,
  onClose,
  onUserAction,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            onClick={onClose}
          >
            <div className="flex items-center space-x-2">
              {item.icon && <item.icon />}
              <span>{item.label}</span>
            </div>
          </Link>
        ))}

        {user ? (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center px-3">
              {user.avatar ? (
                <Image
                  className="h-10 w-10 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  onUserAction?.("profile");
                  onClose();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Your Profile
              </button>
              <button
                onClick={() => {
                  onUserAction?.("settings");
                  onClose();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  onUserAction?.("logout");
                  onClose();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-4 space-y-1">
            <Link
              href="/auth/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
