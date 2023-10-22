import React, { useState } from 'react';
import axios from 'axios';
// import './AddItems.css';
import { NavLink } from 'react-router-dom';

function AddItems() {
    const [inputValue, setInputValue] = useState('');
    const [storedValues, setStoredValues] = useState([]);
    const key = '0CC42161E0A649A2AC3625E7CE64A56E';

    // Start with an empty Local Dictionary/Map of foods and their aisle numbers
    const [foodAisleMap, setFoodAisleMap] = useState({});

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        const lowerCaseInputValue = inputValue.trim().toLowerCase(); // Convert to lowercase

        if (lowerCaseInputValue !== '') {
            // Check if the item exists in the local dictionary
            if (foodAisleMap[lowerCaseInputValue]) {
                setStoredValues(prevValues => [...prevValues, {
                    inputValue: lowerCaseInputValue,
                    itemName: lowerCaseInputValue,
                    aisleNumber: foodAisleMap[lowerCaseInputValue],
                    loading: false
                }]);
                setInputValue('');
            } else {
                const newValue = {
                    inputValue: lowerCaseInputValue,
                    itemName: '',
                    aisleNumber: '',
                    loading: true
                };

                setStoredValues(prevValues => [...prevValues, newValue]);
                setInputValue('');

                // Fetch data from API if not in local dictionary
                fetchData(newValue, storedValues.length);
            }
        }
    };

    const fetchData = async (value, index) => {
        try {
            const response = await axios.get('https://api.redcircleapi.com/request', {
                params: {
                    api_key: key,
                    search_term: value.inputValue, // Use value instead of direct inputValue
                    type: 'search',
                    customer_zipcode: '02215',
                    delivery_type: 'in_store_pickup',
                    sort_by: 'best_match',
                    output: 'json'
                }
            });

            const product_tcin = response.data.search_results[0].product.tcin;
            const product_title = response.data.search_results[0].product.title;

            // Update the specific stored value with the fetched item name immediately
            setStoredValues(prevValues => {
                const updatedValues = [...prevValues];
                updatedValues[index].itemName = product_title;
                return updatedValues;
            });

            const aisleResponse = await axios.get('https://api.redcircleapi.com/request', {
                params: {
                    api_key: key,
                    type: 'product',
                    tcin: product_tcin,
                    customer_zipcode: '02215',
                    output: 'json'
                }
            });

            const aisleNumber = aisleResponse.data.product.aisle;
            setFoodAisleMap(prevMap => ({ ...prevMap, [value.inputValue]: aisleNumber }));

            // Update the specific stored value with the fetched aisle number and set loading to false
            setStoredValues(prevValues => {
                const updatedValues = [...prevValues];
                updatedValues[index].aisleNumber = aisleNumber;
                updatedValues[index].loading = false;
                return updatedValues;
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="AddItems">
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <h3>Stored Values:</h3>
            <ul>
                {storedValues.map((value, index) => (
                    <li key={index}>
                        Item: {value.itemName} {value.loading ? "(loading...)" : ""}, Aisle: {value.aisleNumber}
                    </li>
                ))}
            </ul>
            <NavLink 
                to={{
                    pathname: "/map",
                    state: { aisleNumbers: storedValues.map(val => val.aisleNumber) }
                }}
            >
                <button>Go to the Map page</button>
            </NavLink>
        </div>
    );
}

export default AddItems;
