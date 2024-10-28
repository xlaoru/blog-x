import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import BlogReducer from "./BlogSlice"
import AuthReducer from "./AuthSlice"

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  blogs: BlogReducer,
  auth: AuthReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;