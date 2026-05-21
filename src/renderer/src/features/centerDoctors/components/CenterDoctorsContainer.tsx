import {
  Container,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useGetCenterDoctorsQuery } from "../service/query";
import DoctorCard from "./DoctorCard";
import { useNavigate } from "react-router-dom";
import { Routes } from "@renderer/lib/routes";
import { useAppSelector } from "@renderer/lib/redux/hooks";
import FullPageSpinner from "@renderer/components/fullPageSpinner";
import CustomError from "@renderer/components/customError";

export default function DoctorsContainer() {
  const settings = useAppSelector((state) => state.settings.data);
  const navigate = useNavigate();
  const {
    data: doctors,
    isLoading: isLoadingDoctors,
    error,
  } = useGetCenterDoctorsQuery(settings?.centerId);

  console.log(doctors, "ooooooooooo");
  const handleBookAppointment = (doctorId: string) => {
    navigate(`${Routes.DOCTOR_CALENDAR}/${doctorId}`);

    console.log("Book appointment for doctor:", doctorId);
  };

  if (isLoadingDoctors) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <CustomError title="شناسه مرکز یافت نشد" />;
  }
  if (!settings?.centerId) {
    return <CustomError title="شناسه مرکز یافت نشد" />;
  }

  if (!doctors || doctors.length === 0) {
    return <CustomError title=" هیچ پزشکی برای این مرکز یافت نشد" />;
  }

  return (
    <Stack>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        پزشکان مرکز
      </Typography>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onBookAppointment={() => handleBookAppointment(doctor.id)}
          hasAppointment={doctor.is_recommended || false}
        />
      ))}
    </Stack>
  );
}
