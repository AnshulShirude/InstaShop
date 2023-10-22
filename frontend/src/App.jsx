import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import AddItems from "./Pages/AddItems";
import MapPage from "./Pages/Map";
import HomePage from "./Pages/Homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-items" element={<AddItems />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </Sidebar>
      </div>
    </Router>
  );
}

export default App;
