import React, { useState } from "react";
import "./weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "ff3c26d70c0df4e73e29c2d9208cdf1d";

  const getWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found ❌");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      getWeather(city);
    }
  };

  return (
    <div className="weather-wrapper">

      <div className="weather-container">

        <h1 className="title">🌾 Weather Dashboard</h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="Search city or village..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        {/* Weather */}
        {weather && (
          <div className="weather-card">

            <div className="top">
              <h2>{weather.name}</h2>
              <p className="desc">{weather.weather[0].description}</p>
            </div>

            <div className="temp-section">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather"
              />
              <h1>{Math.round(weather.main.temp)}°C</h1>
            </div>

            <div className="info-grid">
              <div className="info-box">
                <span>💧</span>
                <p>{weather.main.humidity}%</p>
                <small>Humidity</small>
              </div>

              <div className="info-box">
                <span>🌬</span>
                <p>{weather.wind.speed}</p>
                <small>Wind</small>
              </div>

              <div className="info-box">
                <span>🌡</span>
                <p>{weather.main.feels_like}°C</p>
                <small>Feels Like</small>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Weather;