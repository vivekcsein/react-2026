"use client";

import { createPortal } from "react-dom";
import type { RefinedXPosition } from "../../../types/app";
import { drawerKeyframes, getDrawerStyles } from "../../../packages/styles/styles.drawer";

// Types
type DrawerLayoutProps = {
  open: boolean;
  position?: RefinedXPosition;
  width?: number | string;
  zIndex?: number;
  children: React.ReactNode;
  onClose?: () => void;
};

// Component
export const DrawerLayout = ({
  open,
  position = "left",
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

            animation: "drawer-backdrop 0.2s ease",
          }}
        />

        {/* Drawer */}
        <div
          style={{
            ...getDrawerStyles(position),

            width,
          }}
        >
          {children}
        </div>
      </div>

      <style>{drawerKeyframes}</style>
    </>,
    document.body,
  );
};
