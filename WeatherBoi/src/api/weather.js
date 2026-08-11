const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const NWS_BASE_URL = "https://api.weather.gov";

function cToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

function kmhToMph(kmh) {
  return kmh * 0.621371;
}

function conditionToIcon(condition = "") {
  const text = condition.toLowerCase();
  if (text.includes("thunder")) return "⛈️";
  if (text.includes("snow") || text.includes("sleet") || text.includes("ice")) return "❄️";
  if (text.includes("rain") || text.includes("shower")) return "🌧️";
  if (text.includes("fog") || text.includes("haze") || text.includes("mist")) return "🌫️";
  if (text.includes("wind")) return "💨";
  if (text.includes("partly") || text.includes("mostly cloudy")) return "⛅";
  if (text.includes("cloud") || text.includes("overcast")) return "☁️";
  if (text.includes("clear") || text.includes("sunny")) return "☀️";
  return "🌡️";
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/geo+json" },
  });
  if (!response.ok) {
    throw new Error(`Weather request failed (${response.status})`);
  }
  return response.json();
}

async function geocodeCity(cityName) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  const data = await fetchJson(url);
  const match = data.results?.[0];
  if (!match) {
    throw new Error(`Could not find a location matching "${cityName}"`);
  }
  return {
    latitude: match.latitude,
    longitude: match.longitude,
    label: [match.name, match.admin1].filter(Boolean).join(", "),
  };
}

export async function fetchWeatherForCity(cityName) {
  const { latitude, longitude, label } = await geocodeCity(cityName);

  // weather.gov only covers US locations and requires resolving lat/lon
  // to a forecast grid endpoint before any forecast/observation data can be fetched.
  const point = await fetchJson(
    `${NWS_BASE_URL}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`
  );
  const { forecast: forecastUrl, observationStations: stationsUrl, relativeLocation } =
    point.properties;

  const [forecastData, stationsData] = await Promise.all([
    fetchJson(forecastUrl),
    fetchJson(stationsUrl),
  ]);

  const periods = forecastData.properties.periods;
  const todayPeriod = periods[0];

  const stationId = stationsData.features?.[0]?.properties?.stationIdentifier;
  let observation = null;
  if (stationId) {
    try {
      const obsData = await fetchJson(
        `${NWS_BASE_URL}/stations/${stationId}/observations/latest`
      );
      observation = obsData.properties;
    } catch {
      observation = null;
    }
  }

  const tempC = observation?.temperature?.value;
  const feelsLikeC = observation?.heatIndex?.value ?? observation?.windChill?.value ?? tempC;
  const humidity = observation?.relativeHumidity?.value;
  const windKmh = observation?.windSpeed?.value;
  const condition = observation?.textDescription || todayPeriod.shortForecast;

  const cityLabel = relativeLocation?.properties
    ? `${relativeLocation.properties.city}, ${relativeLocation.properties.state}`
    : label;

  const current = {
    city: cityLabel,
    condition,
    icon: conditionToIcon(condition),
    temperature: Math.round(tempC != null ? cToF(tempC) : todayPeriod.temperature),
    feelsLike: Math.round(feelsLikeC != null ? cToF(feelsLikeC) : todayPeriod.temperature),
    humidity: humidity != null ? Math.round(humidity) : "--",
    wind: windKmh != null ? Math.round(kmhToMph(windKmh)) : "--",
  };

  const forecast = periods
    .filter((period) => period.isDaytime)
    .slice(0, 5)
    .map((period) => ({
      day: period.name,
      icon: conditionToIcon(period.shortForecast),
      temperature: period.temperature,
      condition: period.shortForecast,
    }));

  return { current, forecast };
}
