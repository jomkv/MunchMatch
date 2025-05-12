"use client";

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

const formSchema = z.object({
  ingredient: z.string().min(1, "Please enter an ingredient"),
});

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);

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
                    {ingredients.map((ingredient, index) => (
                      <p key={index}>{ingredient}</p>
                    ))}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <Button>Search recipe</Button>
      </div>
    </div>
  );
}
