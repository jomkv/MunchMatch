import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { selectRecipe } from "@/store/recipes/recipeSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeModal() {
  const { selected: recipe } = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();

  const handleOpenChange = (open: boolean) => {
    // Reset selected recipe on modal close
    if (!open) dispatch(selectRecipe(null));
  };

  return (
    <Dialog open={!!recipe} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{recipe?.Name}</DialogTitle>
          <DialogDescription>{recipe?.Description}</DialogDescription>
        </DialogHeader>
        <div className="overflow-auto max-h-[80vh] pr-4">
          <p className="font-bold text-lg mb-2">Ingredients</p>
          {recipe?.Ingredients && recipe.Ingredients.length > 0 && (
            <ul className="list-disc space-y-2 mb-4">
              {recipe.Ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          )}
          <p className="font-bold text-lg mb-2">Steps</p>
          {recipe?.Methods && recipe.Methods.length > 0 && (
            <ol className="list-decimal list-inside space-y-2">
              {recipe.Methods.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
