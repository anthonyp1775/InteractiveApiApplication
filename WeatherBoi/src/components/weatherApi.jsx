import { useState } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather using latitude and longitude coordinates.
 */
async function getWeatherByCoords(lat, lon) {
  const endpoint = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Failed to fetch weather for current location.');
  }

  const data = await response.json();
  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}


/**
 * React Component to request user geolocation and display weather.
 */
export default function CurrentLocationWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationWeather = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          setError(err.message || 'Error fetching weather data.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError('Location access denied or unavailable.');
      }
    );
  };

  return (
    <div className="weather-location-card">
      <button onClick={fetchLocationWeather} disabled={loading}>
        {loading ? 'Locating...' : 'Use My Current Location'}
      </button>

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div className="weather-details">
          <h3>{weather.city}</h3>
          <img src={weather.iconUrl} alt={weather.condition} />
          <p>{weather.temp}°F - {weather.condition}</p>
        </div>
      )}
    </div>
  );
}