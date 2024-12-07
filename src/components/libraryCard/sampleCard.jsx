import { useNavigate } from "react-router-dom";
import demoImg from "../../assets/demoIMG.png";

export default function SampleCard() {
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
      className="max-w-coverImage flex flex-col gap-4 rounded-xl items-start hover:cursor-pointer 
        transform transition-transform duration-300 ease-in-out  hover:shadow-card_shadow hover:-translate-y-4 "
    >
      <img
        src={demoImg}
        alt="img"
        className="rounded-xl min-w-coverImage h-coverImage"
      />
      <p className="w-coverImage text-2xl font-semibold text-important_text align-middle line-clamp-1">
        "Sample Periodical"
      </p>
      <p className="text-lg font-bold">Medical</p>
      <p className="text-sm">02 Dec 2024</p>
    </section>
  );
}
