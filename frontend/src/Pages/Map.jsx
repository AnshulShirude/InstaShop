import React from "react";
import { useLocation } from "react-router-dom";
import MasterGraph from "../Components/MasterGraph";

function MapPage() {
  const location = useLocation();
  const { aisleNumbers } = location.state || {};
  return (
    <div>
      <h1>Map Page</h1>
      <div>
        <h2>Aisle Numbers:</h2>
        <ul>
          {/* {aisleNumbers.map((aisleNumber, index) => (
            <li key={index}>{aisleNumber}</li>
          ))} */}
        </ul>
      </div>
      <MasterGraph />
    </div>
  );
}

export default MapPage;
