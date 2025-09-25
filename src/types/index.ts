/**
 * Global type definitions for the application
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user" | "moderator";
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavItem[];
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Status types
export type Status = "idle" | "loading" | "success" | "error";
