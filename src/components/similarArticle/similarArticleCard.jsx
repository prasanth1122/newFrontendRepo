import { useNavigate } from "react-router-dom";

export default function SimilarArticleCard({
  title,
  category,
  formattedDate,
  id,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col py-2 px-4 items-start justify-between w-full min-h-36 bg-terinary rounded-xl"
      onClick={() => {
        navigate(`/article/${id}`);
      }}
    >
      <p className="text-lg font-bold">{title}</p>
      <p className="text-sm">{category}</p>
      <p className="text-xs font-bold">{formattedDate}</p>
    </div>
  );
}
