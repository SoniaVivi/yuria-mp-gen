import { createSlice } from "@reduxjs/toolkit";
//eslint-disable-next-line no-unused-vars
const emptyState = {
  mode: "edit",
  size: { width: 750, height: 1125 },
  showImageForm: false,
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
    toggleImageForm: {
      reducer(state) {
        state.showImageForm = !state.showImageForm;
      },
      prepare() {
        return { payload: {} };
      },
    },
  },
});

export const { setMode, toggleImageForm } = slice.actions;

export const selectMode = (state) => state.poster.mode;

export default slice.reducer;
