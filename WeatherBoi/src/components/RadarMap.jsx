import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { dynamicMapLayer } from "esri-leaflet";

const NOAA_RADAR_URL =
  "https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity/MapServer";

function RadarMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current).setView([37.8, -96.0], 4);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    dynamicMapLayer({
      url: NOAA_RADAR_URL,
      opacity: 0.65,
      useCors: false,
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="radar-section">
      <h2>Live NOAA Weather Radar</h2>
      <div className="radar-map" ref={containerRef} />
    </section>
  );
}

export default RadarMap;
