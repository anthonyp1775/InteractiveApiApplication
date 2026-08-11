import { useState } from "react";
import ForecastCard from "./ForecastCard.jsx";

function ForecastCarousel({ forecast }) {
  const [index, setIndex] = useState(0);

  function goPrev() {
    setIndex((i) => (i - 1 + forecast.length) % forecast.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % forecast.length);
  }

  return (
    <div className="forecast-carousel">
      <div className="carousel-row">
        <button
          type="button"
          className="carousel-arrow carousel-arrow-prev"
          onClick={goPrev}
          aria-label="Previous day"
        >
          ‹
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              width: `${forecast.length * 100}%`,
              transform: `translateX(-${index * (100 / forecast.length)}%)`,
            }}
          >
            {forecast.map((day) => (
              <div
                className="carousel-slide"
                key={day.day}
                style={{ width: `${100 / forecast.length}%` }}
              >
                <ForecastCard
                  day={day.day}
                  icon={day.icon}
                  temperature={day.temperature}
                  condition={day.condition}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow-next"
          onClick={goNext}
          aria-label="Next day"
        >
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {forecast.map((day, i) => (
          <button
            type="button"
            key={day.day}
            className={`carousel-dot${i === index ? " active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${day.day}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ForecastCarousel;
