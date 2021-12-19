import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./slices/canvasSlice.js";
import filterReducer from "./slices/filtersSlice.js";
import imageReducer from "./slices/imagesSlice.js";
import headingReducer from "./slices/headingsSlice.js";
import creditsReducer from "./slices/creditsSlice";

export default configureStore({
  reducer: {
    canvas: canvasReducer,
    filter: filterReducer,
    image: imageReducer,
    heading: headingReducer,
    credits: creditsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
