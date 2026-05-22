"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ModalContextValue = {
  /** Returns true if the given modalId is currently open */
  isOpen: (id: string) => boolean;
  /** Open a modal by id */
  openModal: (id: string) => void;
  /** Close the currently open modal */
  closeModal: () => void;
  /** The id of the currently open modal, or null */
  activeModalId: string | null;
};

const ModalContext = createContext<ModalContextValue | null>(null);

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const isOpen = useCallback((id: string) => activeModalId === id, [activeModalId]);

  const openModal = useCallback((id: string) => {
    setActiveModalId(id);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalId(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal, activeModalId }),
    [isOpen, openModal, closeModal, activeModalId],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used inside <ModalProvider>");
  }
  return ctx;
};
