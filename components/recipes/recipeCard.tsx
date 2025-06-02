import { IRecipe } from "@/@types/recipe";
import { selectRecipe } from "@/store/recipes/recipeSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type RecipeCardProps = {
  recipe: IRecipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [description, setDescription] = useState<string>(recipe.Description);
  const [isLong, setIsLong] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectRecipe(recipe));
  };

  useEffect(() => {
    if (description.length > 100) {
      setIsLong(true);
      setDescription(description.substring(0, 100));
    }
  }, [description]);

  return (
    <div
      onClick={handleClick}
      className="w-full cursor-pointer transition-transform duration-200 hover:scale-102 p-[1rem] border-1 rounded-xs border-solid border-black/25 hover:bg-[#f9fafb]"
    >
      <p className="font-bold">{recipe.Name}</p>
      <p>
        {description}
        {isLong && "...."}
      </p>
    </div>
  );
}
