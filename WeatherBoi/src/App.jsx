import "./App.css";

import Navbar from  "./components/Navbar.jsx"
import SearchBar from "./components/SearchBar.jsx"
import WeatherCard from "./components/WeatherCard.jsx";
import ForecastCard from "./components/ForecastCard.jsx";
import Footer from "./components/Footer.jsx";

function App(){
  return(
<div className="app">
<Navbar />
<main>
<SearchBar />

<WeatherCard
city="Tampa, Florida"
condition="Partly Cloudy"
icon=""
temperature="82"
feelsLike="86"
humidity="72"
wind="8"
/>

<section className="forecast-section">
<h2>5-day Forecast</h2>
<div className="forecast-container">
  <ForecastCard
  day="Monday"
  icon=""
  temperature="88"
  condition="Sunny"
  />

  <ForecastCard
  day="Tuesday"
  icon=""
  temperature="83"
  condition="Rain"
  />

  <ForecastCard
  day="Wednesday"
  icon=""
  temperature="86"
  condition="cloudy"
  />

  <ForecastCard
  day="Thursday"
  icon=""
  temperature="89"
  condition="Sunny"
  />

  <ForecastCard
  day="Friday"
  icon=""
  temperature="84"
  condition="Showers"
  />

</div>
</section>
</main>
<Footer />
</div>
  );
}

export default App;