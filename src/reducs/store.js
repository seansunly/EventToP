import { configureStore } from "@reduxjs/toolkit";
import eventSlcie from "./feature/eventSlcie/eventSlices";

export const store = configureStore({
  reducer: {
    event: eventSlcie,
  },
});
