import { create } from "zustand";

type AsideStoreType = {
  isAsideExpanded: boolean;
  toggleAside: () => void;
  isDefaultLayout: boolean;
  toggleLayout: () => void;
};

const AsideStore = create<AsideStoreType>((set) => ({
  isAsideExpanded: true, // Initial state, true means the aside menu is expanded;
  isDefaultLayout: true,
  toggleAside: () =>
    set((state: any) => ({ isAsideExpanded: !state.isAsideExpanded })),
  toggleLayout: () =>
    set((state: any) => ({ isDefaultLayout: !state.isDefaultLayout })),
}));

export default AsideStore;
