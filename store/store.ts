import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipes/recipeSlice";
import ingredientSlice from "./ingredients/ingredientSlice";

const store = configureStore({
  reducer: {
    recipe: recipeSlice,
    ingredient: ingredientSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
