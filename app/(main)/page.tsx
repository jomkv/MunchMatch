"use client";

import { IIngredients, IRecipes } from "@/@types/recipe";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import data from "@/data/recipes.json";
import Recipes from "@/components/recipes/recipes";
import { useDispatch } from "react-redux";
import { setResults } from "@/store/recipes/recipeSlice";
import RecipeModal from "@/components/recipes/recipeModal";

const formSchema = z.object({
  ingredient: z.string().min(1, "Please enter an ingredient"),
});

export default function Home() {
  const [ingredients, setIngredients] = useState<IIngredients>([]);

  const recipeData: IRecipes = data as IRecipes;

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredient: "",
    },
  });

  const addIngredient = (values: z.infer<typeof formSchema>) => {
    // Skip if ingredient already exists
    if (ingredients.includes(values.ingredient)) {
      return;
    }

    setIngredients((prev) => [...prev, values.ingredient]);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);

    setIngredients(updatedIngredients);
  };

  /**
   * Returns recipes that can be made with the given ingredients.
   * Ignores quantities, matches ingredient names as substrings (case-insensitive).
   */
  const findRecipesByIngredients = () => {
    // Normalize user ingredients
    const normalizedIngredients = ingredients.map((i) =>
      i.trim().toLowerCase()
    );

    const recipeResults = recipeData.filter((recipe) => {
      // Normalize recipe ingredients
      const normalizedRecipeIngredients = recipe.Ingredients.map(
        (ing: string) => ing.toLowerCase()
      );

      // Check if every user ingredient is present in any recipe ingredient
      return normalizedIngredients.every((ingredient) =>
        normalizedRecipeIngredients.some((recipeIngredient) =>
          recipeIngredient.includes(ingredient)
        )
      );
    });

    dispatch(setResults(recipeResults));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p>MunchMatch</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(addIngredient)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="ingredient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    {ingredients.map((ingredient) => ingredient)}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <Button onClick={findRecipesByIngredients}>Search recipe</Button>
      </div>
      <Recipes />
      <RecipeModal />
    </div>
  );
}
