import "./styles/fonts.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "sonner";
import ThemeProvider from "./lib/materialUi/muiTheme";
import MaterialRTLProvider from "./lib/materialUi/muiRTL";
import { StoreProvider } from "./lib/redux/storeProvider";
import ReactQueryProvider from "./lib/reactQuery";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <ReactQueryProvider>
          <MaterialRTLProvider>
            <ThemeProvider>
              <AppRouter />
              <Toaster
                richColors
                position="top-center"
                closeButton
                duration={4000}
              />
            </ThemeProvider>
          </MaterialRTLProvider>
        </ReactQueryProvider>
      </StoreProvider>
    </ErrorBoundary>
  </StrictMode>,
);
