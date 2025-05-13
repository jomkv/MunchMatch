export type IIngredient = string;
export type IIngredients = IIngredient[];

export type IMethod = string;
export type IMethods = IMethod[];

export interface IRecipe {
  Name: string;
  url: string;
  Description: string | null;
  Author: string;
  Ingredients: IIngredients;
  Method: IMethods;
}
export type IRecipes = IRecipe[];
