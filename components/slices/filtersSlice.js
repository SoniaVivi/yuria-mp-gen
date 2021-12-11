import { createSlice } from "@reduxjs/toolkit";

//eslint-disable-next-line no-unused-vars
const emptyState = {};

export const filterDefaults = {
  blur: { unit: "px", min: 0, max: null },
  brightness: { unit: "%", min: 0, max: null },
  contrast: { unit: "%", min: 0, max: null },
  invert: { unit: "%", min: 0, max: 100 },
  opacity: { unit: "%", min: 0, max: 100 },
  grayScale: { unit: "%", min: 0, max: null },
  "hue-rotate": { unit: "deg", min: null, max: null },
  saturate: { unit: "%", min: 0, max: null },
  sepia: { unit: "%", min: 0, max: 100 },
};

export const slice = createSlice({
  name: "filter",
  initialState: emptyState,
  reducers: {
    addFilter: {
      reducer(state, action) {
        if (!state[action.payload.id]) state[action.payload.id] = {};
        state[action.payload.id][action.payload.filter] = {
          ...filterDefaults[action.payload.filter],
          value: 0,
        };
      },
      prepare(id, filter) {
        return { payload: { id, filter } };
      },
    },
    setFilter: {
      reducer(state, action) {
        state[action.payload.id][action.payload.filter] = {
          ...state[action.payload.id][action.payload.filter],
          value: action.payload.value,
        };
      },
      prepare(id, filter, value) {
        return { payload: { id, filter, value } };
      },
    },
  },
});

export const { addFilter, setFilter } = slice.actions;

export default slice.reducer;
