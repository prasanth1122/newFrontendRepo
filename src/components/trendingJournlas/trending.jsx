import { useNavigate } from "react-router-dom";

export default function Trending({ id, category, title, value }) {
  const navigate = useNavigate();
  return (
    <div
      className="  bg-terinary  flex flex-col transition-transform duration-300 ease-in-out items-start gap-8 min-w-96 min-h-[200px] py-2 px-4 rounded-xl hover:shadow-card_shadow hover:scale-105 p-4"
      onClick={() => {
        navigate(`/article/${id}`);
      }}
    >
      <p className="text-lg">{category}</p>
      <p className="text-2xl font-bold text-important_text">{title}</p>
      <p>{value}</p>
      <button className="text-white px-4 py-2 rounded-lg bg-secondary ">
        Access
      </button>
    </div>
  );
}
