import { createSlice } from "@reduxjs/toolkit";
import globalDefaults from "./globalDefaults";

let prevId = 0;
//eslint-disable-next-line no-unused-vars
const emptyState = {};

//eslint-disable-next-line no-unused-vars
const testState = {
  ...emptyState,
  0: {
    ...globalDefaults,
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
    zIndex: 5,
  },
};

const headingDefaults = {
  title: {
    ...globalDefaults,
    text: "Lorem Ipsum",
    top: 0,
    left: 0,
    width: 300,
    height: 150,
    fontFamily: "Godzilla",
    fontSize: 36,
    textAlign: "left",
    color: "#000000",
  },
  subheading: {
    ...globalDefaults,
    text: "Lorem Ipsum",
    top: 0,
    left: 0,
    width: 300,
    height: 150,
    fontFamily: "Godzilla",
    fontSize: 24,
    textAlign: "center",
    color: "#000000",
  },
};

export const slice = createSlice({
  name: "heading",
  initialState: testState,
  reducers: {
    addHeading: {
      reducer(state, action) {
        state[prevId + 1] = {
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
        state[action.payload.id] = {
          ...state[action.payload.id],
          ...action.payload.headingData,
        };
      },
      prepare(id, headingData) {
        return { payload: { id, headingData } };
      },
    },
    removeHeading: {
      reducer(state, action) {
        //eslint-disable-next-line no-unused-vars
        const { [action.payload.id]: _, ...heading } = state;
        state = heading;
      },
      prepare(id) {
        return { payload: { id } };
      },
    },
  },
});

export const { addHeading, setHeading, removeHeading } = slice.actions;

export default slice.reducer;
