"use client";

import { IRecipes } from "@/@types/recipe";
import { Button } from "@/components/ui/button";
import data from "@/data/recipes.json";
import Recipes from "@/components/recipes/recipes";
import { useDispatch, useSelector } from "react-redux";
import { reset, setResults } from "@/store/recipes/recipeSlice";
import RecipeModal from "@/components/recipes/recipeModal";
import { RootState } from "@/store/store";
import IngredientForm from "@/components/ingredients/ingredientForm";
import { RotateCcw, Search } from "lucide-react";
import { clear } from "@/store/ingredients/ingredientSlice";

export default function Home() {
  const { ingredients } = useSelector((state: RootState) => state.ingredient);
  const { showResults } = useSelector((state: RootState) => state.recipe);

  const recipeData: IRecipes = data as IRecipes;

  const dispatch = useDispatch();

  /**
   * Searches recipes that can be made with the given ingredients.
   * Ignores quantities, matches ingredient names as substrings (case-insensitive).
   */
  const findRecipesByIngredients = () => {
    // Normalize user ingredients
    const normalizedIngredients = ingredients.map((i) =>
      i.trim().toLowerCase()
    );

    const recipeResults = recipeData.filter((recipe) => {
      // Normalize recipe ingredients
      const normalizedRecipeIngredients = recipe.Ingredients.map(
        (ing: string) => ing.toLowerCase()
      );

      // Check if every user ingredient is present in any recipe ingredient
      return normalizedIngredients.every((ingredient) =>
        normalizedRecipeIngredients.some((recipeIngredient) =>
          recipeIngredient.includes(ingredient)
        )
      );
    });

    dispatch(setResults(recipeResults));
  };

  const handleReset = () => {
    dispatch(reset());
    dispatch(clear());
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center w-[90%] md:w-[20rem] font-bold">
        <p className="text-5xl mb-5">MunchMatch</p>
        <IngredientForm />
        <div className="flex gap-3">
          {showResults && (
            <Button
              variant="destructive"
              className="text-lg cursor-pointer"
              onClick={handleReset}
            >
              <RotateCcw />
              Reset
            </Button>
          )}

          <Button
            className="text-lg cursor-pointer"
            onClick={findRecipesByIngredients}
            disabled={ingredients.length <= 0}
          >
            <Search />
            Find recipe
          </Button>
        </div>
      </div>
      <Recipes />
      <RecipeModal />
    </div>
  );
}
