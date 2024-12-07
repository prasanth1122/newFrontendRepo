import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/navbar/navbar";
import { fetchPeriodicals } from "../store/redux/slices/periodicalSlice.jsx";
import LoadingComponent from "../components/loadingComponent/loadingComponent.jsx";
import demoImg from "../assets/demoIMG.png";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import { GiDna2 } from "react-icons/gi";
import { RiComputerFill } from "react-icons/ri";
import { IoIosPricetag } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import Trending from "../components/trendingJournlas/trending.jsx";
import SampleCard from "../components/libraryCard/sampleCard.jsx";

import PeriodicalCard from "../components/libraryCard/periodicalCard.jsx";

export default function HomePage() {
  const { periodicals, loading, error } = useSelector(
    (state) => state.periodicals
  );
  const [pData, setPData] = useState([]);
  const { isSidebarOpen } = useGlobalContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    dispatch(fetchPeriodicals());
  }, [dispatch]);

  useEffect(() => {
    setPData(periodicals?.data);
    console.log(pData);
  }, [periodicals, pData, artData]);
  if (loading) return <LoadingComponent />;
  if (error) return <div>Error loading article data.</div>;

  return (
    <section className="w-full  h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar included here */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      {/* Main Content */}
      <main className="w-full mt-20 flex flex-col items-center">
        {/* Intro Section */}
        <section className="w-mainWidth rounded-xl mt-1  bg-[#2c2c2c] py-8 h-auto flex text-white justify-center">
          <div className="w-mainWidth flex flex-col-reverse items-center md:flex-row md:items-start gap-6 md:justify-between">
            <div className="w-full md:h-coverImage md:w-2/3 flex flex-col items-center md:items-start md:gap-4 lg:gap-8 gap-4">
              <p className="text-2xl md:text-4xl font-bold ">
                Coherence Applied
              </p>
              <p className="text-sm lg:text-lg" style={{ lineHeight: "1.2" }}>
                Coherence Applied is a periodical released monthly by the
                coherence editorial board collecting the scientific and
                technological development happened across the globe in the last
                90 days and communicating it to the audience in a very simple
                comprehensive and concise form.
              </p>
              <div className="w-full flex flex-row flex-wrap gap-4 lg:gap-8 text-white">
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <FaGlobe style={{ width: "20px", height: "20px" }} />
                  Nature
                </p>
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <GiDna2 style={{ width: "20px", height: "20px" }} />
                  Medical
                </p>
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <RiComputerFill style={{ width: "20px", height: "20px" }} />
                  Computers
                </p>
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <IoIosPricetag style={{ width: "20px", height: "20px" }} />
                  Economics
                </p>
              </div>
              <div className="flex flex-col items-start w-full gap-4 md:flex-row">
                <button
                  className="px-4 py-2 md:text-sm lg:text-lg bg-secondary rounded-lg text-lg font-semibold flex items-center gap-4 group"
                  onClick={() => {
                    navigate("/store");
                  }}
                >
                  Visit Store
                  <FaArrowRight
                    style={{ width: "25px" }}
                    className="transition-transform duration-300 group-hover:-rotate-45"
                  />
                </button>
              </div>
            </div>
            <img
              src={demoImg}
              className="w-coverImage rounded-xl h-coverImage"
            />
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="w-mainWidth bg-terinary  mt-4 rounded-lg p-4">
          <div className="w-full flex items-center justify-between ">
            <p className="text-2xl font-bold ">Latest Articles</p>
            <p
              className="flex items-center gap-4 text-lg hover:underline hover:text-secondary text-important_text hover:cursor-pointer"
              onClick={() => {
                navigate("/store");
              }}
            >
              See All <ArrowRight />
            </p>
          </div>

          <div className="w-full flex items-start gap-4 overflow-x-auto mt-4 scrollbar-hide ">
            {pData?.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {pData.map((periodical) => (
                  <PeriodicalCard
                    key={periodical._id}
                    id={periodical._id}
                    title={periodical.title}
                    category={periodical.category}
                    month={periodical.month}
                    year={periodical.year}
                  />
                ))}
              </div>
            ) : (
              <p>No periodicals available this month.</p>
            )}
          </div>
        </section>

        {/* Saved Articles Section */}

        <section className="w-mainWidth  py-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-2xl font-bold ">
              Trending Articles and Journals
            </p>
            <p className="flex items-center gap-4 text-lg hover:underline hover:text-secondary text-important_text hover:cursor-pointer">
              See All <ArrowRight />
            </p>
          </div>

          <div className="w-full flex p-2 items-start gap-8 overflow-x-auto mt-4 scrollbar-hide">
            {pData?.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {pData[0]?.articles.map((article) => (
                  <Trending
                    id={article.articleId._id}
                    key={article.articleId._id}
                    category={article.articleId.category}
                    title={article.articleId.title}
                    value={article.articleId.valueProposition}
                  />
                ))}
              </div>
            ) : (
              <p>No periodicals available this month.</p>
            )}
          </div>
        </section>
      </main>
    </section>
  );
}
