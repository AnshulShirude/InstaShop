import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [storedValues, setStoredValues] = useState([]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      setStoredValues(prevValues => [...prevValues, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="App">
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
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
