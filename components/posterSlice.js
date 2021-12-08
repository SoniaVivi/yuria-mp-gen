import { createSlice } from "@reduxjs/toolkit";

let prevId = 0;
//eslint-disable-next-line no-unused-vars
const emptyState = {
  mode: "edit",
  size: { width: 750, height: 1125 },
  headings: {},
};

const testState = {
  ...emptyState,
  headings: {
    0: {
      id: 0,
      text: "TEST ZILLA",
      top: 0,
      left: 0,
      width: 300,
      height: 150,
      textAlign: "center",
      fontSize: 36,
      fontFamily: "Godzilla",
      color: "#000000",
      outline: "1px solid #000000",
    },
  },
};

const headingDefaults = {
  title: {
    text: "Lorem Ipsum",
    top: 0,
    left: 0,
    width: 300,
    height: 150,
    fontFamily: "Godzilla",
    fontSize: "36",
    textAlign: "left",
    color: "#000000",
    outline: "1px solid #000000",
  },
  subheading: {
    text: "Lorem Ipsum",
    top: 0,
    left: 0,
    width: 300,
    height: 150,
    fontFamily: "Godzilla",
    fontSize: "24",
    textAlign: "center",
    color: "#000000",
    outline: "1px solid #000000",
  },
};

export const slice = createSlice({
  name: "poster",
  initialState: testState,
  reducers: {
    addHeading: {
      reducer(state, action) {
        state.headings[prevId + 1] = {
          ...headingDefaults[action.payload.headingType],
          ...action.payload.headingData,
          id: (prevId += 1),
        };
      },
      prepare(headingType, headingData = {}) {
        return { payload: { headingData, headingType } };
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
    setMode: {
      reducer(state, action) {
        state.mode = action.payload.mode;
      },
      prepare(mode) {
        return { payload: { mode } };
      },
    },
  },
});

export const { addHeading, setHeading } = slice.actions;

export const selectMode = (state) => state.poster.mode;

export default slice.reducer;
