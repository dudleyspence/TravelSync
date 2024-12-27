import React, { createContext, useState, useContext } from "react";

const ItineraryContext = createContext();

export function useItinerary() {
  return useContext(ItineraryContext);
}

export function ItineraryContextProvider({ children }) {
  const [currentItinerary, setCurrentItinerary] = useState(null);

  const value = {
    currentItinerary,
    setCurrentItinerary,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
}