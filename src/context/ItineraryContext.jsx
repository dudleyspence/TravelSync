import React, { createContext, useState, useContext, useEffect } from "react";

const ItineraryContext = createContext();

export function useItinerary() {
  return useContext(ItineraryContext);
}

export function ItineraryContextProvider({ children }) {
  const [currentItinerary, setCurrentItinerary] = useState(() => {
    const storedItinerary = localStorage.getItem("currentItinerary");
    return storedItinerary ? JSON.parse(storedItinerary) : null;
  });

  useEffect(() => {
    localStorage.setItem("currentItinerary", JSON.stringify(currentItinerary));
  }, [currentItinerary]);

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
