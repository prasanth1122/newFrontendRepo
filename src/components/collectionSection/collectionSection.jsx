import { useEffect, useState } from "react";
import {
  getCollectionNamesForUser,
  addArticleToCollection,
} from "../../../Api/Api.js"; // Adjust the path as needed
import { GiCancel } from "react-icons/gi";
import { useGlobalContext } from "../../store/context/globalContext.jsx";
export default function CollectionSection({ articleId, isCard }) {
  const [collectionNames, setCollectionNames] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("user"); // Assuming user ID is stored in localStorage
  const { isCardOpen, toggleCollectionbar } = useGlobalContext();

  // Fetch collection names when the component loads
  useEffect(() => {
    fetchCollections();
  }, [userId]);

  const fetchCollections = async () => {
    try {
      if (userId) {
        const data = await getCollectionNamesForUser(userId);
        console.log(data);
        setCollectionNames(data.collectionNames || []);
      }
    } catch (error) {
      console.error("Error fetching collection names:", error);
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      setErrorMessage("Collection name cannot be empty");
      return;
    }
    if (collectionNames.includes(newCollectionName)) {
      setErrorMessage("Collection already exists");
      return;
    }

    try {
      const response = await addArticleToCollection(
        userId,
        newCollectionName,
        articleId
      );
      console.log(response);
      alert("Collection created and article added successfully");

      // Update state after successful creation
      setNewCollectionName(""); // Clear the input field
      setErrorMessage(""); // Clear any previous error
      setSelectedCollection(newCollectionName); // Set the newly created collection as selected
      await fetchCollections(); // Refresh the collection list
    } catch (error) {
      console.error("Error adding article to collection:", error);
      alert("Failed to add the article to the collection");
    }
  };

  const handleAddArticle = async () => {
    if (!selectedCollection) {
      alert("Please select a collection");
      return;
    }
    if (!articleId.trim()) {
      alert("Article ID is missing");
      return;
    }

    try {
      const response = await addArticleToCollection(
        userId,
        selectedCollection,
        articleId
      );
      console.log(response);
      toggleCollectionbar();
      window.location.reload();
      alert("Article added to the collection successfully");
    } catch (error) {
      console.error("Error adding article to collection:", error);
      alert("Failed to add the article to the collection");
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  return (
    <section className="absolute z-20 w-screen h-full flex flex-col items-center justify-center bg-gray-100 bg-opacity-15">
      <div className="w-96 h-auto flex flex-col items-center gap-8 absolute z-10 bg-white shadow-lg p-6 rounded-xl ">
        <h2 className="text-xl font-bold">Manage Collections</h2>
        <div className="absolute top-4 right-4" onClick={toggleCollectionbar}>
          <GiCancel style={{ width: "30px" }} />
        </div>

        {/* Dropdown for existing collections */}
        <div className="w-full">
          <label
            htmlFor="collections"
            className="block text-lg font-semibold mb-2"
          >
            Select a Collection
          </label>
          <select
            id="collections"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedCollection}
            onChange={handleDropdownChange}
          >
            <option value="" disabled>
              -- Select a Collection --
            </option>
            {collectionNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Input for new collection */}
        <div className="w-full">
          <label
            htmlFor="newCollection"
            className="block text-lg font-semibold mb-2"
          >
            Add a New Collection
          </label>
          <input
            id="newCollection"
            type="text"
            placeholder="Enter collection name"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <button
            onClick={handleCreateCollection}
            className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Create Collection
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>

        {/* Button to add article */}
        <button
          onClick={handleAddArticle}
          className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add Article to Collection
        </button>
      </div>
    </section>
  );
}
