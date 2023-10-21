import React, { useState } from 'react';
import axios from 'axios';
// import './AddItems.css';

function AddItems() {
    const [inputValue, setInputValue] = useState('');
  const [storedValues, setStoredValues] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      const newValue = {
        inputValue,
        itemName: '',
        aisleNumber: '',
        loading: true
      };
  
      setStoredValues(prevValues => [...prevValues, newValue]);
      setInputValue('');
  
      // Start the background process to fetch data
      fetchData(newValue, storedValues.length);
    }
  };

  const fetchData = async (value, index) => {
    try {
      const response = await axios.get('https://api.redcircleapi.com/request', {
        params: {
          api_key: '2781954E0602468C825B52F94D1CD1CC',
          search_term: inputValue,
          type: 'search',
          customer_zipcode: '02215',
          delivery_type: 'in_store_pickup',
          sort_by: 'best_match',
          output: 'json'
        }
      });
  
      const product_tcin = response.data.search_results[0].product.tcin;
      const product_title = response.data.search_results[0].product.title;
      console.log(product_title);
  
      const aisleResponse = await axios.get('https://api.redcircleapi.com/request', {
        params: {
          api_key: '2781954E0602468C825B52F94D1CD1CC',
          type: 'product',
          tcin: product_tcin,
          customer_zipcode: '02215',
          output: 'json'
        }
      });
  
      const itemName = aisleResponse.data.product.title;
      const aisleNumber = aisleResponse.data.product.aisle;
  
      // Update the specific stored value with the fetched data and set loading to false
      setStoredValues(prevValues => {
        const updatedValues = [...prevValues];
        updatedValues[index] = {
          ...updatedValues[index],
          itemName,
          aisleNumber,
          loading: false
        };
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
        <button onClick={handleSubmit} disabled={loading}>Submit</button>
      </div>

      <h3>Stored Values:</h3>
      <ul>
        {storedValues.map((value, index) => (
          <li key={index}>
            Item: {value.itemName}, Aisle: {value.aisleNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddItems;
