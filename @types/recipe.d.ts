export type IIngredient = string;
export type IIngredients = IIngredient[];

export type IMethod = string;
export type IMethods = IMethod[];

export interface IRecipe {
  Name: string;
  RecipeUrl: string;
  ImageUrl: string;
  Description: string;
  Author: string;
  Ingredients: IIngredients;
  Methods: IMethods;
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
