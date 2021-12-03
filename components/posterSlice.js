import { createSlice } from "@reduxjs/toolkit";

let prevId = 0;

const emptyState = { size: [2000, 3000], headings: {} };

export const slice = createSlice({
  name: "poster",
  initialState: emptyState,
  reducers: {
    addTitle: {
      reducer(state, action) {
        const defaultTitleData = {
          fontSize: "20",
          font: "Godzilla",
          text: "",
          color: "#000000",
        };
        state.headings[prevId + 1] = {
          ...defaultTitleData,
          ...action.payload.titleData,
        };
      },
      prepare(titleData) {
        return { payload: { titleData } };
      },
    },
    setHeading: {
      reducer(state, action) {
        state.headings[action.payload.id] = {
          ...state.headings[action.payload.id],
          ...action.payload.headingData,
        };
      },
      prepare(id, headingData) {
        return { payload: { id, headingData } };
      },
    },
  },
});

export const { addTitle, setHeading } = slice.actions;

export default slice.reducer;
