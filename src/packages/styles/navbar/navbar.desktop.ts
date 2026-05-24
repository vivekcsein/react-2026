import type { CSSProperties } from "react";
import type { ThemeMode } from "../../../types/app";

export type NavbarStyles = {
  root: CSSProperties;
  container: CSSProperties;
  logo: CSSProperties;
  navigation: CSSProperties;
  navigationItem: CSSProperties;
  navigationItemActive: CSSProperties;
  badge: CSSProperties;
  actions: CSSProperties;
  action: CSSProperties;
};

const sharedNavigationItem: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
  minHeight: 40,
  padding: "0 var(--space-2)",
  borderRadius: "calc(var(--radius) - 2px)",
  fontSize: "var(--fs-small)",
  fontWeight: 500,
  lineHeight: "var(--lh-tight)",
  textDecoration: "none",
  transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const sharedAction: CSSProperties = {
  ...sharedNavigationItem,

  minWidth: 100,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  color: "hsl(var(--foreground))",
};

export const navbarStyles: Record<Exclude<ThemeMode, "system">, NavbarStyles> = {
  light: {
    root: {
      width: "100%",
      background: "hsl(var(--background))",
      borderBottom: "1px solid hsl(var(--border))",
      backdropFilter: "blur(12px)",
      position: "relative",
      zIndex: 50,
      boxShadow: "0 2px 10px hsl(var(--foreground) / 0.05)",
    },

    container: {
      width: "100%",
      maxWidth: 1280,
      height: 64,
      margin: "0 auto",
      padding: "0 var(--space-2)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
    },

    navigation: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      flex: 1,
      margin: 0,
      padding: 0,
      listStyle: "none",
    },

    navigationItem: {
      ...sharedNavigationItem,

      color: "hsl(var(--muted-foreground))",
      background: "transparent",
    },

    navigationItemActive: {
      background: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
    },

    badge: {
      minWidth: 18,
      height: 18,
      padding: "0 6px",
      borderRadius: 999,
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      fontSize: 10,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    actions: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginLeft: "auto",
    },

    action: {
      ...sharedAction,
    },
  },

  dark: {
    root: {
      width: "100%",
      background: "hsl(var(--background))",
      borderBottom: "1px solid hsl(var(--border))",
      backdropFilter: "blur(12px)",
      position: "relative",
      zIndex: 50,
      boxShadow: "0 2px 10px hsl(var(--foreground) / 0.05)",
    },

    container: {
      width: "100%",
      maxWidth: 1280,
      height: 64,
      margin: "0 auto",
      padding: "0 var(--space-2)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
    },

    navigation: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      flex: 1,
      margin: 0,
      padding: 0,
      listStyle: "none",
    },

    navigationItem: {
      ...sharedNavigationItem,

      color: "hsl(var(--muted-foreground))",
      background: "transparent",
    },

    navigationItemActive: {
      background: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
    },

    badge: {
      minWidth: 18,
      height: 18,
      padding: "0 6px",
      borderRadius: 999,
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      fontSize: 10,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    actions: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginLeft: "auto",
    },

    action: {
      ...sharedAction,
    },
  },
};
