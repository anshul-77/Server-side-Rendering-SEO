import React, { useState } from 'react';
import axios from 'axios';

function WeatherForm() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/weatherdetail', { cityname: city }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setWeather(response.data);
        setError(null);
      })
      .catch(error => {
        setError("Error fetching data");
        console.error("Error:", error.response ? error.response.data : error.message);
        setWeather(null);
      });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="cityinput" style={styles.label}>Enter the City</label>
        <input 
          id="cityinput" 
          type="text" 
          value={city} 
          onChange={handleInputChange} 
          style={styles.input} 
        />
        <button type="submit" style={styles.button}>Check Weather</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {weather &&
        <div style={styles.weatherContainer}>
          <h1 style={styles.weatherText}>The conditions are {weather.condition}</h1>
          <h1 style={styles.weatherText}>The temperature is {weather.temp}°C.</h1> 
          <img src={weather.imageurl} alt="Weather icon" style={styles.weatherIcon} />
        </div>
      }
    </div>
  );
}

const commonBoxStyle = {
  width: '300px', // Ensure both input and result box have the same width
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    ...commonBoxStyle, // Use commonBoxStyle for consistency
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #cccccc',
    marginBottom: '10px',
    width: '100%', // Full width of the form box
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
  weatherContainer: {
    ...commonBoxStyle, // Use commonBoxStyle for consistency
    marginTop: '20px',
  },
  weatherText: {
    fontSize: '20px',
    color: '#333333',
  },
  weatherIcon: {
    width: '100px',
    height: '100px',
  },
};

export default WeatherForm;
