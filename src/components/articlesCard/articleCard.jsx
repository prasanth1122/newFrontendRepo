import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import demoImg from "../../assets/demoIMG.png";

export default function ArticleCard({ article, parentCategory, id }) {
  const { title, author, category, image, month, year } = article;
  const navigate = useNavigate();

  // Month names
  const monthNames = [
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

  const handleCardClick = () => {
    const formattedCategory = (parentCategory || "")
      .toLowerCase()
      .replace(/\s+/g, "");
    navigate(`/article/${id}`);
  };

  return (
    <section className="w-full h-36 border-2 hover:border-0 hover:shadow-card_shadow  bg-highlight_background hover:bg-terinary rounded-xl  p-2 flex items-center justify-between ">
      <img className="w-36 h-full rounded-xl" src={demoImg} alt={title} />
      <div className="h-full flex flex-col items-start justify-between">
        <p className="text-lg font-bold max-w-1/2">{title}</p>
        <p>{author}</p>
        <p className="text-base font-bold">{category}</p>
      </div>
      <div className="text-base font-bold">
        {monthNames[month - 1]} {year}
      </div>
      <button
        className="px-4 py-2 font-bold text-lg text-white rounded-lg hover:shadow-cta_button_shadow bg-secondary"
        onClick={handleCardClick}
      >
        Access
      </button>
    </section>
  );
}

// PropTypes Validation
ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  parentCategory: PropTypes.string,
  id: PropTypes.string.isRequired,
};
