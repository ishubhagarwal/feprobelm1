import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  planets: [],
  vehicles: [],
  timeTaken: 0,
  reset: false,
  falcone: null,
};

export const falconeSlice = createSlice({
  name: "falcone",
  initialState,
  reducers: {
    setFalconePlanets: (state, { payload }) => {
      state.planets = payload;
    },
    setFalconeVehicles: (state, { payload }) => {
      state.vehicles = payload;
    },
    setTimeTaken: (state, { payload }) => {
      state.timeTaken = payload;
    },
    setFalcone: (state, { payload }) => {
      state.falcone = payload;
    },
    clearResult: (state) => {
      state.timeTaken = 0;
      state.falcone = null;
    },
    resetDestinations: (state) => {
      state.reset = !state.reset;
    },
  },
});

export const {
  setFalconePlanets,
  setFalconeVehicles,
  setFalcone,
  setTimeTaken,
  clearResult,
  resetDestinations,
} = falconeSlice.actions;

export default falconeSlice.reducer;
