import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipes/recipeSlice";

const store = configureStore({
  reducer: {
    recipe: recipeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
