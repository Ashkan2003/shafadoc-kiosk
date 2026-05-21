// src/renderer/src/lib/redux/slices/settingsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KioskSettingsType } from "src/shared/types/common";

interface SettingsState {
  data: KioskSettingsType | null;
  isLoaded: boolean;
}

const initialState: SettingsState = {
  data: null,
  isLoaded: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<KioskSettingsType>) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
