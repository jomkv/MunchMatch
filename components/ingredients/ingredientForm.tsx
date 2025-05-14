import { useDispatch, useSelector } from "react-redux";
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
import { Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { add, remove } from "@/store/ingredients/ingredientSlice";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";
import IngredientCard from "./ingredientCard";

const formSchema = z.object({
  ingredient: z.string(),
});

export default function IngredientForm() {
  const { ingredients } = useSelector((state: RootState) => state.ingredient);

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredient: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const { ingredient } = values;

    if (ingredient.length === 0 || ingredient.trim().length === 0) {
      return;
    }

    dispatch(add(ingredient));
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          name="ingredient"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Add ingredient"
                    {...field}
                    className="pr-10 rounded-full bg-[#f9fafb]"
                  />
                </FormControl>
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 rounded-full"
                  tabIndex={-1}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap mt-2 w-full">
                {ingredients.map((ingredient, idx) => (
                  <IngredientCard
                    key={ingredient + idx}
                    ingredient={ingredient}
                    onRemove={() => dispatch(remove(idx))}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
