import { createSlice } from "@reduxjs/toolkit";
import globalDefaults from "./globalDefaults";

let prevId = 0;

const emptyState = {};

const imageDefault = {
  ...globalDefaults,
  width: 300,
  height: 500,
  objectFit: "contain",
  data: "",
};

export const slice = createSlice({
  name: "image",
  initialState: emptyState,
  reducers: {
    addImage: {
      reducer(state, action) {
        state[prevId + 1] = {
          ...imageDefault,
          data: action.payload.data,
          id: (prevId += 1),
        };
      },
      prepare(data) {
        return { payload: { data } };
      },
    },
    setImage: {
      reducer(state, action) {
        state[action.payload.id] = {
          ...state[action.payload.id],
          ...action.payload.imageData,
        };
      },
      prepare(id, imageData) {
        return { payload: { id, imageData } };
      },
    },
    removeImage: {
      reducer(state, action) {
        //eslint-disable-next-line no-unused-vars
        const { [action.payload.id]: _, ...images } = state;
        state = images;
      },
      prepare(id) {
        return { payload: { id } };
      },
    },
  },
});

export const { addImage, removeImage, setImage } = slice.actions;

export default slice.reducer;
