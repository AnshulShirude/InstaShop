import React from 'react';
import { useLocation } from "react-router-dom";

function MapPage() {
    const location = useLocation();
    const { aisleNumbers } = location.state || {};
    return (
        <div>
          <h1>Map Page</h1>
          {aisleNumbers ? (
            <div>
              <h2>Aisle Numbers:</h2>
              <ul>
                {aisleNumbers.map((aisleNumber, index) => (
                  <li key={index}>{aisleNumber}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No aisle numbers found.</p>
          )}
        </div>
      );
    }

export default MapPage;
