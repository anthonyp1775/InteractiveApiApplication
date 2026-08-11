function ForecastCard(props) {
return(
<div className="forecast-card">
<h3>{props.day}</h3>
<span className="forecast-icon">
    {props.icon}
</span>
<h2>{props.temperature}</h2>
<p>{props.condition}</p>
</div>
);
}

export default ForecastCard;