import Store from "electron-store";
import { KioskSettingsType } from "../../shared/types/common";

type StoreSchema = {
  kioskSettings: KioskSettingsType;
};

export const store = new Store<StoreSchema>({
  defaults: {
    kioskSettings: {
      centerId: "",
      themeMode: "light",
    },
  },
});
