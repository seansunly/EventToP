import { configureStore } from "@reduxjs/toolkit";
import eventSlcie from "./feature/eventSlcie/eventSlices";
import mapSlices from "./feature/mapSlice/mapSlices";

export const store = configureStore({
  reducer: {
    event: eventSlcie,
    map:mapSlices
  },
});
