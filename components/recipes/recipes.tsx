import { IRecipes } from "@/@types/recipe";
import RecipeCard from "./recipeCard";

type RecipesProps = {
  data: IRecipes;
};

export default function Recipes({ data }: RecipesProps) {
  return (
    <div className="max-h-[50vh] flex flex-col gap-3 overflow-auto p-[1rem]">
      {data.map((recipe, index) => (
        <RecipeCard
          key={index}
          title={recipe.Name}
          description={recipe.Description}
        />
      ))}
    </div>
  );
}
