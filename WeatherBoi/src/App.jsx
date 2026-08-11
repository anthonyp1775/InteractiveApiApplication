import { useEffect, useState } from "react";
import "./App.css";

import Navbar from  "./components/Navbar.jsx"
import SearchBar from "./components/SearchBar.jsx"
import WeatherCard from "./components/WeatherCard.jsx";
import ForecastCarousel from "./components/ForecastCarousel.jsx";
import RadarMap from "./components/RadarMap.jsx";
import Rain from "./components/Rain.jsx";
import Footer from "./components/Footer.jsx";
import { fetchWeatherForCity } from "./api/weather.js";

const DEFAULT_CITY = "Tampa, FL";

function App(){
  const [page, setPage] = useState("home");
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchWeatherForCity(city)
      .then(({ current, forecast }) => {
        if (cancelled) return;
        setWeather(current);
        setForecast(forecast);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [city]);

  return(
<div className="app">
<Rain />
<Navbar page={page} onNavigate={setPage} />
<main>
{page === "home" && (
<>
<SearchBar onSearch={setCity} loading={loading} />

{loading && <p className="status-message">Loading weather...</p>}
{error && <p className="status-message error">{error}</p>}

{weather && (
<WeatherCard
city={weather.city}
condition={weather.condition}
icon={weather.icon}
temperature={weather.temperature}
feelsLike={weather.feelsLike}
humidity={weather.humidity}
wind={weather.wind}
timeZone={weather.timezone}
/>
)}

{forecast.length > 0 && (
<section className="forecast-section">
<h2>5-day Forecast</h2>
<ForecastCarousel forecast={forecast} />
</section>
)}
</>
)}

{page === "radar" && <RadarMap />}
</main>
<Footer />
</div>
  );
}

export default App;
