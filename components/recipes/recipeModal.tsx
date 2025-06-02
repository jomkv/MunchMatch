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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Spinner } from "../spinner/spinner";
import { useState } from "react";

export default function RecipeModal() {
  const { selected: recipe } = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  const handleOpenChange = (open: boolean) => {
    // Reset selected recipe on modal close
    if (!open) {
      dispatch(selectRecipe(null));
      setImgLoading(true);
    }
  };

  return (
    <Dialog open={!!recipe} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{recipe?.Name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="overflow-auto max-h-[80vh] pr-4">
              <p className="font-bold text-lg mb-2">Overview</p>

              <p className="text-sm mb-2">{recipe?.Description}</p>
              {imgLoading && (
                <div className="w-full flex items-center justify-center ">
                  <Spinner className="absolute w-full" />
                </div>
              )}

              <img
                src={recipe?.ImageUrl}
                alt={recipe?.Name}
                onLoad={() => setImgLoading(false)}
                onError={() => setImgLoading(false)}
              />
            </div>
          </TabsContent>
          <TabsContent value="nutrition">
            <div className="overflow-auto max-h-[80vh] pr-4">
              <p className="font-bold text-lg mb-2">Nutritions</p>
              {recipe?.Nutritions && recipe.Nutritions.length > 0 && (
                <ul className="list-disc space-y-2 mb-4">
                  {recipe.Nutritions.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
          <TabsContent value="ingredients">
            <div className="overflow-auto max-h-[80vh] pr-4">
              <p className="font-bold text-lg mb-2">Ingredients</p>
              {recipe?.Ingredients && recipe.Ingredients.length > 0 && (
                <ul className="list-disc space-y-2 mb-4">
                  {recipe.Ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
          <TabsContent value="steps">
            <div className="overflow-auto max-h-[80vh] pr-4">
              <p className="font-bold text-lg mb-2">Steps</p>
              {recipe?.Methods && recipe.Methods.length > 0 && (
                <ol className="list-decimal list-inside space-y-2">
                  {recipe.Methods.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
