import { http } from "@renderer/lib/http";

export const getCenterDoctorsApi = async (centerId: string) => {
  const url = `/centers/v1/centers/${centerId}/doctors`;
  try {
    const res = await http.get(url);
    return res.data.data;
  } catch (error) {
    console.log(error, `error in ${url}`);
    throw error;
  }
};
