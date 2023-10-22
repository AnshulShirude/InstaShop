import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { NodesContext } from "../App";
// import './AddItems.css';
import { NavLink } from "react-router-dom";

function AddItems() {
  const [inputValue, setInputValue] = useState("");
  const [storedValues, setStoredValues] = useState([]);
  const [aisleLoading, setAisleLoading] = useState(false);
  const [foodAisleMap, setFoodAisleMap] = useState({});
  const { setNodes } = useContext(NodesContext);
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
  return (
    <div className="AddItems">
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
        {/*  disabled={aisleLoading} */}
      </div>

      <h3>Stored Values:</h3>
      <ul>
        {storedValues.map((value, index) => (
          <li key={index}>
            Item: {value.itemName} {value.loading ? "(loading...)" : ""}, Aisle:{" "}
            {value.aisleNumber}
          </li>
        ))}
      </ul>
      <NavLink
        to={{
          pathname: "/map",
          state: { aisleNumbers: storedValues.map((val) => val.aisleNumber) },
        }}
      >
        <button onClick={() => createUpdatedLinks()}>Go to the Map page</button>
      </NavLink>
    </div>
  );
}

export default AddItems;
