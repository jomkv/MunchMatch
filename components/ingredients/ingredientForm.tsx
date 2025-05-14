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
import { add } from "@/store/ingredients/ingredientSlice";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";

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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ingredient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Add ingredient"
                    {...field}
                    className="pr-10"
                  />
                </FormControl>
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  tabIndex={-1}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <FormDescription>
                {ingredients.map((ingredient) => ingredient)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
