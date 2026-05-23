import "./styles/fonts.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import ErrorBoundary from "./lib/providers/ErrorBoundary";
import { Toaster } from "sonner";
import ThemeProvider from "./lib/materialUi/muiTheme";
import MaterialRTLProvider from "./lib/materialUi/muiRTL";
import { StoreProvider } from "./lib/redux/storeProvider";
import ReactQueryProvider from "./lib/reactQuery";
import AppInitializer from "./lib/providers/AppInitializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <AppInitializer>
          <ReactQueryProvider>
            <MaterialRTLProvider>
              <ThemeProvider>
                <AppRouter />
                <Toaster
                  richColors
                  dir="rtl"
                  position="top-center"
                  closeButton
                  duration={4000}
                />
              </ThemeProvider>
            </MaterialRTLProvider>
          </ReactQueryProvider>
        </AppInitializer>
      </StoreProvider>
    </ErrorBoundary>
  </StrictMode>,
);
