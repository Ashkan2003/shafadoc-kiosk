import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CenterType } from "@renderer/types/common";

interface InitialState {
  currentCenter: CenterType | null;
  currentCenterId: string | null;
}

const initialState: InitialState = {
  currentCenter: null,
  currentCenterId: null,
};

export const centerSlice = createSlice({
  name: "center",
  initialState,
  reducers: {
    setCurrentCenter: (
      state,
      action: PayloadAction<typeof state.currentCenter>,
    ) => {
      state.currentCenter = action.payload;
    },
    setCurrentCenterId: (
      state,
      action: PayloadAction<typeof state.currentCenterId>,
    ) => {
      state.currentCenterId = action.payload;
    },
  },
});

export const { setCurrentCenter, setCurrentCenterId } = centerSlice.actions;
export default centerSlice.reducer;
