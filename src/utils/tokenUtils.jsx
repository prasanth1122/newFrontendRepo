import * as jwtDecode from "jwt-decode";

// Function to decode the JWT token and check if it has expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    console.log(decodedToken.exp < currentTime);
    return decodedToken.exp < currentTime; // Return true if expired
  } catch (error) {
    return true;
  }
};

// Function to check the token and remove it if expired
export const checkAuthToken = () => {
  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    localStorage.removeItem("token"); // Remove expired token
    // window.location.href = "/login"; // Redirect to login
  }
};
