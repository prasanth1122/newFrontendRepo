import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import LibCard from "../components/libraryCard/libCard.jsx"; // Assuming you have a LibCard component
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { getAllCollectionsForUser } from "../../Api/Api.js";

export default function CollectionPage() {
  const { id } = useParams(); // Extract collectionId from URL
  const user = localStorage.getItem("user"); // Parse user data from localStorage
  const { isSidebarOpen } = useGlobalContext();
  const [collection, setCollection] = useState(null); // State for collection data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch collection data
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const data = await getAllCollectionsForUser(user); // Fetch collection

        console.log(data);
        const matchedCollection = data.collections.find(
          (col) => col._id === id
        ); // Find collection with matching ID
        setCollection(matchedCollection);
      } catch (err) {
        console.error("Error fetching collection:", err);
        setError("Failed to load collection data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [user._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />

      {/* Main Content */}
      <main className="w-full mt-20 flex flex-col items-center">
        <p className="w-mainWidth mt-2 text-2xl font-bold text-important_text">
          Collection: {collection.name || "Collection Name"}
        </p>
        <div className="w-mainWidth mt-4 flex items-start gap-4 flex-wrap">
          {collection.articles.map((article) => (
            <LibCard
              key={article.articleId}
              id={article.articleId}
              title={article.title}
              category={article.category}
              month={article.month}
              year={article.year}
            />
          ))}
        </div>
      </main>
    </section>
  );
}
