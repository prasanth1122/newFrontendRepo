import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import demoImg from "../../assets/demoIMG.png";

export default function PeriodicalCard({ id, title, category, month, year }) {
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
  const formattedCategory = category.toLowerCase().replace(/\s+/g, "");
  return (
    <div
      className="rounded-lg flex flex-col gap-2 items-center hover:cursor-pointer 
        "
      onClick={() => {
        navigate(`/${formattedCategory}/${id}`);
      }}
      // Navigate to the PeriodicalPage
    >
      {/* Wrapper to control image hover effect */}
      <div className="w-coverImage h-coverImage rounded-xl my-2 overflow-hidden">
        <img
          src={demoImg} // Placeholder for image
          alt={title}
          className="w-full h-full rounded-xl  transition-transform duration-300 ease-in-out hover:-translate-y-2"
        />
      </div>

      <h2
        className="text-2xl font-semibold mt-4 text-important_text text-center line-clamp-1"
        title={title}
      >
        {title}
      </h2>

      <p className="text-lg text-gray-600">{category}</p>
      <p className="text-sm text-gray-500">
        {months[month - 1]} {year}
      </p>
    </div>
  );
}

PeriodicalCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
