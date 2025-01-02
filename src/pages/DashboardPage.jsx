import React from "react";

import ItinerariesList from "../components/dashboard/ItinerariesList";
import { DashboardNavbar } from "../components/dashboard/DashboardNavbar";

export default function DashboardPage() {
  return (
    <div className="page gap-8 max-w-screen-xl">
      <DashboardNavbar />

      <ItinerariesList />
    </div>
  );
}
