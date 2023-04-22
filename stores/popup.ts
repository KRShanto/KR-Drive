import { create } from "zustand";
import { PopupType } from "@/types/popup";

interface PopupState {
  popup: PopupType;
  data: any;
  openPopup: (popup: PopupType, data?: any) => void;
  closePopup: () => void;
}

const usePopupStore = create<PopupState>((set) => ({
  popup: null,
  data: null,
  openPopup: (popup, data) => set({ popup, data }),
  closePopup: () => set({ popup: null, data: null }),
}));

export default usePopupStore;
