export type CenterType = {
  id: string; // UUID
  city_id: string; // UUID
  name: string;
  en_title: string;
  alias: string | null;
  type: number; // could be enum later (e.g., 1 = hospital)
  phones: string[];
  address: string;
  description: string | null;
  brief_desc: string | null;
  config: string | null;
  status: 0 | 1; // could be enum later (e.g., 1 = active)
  approved: 0 | 1;
  latitude: number | null;
  longitude: number | null;
  is_recommended: boolean;
  profile_picture: string | null;
  foundation_date: string | null; // year as string (e.g., "1337")
  social: {
    network: string;
    link: string;
    icon: string;
  }[]; // ex : "[{\"network\":\"پشتیبانی\",\"link\":\"hasan\",\"icon\":\"اینستاگرام\"}]"
  settings: any;
  working_time: string;
  proficiencies_area: string[];
  city: {
    id: number;
    name: string;
    state_id: number;
    state: {
      id: number;
      name: string;
      tel_prefix: string;
    };
  };
};

export type KioskSettingsType = {
  themeMode: "light" | "dark";
  centerId: string;
};
