import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import SignupPage from "./pages/SignUpPage";
import SigninPage from "./pages/SigninPage";
import DashboardPage from "./pages/DashboardPage";
import ItineraryMapPage from "./pages/ItineraryMapPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/itinerary_page" element={<ItineraryMapPage />} />
    </Routes>
  );
}
