"use client";

import { IIngredient, IIngredients, IRecipe, IRecipes } from "@/@types/recipe";
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
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [showFindError, setShowFindError] = useState<boolean>(false);

  const { ingredients: inputIngredients } = useSelector(
    (state: RootState) => state.ingredient
  );
  const { showResults } = useSelector((state: RootState) => state.recipe);

  const recipeData: IRecipes = data as IRecipes;

  const dispatch = useDispatch();

  /**
   * Searches recipes that can be made with the given ingredients.
   * Ignores quantities, matches ingredient names as substrings (case-insensitive).
   */
  const findRecipesByIngredients = () => {
    // If error, show shaker animation and dialog
    if (inputIngredients.length === 0) {
      toast("Please add at least one ingredient");
      setShowFindError(true);
      setTimeout(() => setShowFindError(false), 500); // Remove shake after animation
      return;
    }

    // Results array
    const recipeResults: IRecipes = [];

    // Iterate through each recipe from dataset in a linear manner
    for (let i = 0; i < recipeData.length; i++) {
      const recipe: IRecipe = recipeData[i];
      const recipeIngredients: IIngredients = recipe.Ingredients.map(
        (ing: string) => ing.toLowerCase() // convert to lowercase
      );

      let include: boolean = true;

      // Iterate through each input ingredients
      // Checks if they are all within the current recipe's ingredients
      for (let j = 0; j < inputIngredients.length; j++) {
        const ingredient: IIngredient = inputIngredients[j].toLowerCase(); // convert to lower case
        let found: boolean = false;

        // Find current input ingredient in the current recipe's ingredients
        for (let k = 0; k < recipeIngredients.length; k++) {
          // Inclusive, ie:
          // "2 tbsp olive oil" & "oil" => match
          // "Roasted Potatoes" & "potato" => match
          // "water" & "salt" => not match lol
          if (recipeIngredients[k].includes(ingredient)) {
            found = true;
            break;
          }
        }

        // If not found, dont include current recipe
        if (!found) {
          include = false;
          break;
        }
      }

      if (include) {
        recipeResults.push(recipe);
      }
    }

    dispatch(setResults(recipeResults));
  };

  const handleReset = () => {
    dispatch(reset());
    dispatch(clear());
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center w-[90%] md:w-[20rem] font-bold">
        <img className="mb-0" src="assets/logo-cropped.svg" />
        <IngredientForm />
        <div className="flex gap-3">
          {showResults && (
            <Button
              variant="secondary"
              className="text-lg cursor-pointer"
              onClick={handleReset}
            >
              <RotateCcw />
              Reset
            </Button>
          )}

          <Button
            className={`text-lg cursor-pointer ${
              showFindError ? "animate-shake" : ""
            }`}
            onClick={findRecipesByIngredients}
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
