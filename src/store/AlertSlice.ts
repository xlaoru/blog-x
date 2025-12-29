import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type AlertType = "success" | "error";

interface AlertState {
  message: string | null;
  type: AlertType;
}

const initialState: AlertState = {
  message: null,
  type: "success",
};

const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.message = null;
    },
  },
});

export const { showAlert, clearAlert } = AlertSlice.actions;
export const selectAlert = (state: RootState) => state.alert;
export default AlertSlice.reducer;