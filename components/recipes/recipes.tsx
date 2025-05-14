import RecipeCard from "./recipeCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Recipes() {
  const { results } = useSelector((state: RootState) => state.recipe);

  return (
    <div className="max-h-[50vh] flex flex-col gap-3 overflow-auto p-[1rem]">
      {results.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
}
