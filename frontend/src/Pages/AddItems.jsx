import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { NodesContext } from "../App";
import { NavLink } from "react-router-dom";

function AddItems() {
  const [inputValue, setInputValue] = useState("");
  const [storedValues, setStoredValues] = useState([]);
  const [aisleLoading, setAisleLoading] = useState(false);
  const [foodAisleMap, setFoodAisleMap] = useState({});
  const { setNodes } = useContext(NodesContext);
  // Oopsie lol
  const key = "0CC42161E0A649A2AC3625E7CE64A56E";

  // Predefined local map of 20 food items and their aisle numbers
  const LOCAL_FOOD_AISLE_MAP = {
    beef: "C9",
    chicken: "C9",
    goldfish: "D23", // USING
    "fruit snacks": "C10",
    ham: "D24", 
    cheese: "C5",
    bagel: "C1",
    deodorant: "B16", // USING
    toilet: "D26",
    detergent: "D22",
    broom: "D7", // USING  
    toothpaste: "B6",
    eyeliner: "B5",
    football: "D21",
    headphones: "A6",
    charger: "A5", // USING
    banana: "D4" 
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const lowerCaseInputValue = inputValue.trim().toLowerCase();

    // First check if the food item exists in the local predefined map
    if (LOCAL_FOOD_AISLE_MAP[lowerCaseInputValue]) {
      setStoredValues((prevValues) => [
        ...prevValues,
        {
          inputValue: lowerCaseInputValue,
          itemName: lowerCaseInputValue,
          aisleNumber: LOCAL_FOOD_AISLE_MAP[lowerCaseInputValue],
          loading: false,
        },
      ]);
      setInputValue("");
    }
    // If not in the local map, check in the existing state or fetch from API
    else {
      const newValue = {
        inputValue: lowerCaseInputValue,
        itemName: lowerCaseInputValue,
        aisleNumber: "",
        loading: true,
      };

      setStoredValues((prevValues) => [...prevValues, newValue]);
      setInputValue("");

      fetchData(newValue, storedValues.length);
    }
  };

  const fetchData = async (value, index) => {
    try {
      setAisleLoading(true);

      const response = await axios.get("https://api.redcircleapi.com/request", {
        params: {
          api_key: key,
          search_term: value.inputValue,
          type: "search",
          customer_zipcode: "02215-1205",
          delivery_type: "in_store_pickup",
          output: "json",
        },
      });

      const product_tcin = response.data.search_results[0].product.tcin;

      const aisleResponse = await axios.get(
        "https://api.redcircleapi.com/request",
        {
          params: {
            api_key: key,
            type: "product",
            tcin: product_tcin,
            customer_zipcode: "02215-1205",
            output: "json",
          },
        }
      );

      const aisleNumber = aisleResponse.data.product.aisle;
      setFoodAisleMap((prevMap) => ({
        ...prevMap,
        [value.inputValue]: aisleNumber,
      }));

      setStoredValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].aisleNumber = aisleNumber;
        updatedValues[index].loading = false;
        return updatedValues;
      });

      setAisleLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createUpdatedLinks = () => {
    console.log("in here!");
    const aisleNumbers = storedValues.map((val) => val.aisleNumber);
    console.log("We created aisleNumbers: ", aisleNumbers);
    setNodes(aisleNumbers);
  };

  const containerStyles = {
    display: "flex",
    padding: "20px",
  };
  return (
    <>
      <h1>Add Items</h1>
      <div
        style={{
          display: "flex",
          paddingLeft: "20px",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3>Input Your Items</h3>
          <input style={{backgroundColor: "white", fontSize:"20px", color: "black", width: "231px", height: "40px", border: "1px, black, solid"}} type="text" value={inputValue} onChange={handleInputChange} />
          <button style={{backgroundColor: "black", fontSize:"20px", color: "white", width: "240px", height: "40px", border: "1px, black, solid"}} onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <h3>Created ShoppingList</h3>
          <ul style={{listStyle:"none", textAlign:"left"}}>
            {storedValues.map((value, index) => (
              <li key={index} style={{fontSize:"18px" }}>
                Item: {value.itemName} {value.loading ? "(loading...)" : ""},
                Aisle: {value.aisleNumber}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <NavLink
        to={{
          pathname: "/map",
          state: { aisleNumbers: storedValues.map((val) => val.aisleNumber) },
        }}
        style={{ marginTop: "10px" }}
      >
        <button style={{backgroundColor: "black", fontSize:"20px", color: "white", width: "240px", height: "60px", border: "1px, black, solid"}} className="bg-white text-black py-2 px-6 rounded hover:bg-gray-500 hover:text-white border border-white" onClick={() => createUpdatedLinks()}>Go to the Map page</button>
      </NavLink>
    </>
  );
}

export default AddItems;
