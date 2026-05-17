import "./styles/fonts.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
import AppRouter from "./router";
import ThemeProvider from "./lib/materialUi/muiTheme";
import MaterialRTLProvider from "./lib/materialUi/muiRTL";
import { StoreProvider } from "./lib/redux/storeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <MaterialRTLProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </MaterialRTLProvider>
    </StoreProvider>
  </StrictMode>,
);
