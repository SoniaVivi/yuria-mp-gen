import { createSlice } from "@reduxjs/toolkit";

let prevId = 0;
//eslint-disable-next-line no-unused-vars
const emptyState = {
  mode: "edit",
  size: { width: 750, height: 1125 },
  headings: {},
  images: {},
  showImageForm: false,
};

const globalDefaults = { zIndex: 1 };

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
      zIndex: 5,
    },
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

const imageDefault = {
  ...globalDefaults,
  width: 300,
  height: 500,
  objectFit: "contain",
  filters: {},
  data: "",
  rotation: 0,
};

export const imageFilters = {
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
    removeHeading: {
      reducer(state, action) {
        //eslint-disable-next-line no-unused-vars
        const { [action.payload.id]: _, ...headings } = state.headings;
        state.headings = headings;
      },
      prepare(id) {
        return { payload: { id } };
      },
    },
    addImage: {
      reducer(state, action) {
        state.images[prevId + 1] = {
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
        state.images[action.payload.id] = {
          ...state.images[action.payload.id],
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
        const { [action.payload.id]: _, ...images } = state.images;
        state.images = images;
      },
      prepare(id) {
        return { payload: { id } };
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
    addFilter: {
      reducer(state, action) {
        state.images[action.payload.id].filters[action.payload.filter] = {
          ...imageFilters[action.payload.filter],
          value: 0,
        };
      },
      prepare(id, filter) {
        return { payload: { id, filter } };
      },
    },
    setFilter: {
      reducer(state, action) {
        state.images[action.payload.id].filters[action.payload.filter] = {
          ...state.images[action.payload.id].filters[action.payload.filter],
          value: action.payload.value,
        };
      },
      prepare(id, filter, value) {
        return { payload: { id, filter, value } };
      },
    },
  },
});

export const {
  addHeading,
  setHeading,
  removeHeading,
  addImage,
  removeImage,
  toggleImageForm,
  setImage,
  addFilter,
  setFilter,
} = slice.actions;

export const selectMode = (state) => state.poster.mode;

export default slice.reducer;
