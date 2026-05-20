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
export interface DoctorType {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  en_title: string;
  gender: number; // e.g. 1 = male? (use enum if you know values)
  email: string;
  mobile: string;
  national_code: string;
  mcc: string;
  type: number;
  board_certification?: string | null;
  bio: string | null;
  education?: string | null;
  degree?: string | null;
  proficiency?: { label: string; id: number };
  speciality?: { label: string; id: number };
  fellowship?: { label: string; id: number };
  proficiency_area?: string[] | null;
  degree_location?: string | null;
  languages?: string[]; // e.g. ["فارسی"] or JSON string
  have_office?: boolean;
  profile_picture?: string | null;
  is_recommended?: boolean;
  social: {
    network: string;
    link: string;
    icon: string;
  }[]; // ex : "[{\"network\":\"پشتیبانی\",\"link\":\"hasan\",\"icon\":\"اینستاگرام\"}]"
  deleted_at?: string | null;
  speciality_id?: number;
  fellowship_id?: number;
  proficiency_id?: number;
  landline?: string;
  status: "active" | "inactive";
  approved: 0 | 1;
}

export type KioskSettingsType = {
  themeMode: "light" | "dark";
  centerId: string;
};
