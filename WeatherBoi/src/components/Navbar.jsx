import logo from "../assets/Weather_Boi_Img.png";

function Navbar ({ page, onNavigate }){
return (
    <nav className="navbar">
<div className="brand">
<img src={logo} alt="WeatherBoi logo" className="brand-logo" />
</div>

<div className="nav-links">
<button
  className={page === "home" ? "active" : ""}
  onClick={() => onNavigate("home")}
>
  Home
</button>
<button
  className={page === "radar" ? "active" : ""}
  onClick={() => onNavigate("radar")}
>
  Radar Maps
</button>
</div>
    </nav>
);
}

export default Navbar;