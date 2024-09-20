import { configureStore } from "@reduxjs/toolkit";

import BlogReducer from "./BlogSlice"

export const store = configureStore({
  reducer: {
    blogs: BlogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;