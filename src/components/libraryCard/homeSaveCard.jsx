import { useNavigate } from "react-router-dom";
import demoImg from "../../assets/demoIMG.png";

export default function HomeLibraryCard({
  id,
  title,
  category,
  month,
  year,
  isMonthlyEdition,
}) {
  const navigate = useNavigate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <section
      className="max-w-coverImage flex flex-col gap-4 rounded-xl items-start hover:cursor-pointer p-6
        transform transition-transform duration-300 ease-in-out  hover:shadow-card_shadow hover:-translate-y-4 "
      onClick={() => {
        if (isMonthlyEdition) {
          navigate(`/coherenceapplied/${id}`); // Navigate to CoherenceAppliedPage
        } else {
          navigate(`/article/${id}`); // Navigate to ArticlePage
        }
      }}
    >
      <img
        src={demoImg}
        alt="img"
        className="rounded-xl min-w-coverImage h-coverImage"
      />
      <p className="w-coverImage text-2xl font-semibold text-important_text align-middle line-clamp-1">
        {title}
      </p>
      <p className="text-lg font-bold">{category}</p>
      <p className="text-sm">{`${months[month]} ${year}`}</p>
    </section>
  );
}
