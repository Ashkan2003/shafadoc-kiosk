import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, RootState } from "../store";

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
