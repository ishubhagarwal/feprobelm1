import { configureStore } from "@reduxjs/toolkit";
import falconeReducer from "./slices/falcone";

export const store = configureStore({
  reducer: {
    falcone: falconeReducer,
  },
});
