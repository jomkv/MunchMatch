import { IIngredient } from "@/@types/recipe";
import { X } from "lucide-react";

type IngredientCardProps = {
  ingredient: IIngredient;
  onRemove: () => void;
};

export default function IngredientCard({
  ingredient,
  onRemove,
}: IngredientCardProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2 text-sm font-medium shadow border">
      <span>{ingredient}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
        aria-label={`Remove ${ingredient}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
