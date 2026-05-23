import { Container, Box, Typography, Stack } from "@mui/material";
import { useGetCenterDoctorsQuery } from "../service/query";
import DoctorCard from "./DoctorCard";
import { useNavigate } from "react-router-dom";
import { Routes } from "@renderer/lib/routes";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import {
  setSelectedDoctor,
  setStep,
} from "@renderer/lib/redux/slices/reservationSlice";
import FullPageSpinner from "@renderer/components/fullPageSpinner";
import CustomError from "@renderer/components/customError";
import { useEffect } from "react";
import { DoctorType } from "src/shared/types/common";

export default function DoctorsContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const settings = useAppSelector((state) => state.settings.data);

  const {
    data: doctors,
    isLoading: isLoadingDoctors,
    error,
  } = useGetCenterDoctorsQuery(settings?.centerId);

  // Always at step 1 when this page mounts
  useEffect(() => {
    dispatch(setStep(1));
  }, [dispatch]);

  const handleBookAppointment = (doctor: DoctorType) => {
    dispatch(setSelectedDoctor(doctor));

    dispatch(setStep(2));
    navigate(`${Routes.DOCTOR_CALENDAR}/${doctor.id}`);
  };

  if (isLoadingDoctors) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <CustomError title="خطا در دریافت اطلاعات پزشکان" />;
  }

  if (!settings?.centerId) {
    return <CustomError title="شناسه مرکز یافت نشد" />;
  }

  if (!doctors || doctors.length === 0) {
    return <CustomError title="هیچ پزشکی برای این مرکز یافت نشد" />;
  }

  return (
    <Stack sx={{ gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        پزشکان مرکز
      </Typography>

      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onBookAppointment={() => handleBookAppointment(doctor)}
        />
      ))}
    </Stack>
  );
}
