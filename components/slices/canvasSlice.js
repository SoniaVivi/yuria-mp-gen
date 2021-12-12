import { createSlice } from "@reduxjs/toolkit";
//eslint-disable-next-line no-unused-vars
const emptyState = {
  mode: "edit",
  size: { width: 750, height: 1125 },
  imageForm: null,
  background: { data: null, size: "contain", repeat: "no-repeat" },
};

export const slice = createSlice({
  name: "canvas",
  initialState: emptyState,
  reducers: {
    setMode: {
      reducer(state, action) {
        state.mode = action.payload.mode;
      },
      prepare(mode) {
        return { payload: { mode } };
      },
    },
    setImageForm: {
      reducer(state, action) {
        state.imageForm = action.payload.formType;
      },
      prepare(formType) {
        return { payload: { formType } };
      },
    },
    setSize: {
      reducer(state, action) {
        state.size = { ...state.size, ...action.payload.size };
      },
      prepare(size) {
        return { payload: { size } };
      },
    },
    setBackground: {
      reducer(state, action) {
        state.background = { ...state.background, ...action.payload.backgrond };
      },
      prepare(backgrond = {}) {
        return { payload: { backgrond } };
      },
    },
  },
});

export const { setMode, setImageForm, setSize, setBackground } = slice.actions;

export const selectMode = (state) => state.poster.mode;

export default slice.reducer;
