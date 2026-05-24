"use client";

import { createPortal } from "react-dom";
import type { DrawerPlacement } from "../../../../../types/navigation";

import {
  navbarDrawerKeyframes,
  getDrawerStyles,
} from "../../../../../packages/styles/styles.drawer";

// Types
type DrawerLayoutProps = {
  open: boolean;
  placement?: DrawerPlacement;
  width?: number | string;
  zIndex?: number;
  children: React.ReactNode;
  onClose?: () => void;
};

// Component
export const DrawerLayout = ({
  open,
  placement = "left",
  width = "80vw",
  zIndex = 9999,
  children,
  onClose,
}: DrawerLayoutProps) => {
  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <div
        style={{
          position: "fixed",

          inset: 0,

          zIndex,
        }}
      >
        {/* Backdrop */}

        <div
          onClick={onClose}
          style={{
            position: "absolute",

            inset: 0,

            background: "rgba(0,0,0,0.5)",

            backdropFilter: "blur(4px)",

            animation: "navbar-drawer-backdrop 0.2s ease",
          }}
        />

        {/* Drawer */}
        <div
          style={{
            ...getDrawerStyles(placement),

            width,
          }}
        >
          {children}
        </div>
      </div>

      <style>{navbarDrawerKeyframes}</style>
    </>,
    document.body,
  );
};
