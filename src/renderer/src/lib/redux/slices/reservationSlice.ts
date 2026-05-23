import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReservationState {
  step: number; // 1-indexed: 1 = select doctor, 2 = select slot, ...
  doctorId: string | null;
}

const initialState: ReservationState = {
  step: 1,
  doctorId: null,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },

    setDoctorId: (state, action: PayloadAction<string | null>) => {
      state.doctorId = action.payload;
    },

    resetReservation: (state) => {
      state.step = 1;
      state.doctorId = null;
    },
  },
});

export const { setStep, setDoctorId, resetReservation } =
  reservationSlice.actions;

export default reservationSlice.reducer;
