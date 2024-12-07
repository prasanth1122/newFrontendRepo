import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { useEffect, useState } from "react";
import { getLikedArticles } from "../../Api/Api.js"; // Adjust the import path if necessary
import LibCard from "../components/libraryCard/libCard.jsx"; // Adjust path as needed

export default function ThisMonth() {
  const { isSidebarOpen } = useGlobalContext();
  const [likedArticles, setLikedArticles] = useState([]);
  const [thisMonthLikedArticles, setThisMonthLikedArticles] = useState([]);
  const userId = localStorage.getItem("user"); // Adjust to match your storage format

  useEffect(() => {
    const fetchLikedArticles = async () => {
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const { likedArticles } = await getLikedArticles(userId); // Fetch all liked articles
        setLikedArticles(likedArticles);

        // Filter articles liked this month
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const filteredArticles = likedArticles.filter((article) => {
          const likedDate = new Date(article.likedAt);
          return (
            likedDate.getFullYear() === currentYear &&
            likedDate.getMonth() === currentMonth
          );
        });

        setThisMonthLikedArticles(filteredArticles);
      } catch (error) {
        console.error("Failed to fetch liked articles:", error);
      }
    };

    fetchLikedArticles();
  }, [userId]);

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      {/* Main Content */}
      <main className="w-mainWidth mt-20 flex flex-col items-center">
        <p className="text-2xl w-full font-bold mt-2 text-important_text">
          Articles Liked This Month
        </p>
        {thisMonthLikedArticles.length > 0 ? (
          <div className="w-full flex items-start gap-4 mt-4 flex-wrap">
            {thisMonthLikedArticles.map((article) => (
              <LibCard
                key={article.articleId._id}
                id={article.articleId._id}
                title={article.articleId.title}
                category={article.articleId.category}
                month={new Date(article.likedAt).getMonth() + 1} // Month index adjustment
                year={new Date(article.likedAt).getFullYear()}
              />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 mt-4">
            No articles liked this month.
          </p>
        )}
      </main>
    </section>
  );
}
