import type { ImageProps, ThemeMode } from "./app";
import type { CSSProperties, ReactNode } from "react";
import type { UserRole } from "../../../../packages/configs/config.roles";

// Shared Types
export type ComponentVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "success";

export type DrawerPlacement = "top" | "left" | "right";

export type PermissionKey = string;

export type RoutePath = string;

export type AccessRole = UserRole;

export type AuthVisibility = "always" | "authorizedOnly" | "unauthorizedOnly";

// Shared UI
export interface IconProps {
  node?: ReactNode | string;
  hidden?: boolean;
  color?: string;
  size?: number;
  only?: boolean;
  position?: "left" | "right";
  spacing?: number;
}

export interface BadgeProps {
  value: string | number;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

// Base Node
export interface NavigationNode {
  id: string;
  label: string;
  description?: string;
}

// Access Control
export interface AccessControl {
  permissions?: PermissionKey[];
  roles?: AccessRole[];
  authVisibility?: AuthVisibility;
}

// Layout Props
export interface LayoutProps {
  theme?: ThemeMode;
  sticky?: boolean;
  bordered?: boolean;
  shadowed?: boolean;
  blurred?: boolean;
  className?: string;
  style?: CSSProperties;
}

// Navigation Item
export interface NavigationItem extends NavigationNode, AccessControl {
  href?: RoutePath;
  icon?: IconProps;
  badge?: BadgeProps;
  children?: NavigationItem[];
  external?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  analyticsKey?: string;
  onClick?: () => void;
}

// Navigation Action
export interface NavigationAction extends NavigationNode, AccessControl {
  href?: RoutePath;
  icon?: IconProps;
  variant?: ComponentVariant;
  external?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// Navbar
export interface NavbarConfig {
  logo?: ImageProps | string;
  navigation: NavigationItem[];
  actions?: NavigationAction[];
  activeItemId?: string;
  onNavigationChange?: (item: NavigationItem) => void;
}

// Header
// Layout + responsive behavior layer
export interface HeaderConfig extends LayoutProps {
  id: string;
  logo?: ImageProps | string;
  navbar: NavbarConfig;
  mobileDrawerPlacement?: DrawerPlacement;
  mobileBreakpoint?: number;
  showMobileMenu?: boolean;
  showDesktopMenu?: boolean;
  announcementBar?: {
    enabled: boolean;
    content: ReactNode;
  };
}

// Footer
export interface FooterSection {
  id: string;
  label: string;
  links: NavigationItem[];
}

export interface FooterConfig extends LayoutProps {
  logo?: ReactNode;
  summary?: {
    title: string;
    description?: string;
    copyright?: string;
    contactEmail?: string;
  };

  sections?: FooterSection[];
  socialLinks?: NavigationItem[];
}

// Mobile Navbar
export interface MobileNavigationState {
  isOpen: boolean;
  placement: DrawerPlacement;
  activeItemId?: string;
}

// Global Config
export interface NavigationConfig {
  header?: HeaderConfig;
  sidebar?: SidebarConfig;
  footer?: FooterConfig;
  breadcrumbs?: BreadcrumbItem[];
}
