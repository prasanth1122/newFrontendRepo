import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import ArticleCard from "../components/articlesCard/articleCard";
import demoImg from "../assets/demoIMG.png";
import {
  fetchPeriodicalById,
  clearPeriodicalState,
} from "../store/redux/slices/periodicalbyidSlice.jsx";
import { useGlobalContext } from "../store/context/globalContext";

export default function PeriodicalPage() {
  const { id } = useParams(); // Get 'id' from the URL
  const dispatch = useDispatch();
  const { periodical, loading, error } = useSelector(
    (state) => state.periodicalid
  ); // Access Redux state
  const { isSidebarOpen } = useGlobalContext();

  useEffect(() => {
    // Fetch periodical by ID
    dispatch(fetchPeriodicalById(id));

    // Clear state when unmounting
    return () => {
      dispatch(clearPeriodicalState());
    };
  }, [dispatch, id]);
  useEffect(() => {
    console.log(periodical);
  }, [periodical]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!periodical) {
    return <p>No periodical found.</p>;
  }

  const { title, introduction, category, image, author, month, year, tags } =
    periodical.data;

  return (
    <section className="w-screen h-screen flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth h-full mt-20 flex flex-col items-center gap-4">
        <section className="w-full rounded-xl  bg-[#2c2c2c] py-4 h-auto flex text-white justify-center">
          <div className="w-mainWidth flex flex-col-reverse items-center md:flex-row md:items-start gap-6 md:justify-between">
            <img
              src={demoImg}
              className="w-coverImage rounded-xl h-coverImage"
              alt={title}
            />
            <div className="w-full flex flex-col items-center md:items-start md:gap-4 lg:gap-8 gap-4">
              <p className="text-2xl md:text-4xl font-bold">{title}</p>
              <p className="text-sm lg:text-lg" style={{ lineHeight: "1.2" }}>
                {introduction}
              </p>
              <p>{author}</p>
              <p className="px-4 py-2 border-2 border-black bg-white rounded-lg text-black">
                {category}
              </p>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center gap-2">
          <p className="text-2xl font-bold">
            Monthly Edition: {`${month}/${year}`}
          </p>
          <p className="text-lg">Highlights of the month.</p>
        </section>
        <section className="w-full flex flex-col items-center gap-4 mt-2 pb-8 ">
          {/* Render article cards dynamically */}
          {periodical.data.articles?.map((article) => (
            <ArticleCard
              key={article.articleId}
              id={article.articleId}
              article={article}
              parentcategory={category}
            />
          ))}
        </section>
      </main>
    </section>
  );
}
