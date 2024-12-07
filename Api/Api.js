import axios from "axios";
import { jwtDecode } from "jwt-decode";
const url = "http://localhost:5000/api";

// Create an Axios instance
const api = axios.create({
  baseURL: url, // Your backend URL
});

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Returns true if expired
  } catch (error) {
    console.error("Error decoding token", error);
    return true; // Treat invalid tokens as expired
  }
};

// Request interceptor to add the JWT token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        console.warn("Token expired. Removing from local storage.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const createOrder = async (amount) => {
  try {
    const response = await api.post("/payment/order", { amount });
    return response.data;
  } catch (error) {
    console.error("Create order failed", error);
    throw error; // Throwing error to be handled by caller
  }
};

export const capturePayment = async (paymentId, amount) => {
  try {
    const response = await api.post("/payment/capture-payment", {
      paymentId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Capture payment failed", error);
    throw error; // Throwing error to be handled by caller
  }
};

export const verifyPayment = async (paymentId, orderId, signature) => {
  try {
    const response = await api.post("/payment/verify-payment", {
      paymentId,
      orderId,
      signature,
    });
    return response.data;
  } catch (error) {
    console.error("Verify payment failed", error);
    throw error; // Throwing error to be handled by caller
  }
};
// Function to handle login
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error; // Throwing error to be handled by caller
  }
};

// Function to handle signup
export const signup = async (
  name,
  email,
  password,
  role,
  userType,
  institution
) => {
  try {
    const response = await api.post("/users/signup", {
      name,
      email,
      password,
      role,
      userType,
      institution,
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed", error);
    throw error; // Throwing error to be handled by caller
  }
};
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Function to update a user by ID
export const updateUserById = async (id, updates) => {
  try {
    const response = await api.patch(`/users/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating user by ID:", error);
    throw error;
  }
};
export const checkEmail = async (email) => {
  try {
    const response = await api.post("/users/checkemail", { email });
    return response.data; // { exists: true/false, message: string }
  } catch (error) {
    console.error(
      "Error checking email:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addComment = async (articleId, userId, text) => {
  try {
    const response = await api.post(`/comments/${articleId}`, { userId, text });
    return response.data;
  } catch (error) {
    console.error("Failed to add comment", error);
    throw error; // Throwing error to be handled by caller
  }
};
// Fetch user's active subscription

export const addArticleToCollection = async (
  userId,
  collectionName,
  articleId
) => {
  try {
    const response = await api.post("/collection/addarticle", {
      userId,
      collectionName,
      articleId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding article to collection:", error);
    throw error;
  }
};

// Function to get all collections for a user
export const getAllCollectionsForUser = async (userId) => {
  try {
    const response = await api.get(`/collection/allcollections/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving collections:", error);
    throw error;
  }
};

// Function to get a specific collection by name for a user
export const getCollectionByName = async (userId, collectionName) => {
  try {
    const response = await api.get(
      `/collection/collections/${userId}/${collectionName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving collection:", error);
    throw error;
  }
};
export const getCollectionByIdForUser = async (userId, collectionId) => {
  try {
    // Make a GET request to the endpoint
    const response = await api.get(`/collection/${userId}/${collectionId}`);
    return response.data; // Return the collection data
  } catch (error) {
    console.error("Error fetching collection by ID for user", error);
    throw error; // Throwing error to be handled by caller
  }
};
// Function to get all collection names for a user
export const getCollectionNamesForUser = async (userId) => {
  try {
    const response = await api.get(`/collection/collectionnames/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving collection names:", error);
    throw error;
  }
};

// Function to check if an article is saved in any collection
export const isArticleSavedInAnyCollection = async (userId, articleId) => {
  try {
    const response = await api.get(
      `/collection/is-article-saved/${userId}/${articleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking article status:", error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await api.get(`/periodical/editorial/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article by ID:", error);
    throw error;
  }
};

export const getAllArticles = async () => {
  try {
    const response = await api.get("/periodical/editorial");
    return response.data; // Return the list of articles
  } catch (error) {
    console.error("Failed to fetch all articles:", error);
    throw error;
  }
};

export const getPeriodicalById = async (id) => {
  try {
    const response = await api.get(`/periodical/periodicals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch periodical by ID:", error);
    throw error;
  }
};

export const getAllPeriodicals = async () => {
  try {
    const response = await api.get("/periodical/periodicals");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all periodicals:", error);
    throw error;
  }
};
// Function to handle logout
export const logout = async () => {
  try {
    await api.post("/logout");
    // Clear the token and refresh token from cookies
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout failed", error);
    throw error; // Handle logout error
  }
};

// Like an article
export const likeArticle = async (userId, articleId) => {
  try {
    const response = await api.post("/likedislike/like", { userId, articleId });
    return response.data; // Success message
  } catch (error) {
    console.error(
      "Failed to like article:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Dislike an article
export const dislikeArticle = async (userId, articleId) => {
  try {
    const response = await api.post("/likedislike/dislike", {
      userId,
      articleId,
    });
    return response.data; // Success message
  } catch (error) {
    console.error(
      "Failed to dislike article:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Check article status (liked, disliked, or neither)
export const checkArticleStatus = async (userId, articleId) => {
  try {
    const response = await api.get("/likedislike/status", {
      params: { userId, articleId },
    });
    return response.data; // { status: "liked" | "disliked" | "neither" }
  } catch (error) {
    console.error(
      "Failed to check article status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getLikedArticles = async (userId) => {
  try {
    const response = await api.get(`/likedislike/liked/${userId}`); // Adjusted endpoint
    return response.data;
  } catch (error) {
    console.error("Get liked articles failed", error);
    throw error;
  }
};
// Create or update a subscription
export const createOrUpdateSubscription = async (
  userId,
  type,
  paymentStatus
) => {
  try {
    const response = await api.post("/subscriptions", {
      userId,
      type,
      paymentStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create or update subscription:", error);
    throw error;
  }
};

// Get the user's active subscription
export const getUserSubscription = async (userId) => {
  try {
    const response = await api.get(`/subscriptions/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user's active subscription:", error);
    throw error;
  }
};

export const createFreeSubscription = async (userId) => {
  try {
    const response = await api.post("/subscriptions/createfree", {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create free subscription:", error);
    throw error;
  }
};
// Cancel a subscription
export const addCommentToArticle = async (articleId, userId, text) => {
  try {
    const response = await api.post(`/comment/${articleId}`, {
      userId,
      text,
    });
    return response.data; // Return the response after successfully adding the comment
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error; // Handle the error appropriately
  }
};
export const isArticleSaved = async (userId, articleId) => {
  try {
    const response = await api.get(
      `/library/checkSavedArticle/${userId}/${articleId}`
    );
    return response.data; // Return the result (saved or not)
  } catch (error) {
    console.error("Failed to check if article is saved:", error);
    throw error;
  }
};
export const saveArticle = async (
  userId,
  articleId,
  title,
  category,
  month,
  year,
  isMonthlyEdition
) => {
  try {
    const response = await api.post(`/library/${userId}/save`, {
      articleId,
      title,
      category,
      month,
      year,
      isMonthlyEdition,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save article:", error);
    throw error;
  }
};

// Function to unsave an article
export const unsaveArticle = async (userId, articleId) => {
  try {
    const response = await api.delete(`/library/${userId}/unsave`, {
      data: { articleId }, // Send articleId in request body
    });
    return response.data;
  } catch (error) {
    console.error("Failed to unsave article:", error);
    throw error;
  }
};

// Function to get saved articles
export const getSavedArticles = async (userId) => {
  try {
    const response = await api.get(`/library/${userId}/savedarticles`);
    return response.data; // Return saved articles
  } catch (error) {
    console.error("Failed to fetch saved articles:", error);
    throw error;
  }
};

// Export the API instance
export default api;
