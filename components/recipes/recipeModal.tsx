import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
        {recipe?.Method && recipe.Method.length > 0 && (
          <ol className="list-decimal list-inside mt-4 space-y-2">
            {recipe.Method.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        )}
      </DialogContent>
    </Dialog>
  );
}
