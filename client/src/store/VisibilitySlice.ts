import { createSlice } from "@reduxjs/toolkit";
import Visibility from "./Visibility";

const initialState = Visibility.All;

const visibilitySlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    all: (state) => {
      return Visibility.All;
    },
    completed: (state) => {
      return Visibility.Completed;
    },
    planned: (state) => {
      return Visibility.Planned;
    }
  },
});

export const { all, completed, planned } = visibilitySlice.actions;

export default visibilitySlice.reducer;
