import "./assets/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
import AppRouter from "./router";
import ThemeProvider from "./utils/materialUi";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
);
