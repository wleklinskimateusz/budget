import { create } from "zustand";

export type MobileSideBarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSidebar = create<MobileSideBarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
