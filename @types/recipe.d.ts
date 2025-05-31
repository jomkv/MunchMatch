export type IIngredient = string;
export type IIngredients = IIngredient[];

export type IMethod = string;
export type IMethods = IMethod[];

export type INutrition = string;
export type INutritions = INutrition[];

export interface IRecipe {
  Name: string;
  RecipeUrl: string;
  ImageUrl: string;
  Description: string;
  Author: string;
  Ingredients: IIngredients;
  Methods: IMethods;
  Nutritions: INutritions;
}
export type IRecipes = IRecipe[];

interface IRecipeState {
  selected: IRecipe | null;
  results: IRecipes;
  showResults: boolean;
}

interface IIngredientState {
  ingredients: IIngredients;
}
