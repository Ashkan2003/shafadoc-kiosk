// renderer/src/hooks/useKioskSettings.ts
import React from "react";
import { KioskSettingsType } from "src/shared/types/common";

export function useKioskSettings() {
  const [settings, setSettings] = React.useState<KioskSettingsType | null>(
    null,
  );

  React.useEffect(() => {
    const load = async () => {
      const data = await window.electronAPI.settings.getKioskSettings();

      setSettings(data);
    };

    void load();
  }, []);

  return settings;
}
