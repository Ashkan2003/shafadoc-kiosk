import { ipcMain } from "electron";
import { store } from "../store";
import { KioskSettingsType } from "../../shared/types/common";

ipcMain.handle("settings:get-kiosk-settings", () => {
  return store.get("kioskSettings");
});

ipcMain.handle(
  "settings:set-kiosk-settings",
  (_, settings: KioskSettingsType) => {
    store.set("kioskSettings", settings);
    return true;
  },
);
