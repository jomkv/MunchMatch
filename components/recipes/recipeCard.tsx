import { IRecipe } from "@/@types/recipe";
import { selectRecipe } from "@/store/recipes/recipeSlice";
import { useDispatch } from "react-redux";

type RecipeCardProps = {
  recipe: IRecipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectRecipe(recipe));
  };

  return (
    <div
      onClick={handleClick}
      className="w-full cursor-pointer transition-transform duration-200 hover:scale-102 p-[1rem] border-1 rounded-xs border-solid border-black/25 hover:bg-[#f9fafb]"
    >
      <p className="font-bold">{recipe.Name}</p>
      <p>
        {recipe.Description?.substring(
          0,
          recipe.Description.length < 100 ? recipe.Description.length : 100
        )}
      </p>
    </div>
  );
}
