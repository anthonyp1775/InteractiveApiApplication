function WeatherCard (props) {
    return(
<section className="weather-card">
<div className="weather-main">
    <div>
        <h2>{props.city}</h2>
        <p>{props.condition}</p>
    </div>
<div className="weather-termperature">
<span className="weather-icon">
    {props.icon}
</span>
<h1>{props.temperature}*</h1>
</div>
</div>


<div className="weather-details">
<div className="detail">
<p>Feels Like</p>
<h3>{props.feelsLike}*</h3>
</div>

<div className="detail">
    <p>Humidity</p>
    <h3>{props.humidity}%</h3>
</div>

<div className="detail">
    <p>Wind</p>
    <h3>{props.wind} mph</h3>
</div>
</div>
</section>
    );
}

export default WeatherCard;