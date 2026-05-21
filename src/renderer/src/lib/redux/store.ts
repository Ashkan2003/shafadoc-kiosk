import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../../lib/redux/slices/themeSlice";
import centerReducer from "../../lib/redux/slices/centerSlice";
import settingsReducer from "../../lib/redux/slices/settingsSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      themeMode: themeReducer,
      center: centerReducer,
      settings: settingsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
