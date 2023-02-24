import { appApi, customApi } from "./api";

import { authSlice } from "./store-slices";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [customApi.reducerPath]: customApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(appApi.middleware)
      .concat(customApi.middleware),
});
