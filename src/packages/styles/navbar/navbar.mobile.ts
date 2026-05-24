import type { CSSProperties } from "react";
import { navbarStyles } from "./navbar.desktop";
import type { DrawerPlacement } from "../../../types/navigation";

export const mobileNavbarStyles = navbarStyles;

export const overflowAnimations: Record<DrawerPlacement, string> = {
  top: "navbar-overflow-top 0.18s ease",

  left: "navbar-overflow-left 0.18s ease",

  right: "navbar-overflow-right 0.18s ease",
};

export function getOverflowPanelStyle(placement: DrawerPlacement): CSSProperties {
  const base: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 8px)",
    minWidth: 220,
    overflow: "hidden",
    borderRadius: "calc(var(--radius) + 4px)",
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--card))",
    animation: overflowAnimations[placement],
    zIndex: 100,
    backdropFilter: "blur(12px)",
    boxShadow: "0 2px 10px hsl(var(--foreground) / 0.05)",
  };

  switch (placement) {
    case "left":
      return {
        ...base,
        left: 0,
      };

    case "right":
      return {
        ...base,
        right: 0,
      };

    default:
      return {
        ...base,
        left: 0,
        right: 0,
      };
  }
}
