import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { ipcRenderer } from "electron/renderer";
import { KioskSettingsType } from "../shared/types/common";

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
    contextBridge.exposeInMainWorld("electronAPI", {
      settings: {
        getKioskSettings: () =>
          ipcRenderer.invoke("settings:get-kiosk-settings"),

        setKioskSettings: (settings: KioskSettingsType) =>
          ipcRenderer.invoke("settings:set-kiosk-settings", settings),
      },
    });
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
