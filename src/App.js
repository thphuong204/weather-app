import React, { useEffect, useState } from 'react';
import './App.css';

const api = {
  key: "0448686249e84aba83df9baa7bc2e281",
  base: "api.openweathermap.org/data/2.5/",
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true); //loading is true then it's fetching
      try {
        const url = `https://${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setWeatherInfo(data)
        } else {
          setErrorMessage(data.message)
        }

      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false) //loading is false then no loading any more
    }
    fetchWeatherData();
  }, [searchCity])

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <section className="container">
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => {
            return setSearchInput(e.target.value)
          }} />
        <button>Search</button>
      </form>
      {loading ? (<div>Loading...</div>)
        : (
          <>
            {errorMessage ? (<div style={{ color: "red" }}>{errorMessage}</div>)
              : (weatherInfo ?
                (
                  <div className="card">
                    <div className="city">{`${weatherInfo.name}, ${weatherInfo.sys.country}`}</div>
                    <div className="date">{new Date().toLocaleDateString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div className="temp">{`${Math.round(weatherInfo.main.temp)}°C`}</div>
                    <div className="weather">{weatherInfo.weather[0].main}</div>
                    <div className="hi-low">{`${Math.round(weatherInfo.main.temp_max)}°c / ${Math.round(weatherInfo.main.temp_min)}°c`}</div>
                  </div>
                )
                : (<></>)
              )}
          </>)
      }

    </section>
  )
}

export default App;

