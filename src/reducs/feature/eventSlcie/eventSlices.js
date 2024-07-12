import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bacURl } from "../../api/bacURl";

const initialState = {
  events: [],
  eventId: {},
  status: "idle",
  error: null,
};
export const fetchevents = createAsyncThunk("events/fetchevents", async () => {
  const response = await fetch(`${bacURl}all_events/`);
  const data = await response.json();
   console.log("event all api ", data.results);
  return data.results;
});

export const fetcheventsssById = createAsyncThunk("events/fetcheventById",async (id) => {
    const response = await fetch( `http://136.228.158.126:50003/api/events/${id}/`);
    const data = await response.json();
    console.log("event all api by id", data);
    console.log("hello not work ")
    return data;
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchevents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchevents.fulfilled, (state, action) => {
        (state.status = "success"), (state.events = action.payload);
      })
      .addCase(fetchevents.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })

      //by id get
      .addCase(fetcheventsssById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetcheventsssById.fulfilled, (state, action) => {
        (state.status = "success"), (state.eventId = action.payload);
      })
      .addCase(fetcheventsssById.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });
  },
});
//export reducer
export default eventSlice.reducer;
//select all
export const seleteAllEvents = (state) => state.event.events;

 //export const seleteEventByID = (state) => state.event.eventId;
