import { useEffect, useState } from "react";
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
import { KioskSettingsType } from "src/shared/types/common";
import { useNavigate } from "react-router-dom";
import { Routes } from "@renderer/lib/routes";

export default function DoctorsContainer() {
  const [centerId, setCenterId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getSettings = async () => {
      try {
        const settings = (await window.electron.ipcRenderer.invoke(
          "settings:get-kiosk-settings",
        )) as KioskSettingsType;
        setCenterId(settings?.centerId);
      } catch (error) {
        console.error("Failed to get kiosk settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSettings();
  }, []);

  const {
    data: doctors,
    isLoading: isLoadingDoctors,
    error,
  } = useGetCenterDoctorsQuery(centerId);

  console.log(doctors, "ooooooooooo");
  const handleBookAppointment = (doctorId: string) => {
    navigate(`${Routes.DOCTOR_CALENDAR}/${doctorId}`);

    console.log("Book appointment for doctor:", doctorId);
  };

  if (isLoading || isLoadingDoctors) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress color="warning" />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          خطا در دریافت لیست پزشکان مرکز
        </Alert>
      </Container>
    );
  }

  if (!centerId) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 2 }}>
          شناسه مرکز مشخص نشده است
        </Alert>
      </Container>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <Container>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            هیچ پزشکی برای این مرکز یافت نشد
          </Typography>
        </Box>
      </Container>
    );
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
