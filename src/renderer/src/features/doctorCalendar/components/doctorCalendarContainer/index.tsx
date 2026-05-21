import React from "react";
import { useParams } from "react-router-dom";
import { useCenterDoctorAppointmentQuery } from "../../service/query";

const DoctorCalendarContainer = () => {
  const { id } = useParams();
  useCenterDoctorAppointmentQuery({
    doctorId: id!,
    centerId: 
  });
  return <div>DoctorCalendarContainer</div>;
};

export default DoctorCalendarContainer;
