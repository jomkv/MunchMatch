import { IIngredientState } from "@/@types/recipe";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IIngredientState = {
  ingredients: [],
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      if (state.ingredients.includes(action.payload)) {
        return;
      }

      state.ingredients = [...state.ingredients, action.payload];
    },
    remove: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    clear: (state) => {
      state.ingredients = [];
    },
  },
});

export default ingredientSlice.reducer;
export const { add, remove, clear } = ingredientSlice.actions;
