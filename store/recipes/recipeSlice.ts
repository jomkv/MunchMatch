import { IRecipe, IRecipes, IRecipeState } from "@/@types/recipe";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IRecipeState = {
  selected: null,
  results: [],
  showResults: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    selectRecipe: (state, action: PayloadAction<IRecipe | null>) => {
      state.selected = action.payload;
    },
    setResults: (state, action: PayloadAction<IRecipes>) => {
      state.results = action.payload;
      state.showResults = true;
    },
    reset: (state) => {
      state.results = [];
      state.showResults = false;
    },
  },
});

export default recipeSlice.reducer;
export const { selectRecipe, setResults, reset } = recipeSlice.actions;
