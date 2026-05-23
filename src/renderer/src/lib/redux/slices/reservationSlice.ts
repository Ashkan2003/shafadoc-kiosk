import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppointmentServiceInfoType,
  AppointmentTimeStatusType,
  AuthUser,
  CalendarAppointmentType,
  CombinedAppointmentsByDateType,
  DoctorType,
} from "src/shared/types/common";

interface ReservationState {
  step: number; // 1-indexed: 1 = select doctor, 2 = select slot, ...
  selectedDoctor: DoctorType | null;

  //
  initialAppointments: CalendarAppointmentType[] | null;
  selectedPatientData: AuthUser | null;
  calendarData: CombinedAppointmentsByDateType[] | null;

  selectedAppointmentDetail: {
    selectedService: AppointmentServiceInfoType | null;
    selectedAppointment: CalendarAppointmentType | null;
    selectedDayTimes: AppointmentTimeStatusType[] | null;
    selectedTime: string | null;
    selectedDay: string | null; // store selected Day date like iso-string to prevent redux-strong-date-serilazation-warning
    timeFrame: {
      start_time: string | null;
      end_time: string | null;
    };
  };
}

const initialState: ReservationState = {
  step: 1,
  selectedDoctor: null,

  //
  initialAppointments: [],
  selectedPatientData: null,
  calendarData: [],
  selectedAppointmentDetail: {
    selectedService: null as AppointmentServiceInfoType | null,
    selectedAppointment: null as CalendarAppointmentType | null,
    selectedDayTimes: null,
    selectedTime: null,
    timeFrame: {
      start_time: "",
      end_time: "",
    },
    selectedDay: null,
  },
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },

    setSelectedDoctor: (
      state,
      action: PayloadAction<typeof state.selectedDoctor>,
    ) => {
      state.selectedDoctor = action.payload;
    },

    resetReservation: (state) => {
      state.step = 1;
    },
    /////////
    setInitialAppointments: (
      state,
      action: PayloadAction<typeof state.initialAppointments>,
    ) => {
      state.initialAppointments = action.payload;
    },
    setCalendarData: (
      state,
      action: PayloadAction<typeof state.calendarData>,
    ) => {
      state.calendarData = action.payload;
    },
    setPatient: (
      state,
      action: PayloadAction<typeof state.selectedPatientData>,
    ) => {
      state.selectedPatientData = action.payload;
    },
    setSelectedAppointmentDetail: (
      state,
      action: PayloadAction<Partial<typeof state.selectedAppointmentDetail>>,
    ) => {
      Object.assign(state.selectedAppointmentDetail, action.payload);
    },
  },
});

export const {
  setStep,
  resetReservation,
  setSelectedDoctor,
  /////////////////
  setInitialAppointments,
  setCalendarData,
  setPatient,
  setSelectedAppointmentDetail,
} = reservationSlice.actions;

export default reservationSlice.reducer;
