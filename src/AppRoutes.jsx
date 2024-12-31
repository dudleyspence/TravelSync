import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import DashboardPage from "./pages/DashboardPage";
import ItineraryMapPage from "./pages/ItineraryMapPage";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/itinerary_page"
        element={
          <ProtectedRoutes>
            <ItineraryMapPage />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
