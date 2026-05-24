"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

// Types
type NavbarContextValue = {
  isOpen: (navbarId: string) => boolean;
  open: (navbarId: string) => void;
  close: (navbarId: string) => void;
  toggle: (navbarId: string) => void;
};

// Context
const NavbarContext = createContext<NavbarContextValue | null>(null);

// Provider
type NavbarProviderProps = {
  children: ReactNode;
};

export const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const [openNavbars, setOpenNavbars] = useState<Set<string>>(new Set());

  const isOpen = useCallback((navbarId: string) => openNavbars.has(navbarId), [openNavbars]);

  const open = useCallback((navbarId: string) => {
    setOpenNavbars((prev) => new Set(prev).add(navbarId));
  }, []);

  const close = useCallback((navbarId: string) => {
    setOpenNavbars((prev) => {
      const next = new Set(prev);

      next.delete(navbarId);

      return next;
    });
  }, []);

  const toggle = useCallback((navbarId: string) => {
    setOpenNavbars((prev) => {
      const next = new Set(prev);

      if (next.has(navbarId)) {
        next.delete(navbarId);
      } else {
        next.add(navbarId);
      }

      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
    }),
    [isOpen, open, close, toggle],
  );

  return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>;
};

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useNavbar = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error("useNavbar must be used inside NavbarProvider");
  }

  return context;
};
