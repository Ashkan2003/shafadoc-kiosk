// src/renderer/src/components/AppInitializer.tsx
import { useEffect } from "react";
import { useAppDispatch } from "@renderer/lib/redux/hooks";
import { setSettings } from "@renderer/lib/redux/slices/settingsSlice";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.electronAPI.settings.getKioskSettings().then((settings) => {
      dispatch(setSettings(settings));
    });
  }, [dispatch]);

  return <>{children}</>;
}
