import { configureStore } from "@reduxjs/toolkit";
import posterReducer from "./posterSlice";

export default configureStore({
  reducer: {
    poster: posterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
