import React from "react";
import MasterGraph from "../Components/MasterGraph";
import styles from "../App.css";

function MapPage() {
  const graphStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div>
      <h1>Map</h1>
      <p>The map is shown below:</p>
      <div style={graphStyle}>
        <MasterGraph />
      </div>
    </div>
  );
}

export default MapPage;
