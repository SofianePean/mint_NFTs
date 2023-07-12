import { create } from "zustand";

interface AccountState {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  address: string;
  setAddress: (address: string) => void;
}

export const useAccountStore = create<AccountState>()((set) => ({
  isConnected: false,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  address: "",
  setAddress: (address: string) => set({ address }),
}));
