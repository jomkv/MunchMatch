"use client";

import { IRecipes } from "@/@types/recipe";
import { Button } from "@/components/ui/button";
import data from "@/data/recipes.json";
import Recipes from "@/components/recipes/recipes";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "@/store/recipes/recipeSlice";
import RecipeModal from "@/components/recipes/recipeModal";
import { RootState } from "@/store/store";
import IngredientForm from "@/components/ingredients/ingredientForm";

export default function Home() {
  const { ingredients } = useSelector((state: RootState) => state.ingredient);

  const recipeData: IRecipes = data as IRecipes;

  const dispatch = useDispatch();

  /**
   * Returns recipes that can be made with the given ingredients.
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

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[20%] font-bold">
        <p className="text-5xl mb-5">MunchMatch</p>
        <IngredientForm />
        <Button
          className="text-2xl pt-7 pb-8"
          onClick={findRecipesByIngredients}
        >
          Search recipe
        </Button>
      </div>
      <Recipes />
      <RecipeModal />
    </div>
  );
}
