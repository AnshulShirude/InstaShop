import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import AddItems from "./Pages/AddItems";
import MapPage from "./Pages/Map";
import HomePage from "./Pages/Homepage";

let nodes;
let setNodes = () => {};
export const NodesContext = createContext({ nodes, setNodes });

function App() {
  //first we do not have any nodes to set
  const [nodes, setNodes] = useState(null);
  return (
    <NodesContext.Provider value={{ nodes, setNodes }}>
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
    </NodesContext.Provider>
  );
}

export default App;
