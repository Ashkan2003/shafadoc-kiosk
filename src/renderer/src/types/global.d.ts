import type { ElectronAPI } from "@electron-toolkit/preload";
import type { KioskSettingsType } from "@/shared/types/common";

declare global {
  interface Window {
    electron: ElectronAPI;

    api: unknown;

    electronAPI: {
      settings: {
        getKioskSettings: () => Promise<KioskSettingsType>;

        setKioskSettings: (settings: KioskSettingsType) => Promise<boolean>;
      };
    };
  }
}

export {};
