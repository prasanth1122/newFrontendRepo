import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // For accessing URL params
import { fetchArticleById } from "../store/redux/slices/articleSlice.jsx";
import { FaShareAlt } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { FaBookBookmark } from "react-icons/fa6";
import Comments from "../components/comments/comments.jsx";
import { addComment } from "../../Api/Api.js";
import { fetchPeriodicalById } from "../store/redux/slices/periodicalbyidSlice.jsx";
import SimilarArticleCard from "../components/similarArticle/similarArticleCard.jsx";
import {
  isArticleSavedInAnyCollection, // Import the function
} from "../../Api/Api.js";
import {
  checkArticleStatus,
  likeArticle,
  dislikeArticle,
} from "../../Api/Api.js";

import CollectionSection from "../components/collectionSection/collectionSection.jsx";
export default function ArticleReader() {
  const { isSidebarOpen, isCardOpen, toggleCollectionbar } = useGlobalContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const { article, loading, error } = useSelector((state) => state.article);
  const userId = localStorage.getItem("user");
  const { periodical } = useSelector((state) => state.periodicalid);
  const [isCard, setIscard] = useState(false);
  const [status, setStatus] = useState("neither"); // "liked" | "disliked" | "neither"
  const [loadingStatus, setLoadingStatus] = useState(false); // To disable buttons while updating
  const [isArticleSaved, setIsArticleSaved] = useState(false); // State for article status
  // Fetch the current article's status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await checkArticleStatus(userId, id);
        console.log(response);
        setStatus(response.status);
      } catch (error) {
        console.error("Error checking article status:", error);
      }
    };

    if (userId && id) fetchStatus();
  }, [userId, id]);

  const handleLike = async () => {
    try {
      setLoadingStatus(true);
      await likeArticle(userId, id);
      setStatus("liked"); // Update UI to show "liked"
    } catch (error) {
      console.error("Error liking article:", error);
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleDislike = async () => {
    try {
      setLoadingStatus(true);
      await dislikeArticle(userId, id);
      setStatus("disliked"); // Update UI to show "disliked"
    } catch (error) {
      console.error("Error disliking article:", error);
    } finally {
      setLoadingStatus(false);
    }
  };
  const checkIfArticleSaved = async () => {
    try {
      const data = await isArticleSavedInAnyCollection(userId, id);
      console.log(data);
      setIsArticleSaved(data.saved);
    } catch (error) {
      console.error("Error checking if article is saved:", error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));

      // Clear state when unmounting
    }
    checkIfArticleSaved();
  }, [dispatch, id]);

  useEffect(() => {
    if (article) {
      dispatch(fetchPeriodicalById(article.data.periodicalId));
    }

    if (error) {
      console.error("Error fetching article:", error);
    }
  }, [article, error]);

  useEffect(() => {
    if (periodical) {
      console.log(periodical);
    }

    if (error) {
      console.error("Error fetching article:", error);
    }
  }, [periodical, error]);

  const formatDate = (month, year) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${month < 10 ? `0${month}` : month} ${months[month - 1]} ${year}`;
  };

  const handlePostComment = async () => {
    if (newComment.trim()) {
      try {
        await addComment(id, userId, newComment); // Post the comment
        dispatch(fetchArticleById(id)); // Re-fetch the article with updated comments
        setNewComment(""); // Clear the input field
      } catch (error) {
        console.error("Failed to post comment:", error);
      }
    }
  };

  return (
    <section className="w-full relative  h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {isCardOpen && <CollectionSection articleId={id} isCard={isCard} />}
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth mt-24 flex flex-col items-center gap-4">
        <section className="w-full h-44 flex flex-col items-start lg:flex-row lg:items-start lg:gap-4">
          <section className="w-full lg:w-2/3 h-full bg-highlight_background rounded-xl p-4 flex flex-col items-start justify-between">
            <p className="text-2xl font-bold text-important_text">
              {article?.data.title}
            </p>
            <p className="text-base">{article?.data.relevence}</p>
            <div className="flex items-center gap-8">
              {article?.data.tags.map((tag, index) => (
                <p key={index} className="bg-terinary px-2 py-1 rounded-lg">
                  {tag}
                </p>
              ))}
            </div>
          </section>
          <section className="w-full lg:flex-1 lg:w-0 lg:ml-4 p-4 h-full bg-terinary rounded-xl flexflex-col items-start justify-between">
            <p className="text-lg font-bold">Multiple</p>
            <p className="text-base">IEEE & Nature</p>
            <p className="text-base">Cite : {article?.data.cite}</p>
          </section>
        </section>
        <section className="w-full flex flex-col items-start lg:flex-row lg:items-start min-h-96">
          <section className="w-full lg:w-2/3 flex flex-col items-start gap-4">
            <div className="w-full min-h-36 rounded-xl bg-important_text shadow-card_shadow text-white p-4">
              {article?.data.valueProposition}
            </div>
            <div className="w-full h-[450px] rounded-xl bg-highlight_background border-2"></div>
          </section>
          <section className="w-full lg:flex-1 lg:w-0 lg:ml-4  p-4 h-full bg-highlight_background rounded-xl flex flex-col items-start gap-4">
            <div className="flex w-full items-center gap-8 bg-white rounded-xl p-4">
              <button
                onClick={handleLike}
                disabled={loadingStatus}
                style={{
                  width: "25px",
                  cursor: loadingStatus ? "not-allowed" : "pointer",
                }}
              >
                <AiOutlineLike color={status === "liked" ? "green" : "black"} />
              </button>
              <button
                onClick={handleDislike}
                disabled={loadingStatus}
                style={{
                  width: "25px",
                  cursor: loadingStatus ? "not-allowed" : "pointer",
                }}
              >
                <AiOutlineDislike
                  color={status === "disliked" ? "red" : "black"}
                />
              </button>
              <FaShareAlt style={{ fill: "black", width: "25px" }} />
              <FaBookBookmark
                style={{
                  fill: isArticleSaved ? "green" : "black",
                  width: "25px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (!isArticleSaved) {
                    toggleCollectionbar();
                  }
                  // Optionally, handle bookmark toggle logic here
                }}
              />
            </div>
            <p className="text-2xl font-bold">Similar Articles</p>
            <div className="flex-1 w-full max-h-96 overflow-y-scroll flex flex-col gap-4 scrollbar-hide">
              {periodical?.data.articles
                ?.filter((article) => article.articleId !== id) // Exclude the current article
                .map((article) => (
                  <SimilarArticleCard
                    id={article.articleId}
                    key={article.articleId}
                    title={article.title}
                    category={article.category}
                    month={article.month}
                    year={article.year}
                    formattedDate={formatDate(article.month, article.year)}
                  />
                ))}
            </div>
          </section>
        </section>
        <section className="w-full flex flex-col items-center gap-4 bg-highlight_background p-4 rounded-xl">
          <p className="text-2xl font-bold w-full">Comments:</p>
          <div className="w-full flex items-center gap-8">
            <input
              className="w-2/3 rounded-lg bg-white text-lg border-2 border-black-500 py-2 px-2 shadow-input_shadow"
              type="text"
              placeholder="Enter your comment"
              onChange={(e) => setNewComment(e.target.value)} // Update the comment text
            />
            <p
              className="text-lg font-bold text-white rounded-xl bg-secondary px-4 py-2 hover:cursor-pointer hover:shadow-cta_button_shadow"
              onClick={handlePostComment}
            >
              Comment
            </p>
          </div>
          <div className="w-full flex flex-col items-start gap-4 mt-2">
            {/* Map through comments in reverse order */}
            {article?.data.comments
              ?.slice()
              .reverse()
              .map((comment) => (
                <Comments
                  key={comment._id}
                  name={comment.username}
                  comment={comment.text}
                />
              ))}
          </div>
        </section>
      </main>
    </section>
  );
}
