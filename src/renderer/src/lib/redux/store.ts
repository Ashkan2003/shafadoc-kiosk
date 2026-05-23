import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../../lib/redux/slices/themeSlice";
import settingsReducer from "../../lib/redux/slices/settingsSlice";
import reservationReducer from "../../lib/redux/slices/reservationSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      themeMode: themeReducer,
      settings: settingsReducer,
      reservation: reservationReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
