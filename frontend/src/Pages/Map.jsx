import React from "react";
import { useLocation } from "react-router-dom";
import MasterGraph from "../Components/MasterGraph";

function MapPage() {
  const location = useLocation();
  const { aisleNumbers } = location.state || {};
  return (
    <div>
      <h1>Map Page</h1>
      <MasterGraph />
    </div>
  );
}

export default MapPage;
