import { useQueryWithHandlers } from "@renderer/lib/customUseQuery";
import { getCenterDoctorsApi } from "../api";
import { toast } from "sonner";
import { DoctorType } from "src/shared/types/common";
import { UseQueryResult } from "@tanstack/react-query";

export function useGetCenterDoctorsQuery(
  centerId: string | undefined,
): UseQueryResult<DoctorType[]> {
  return useQueryWithHandlers({
    queryKey: ["center-doctors", centerId],
    queryFn: () => getCenterDoctorsApi(centerId!),
    select: (data: any) => {
      return data
        .map((item: any) => item.doctor)
        .filter((doctor: any) => doctor !== null && doctor !== undefined);
    },
    enabled: !!centerId,
    onError: (error: any) => {
      toast.error("در دریافت لیست پزشکان مرکز مورد نظر خطایی رخ داد", {
        description: error.message,
      });
    },
  });
}
