import "./styles/fonts.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
import AppRouter from "./router";
import ThemeProvider from "./lib/utils/materialUi";
import MaterialRTLProvider from "./lib/utils/muiRTL";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MaterialRTLProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </MaterialRTLProvider>
  </StrictMode>,
);
