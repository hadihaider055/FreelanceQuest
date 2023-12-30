import { configureStore } from "@reduxjs/toolkit";

// Reducer
import chatReducer from "./slices/chatSlice";
import authReducer from "./slices/authSlice";
import jobSlice from "./slices/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    job: jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
