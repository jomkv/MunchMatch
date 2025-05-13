type RecipeCardProps = {
  title: string;
  description: string | null;
};

export default function RecipeCard({ title, description }: RecipeCardProps) {
  return (
    <div className="w-full cursor-pointer transition-transform duration-200 hover:scale-102 p-[1rem] border-1 rounded-xs border-solid border-black">
      <p className="font-bold">{title}</p>
      <p>
        {description?.substring(
          0,
          description.length < 100 ? description.length : 100
        )}
      </p>
    </div>
  );
}
