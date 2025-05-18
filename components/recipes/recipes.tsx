import RecipeCard from "./recipeCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function Recipes() {
  const { results, showResults } = useSelector(
    (state: RootState) => state.recipe
  );
  const [search, setSearch] = useState<string>("");

  const filteredResults = results.filter((recipe) =>
    recipe.Name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSearch("");
  }, [showResults]);

  if (!showResults) return null;

  return (
    <div className="max-h-[50vh] flex flex-col gap-3 overflow-auto p-[1rem] w-[90%] md:w-[40rem]">
      <Input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 px-3 py-2 h-full border rounded w-full sticky top-0 bg-white"
      />
      {filteredResults.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
      {filteredResults.length === 0 && (
        <div className="text-center">No results 😔</div>
      )}
    </div>
  );
}
