import React, { createContext, useState, useContext } from "react";

// Create a context for managing global states
const GlobalContext = createContext();

// Custom hook to use the global context
export const useGlobalContext = () => useContext(GlobalContext);

// Provider component to wrap around the app and provide the context
export const GlobalProvider = ({ children }) => {
  // Sidebar state management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  const toggleCollectionbar = () => {
    setIsCardOpen((prevState) => !prevState);
  };
  // Here, you can add other states and their corresponding functions
  // For example, a modal, notifications, user info, etc.

  // Context value object
  const contextValue = {
    isSidebarOpen,
    toggleSidebar,
    isCardOpen,
    toggleCollectionbar,
    // Add more states or functions here if needed
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
