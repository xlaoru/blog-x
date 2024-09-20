import { configureStore } from "@reduxjs/toolkit";

import BlogReducer from "./BlogSlice"
import AuthReducer from "./AuthSlice"

export const store = configureStore({
  reducer: {
    blogs: BlogReducer,
    auth: AuthReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;