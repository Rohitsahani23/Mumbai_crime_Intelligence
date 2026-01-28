import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "../styles/theme.css";

const MapView = ({ hotspots = [], selectedFilters = {}, onHotspotClick = () => {} }) => {
  const [mapTheme, setMapTheme] = useState("light");
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  const defaultCenter = [19.0760, 72.8777]; // Mumbai coordinates
  const defaultZoom = 12;

  // Risk color mapping
  const getRiskColor = (crimeCount) => {
    if (crimeCount > 50) return "#ef4444"; // Red - High risk
    if (crimeCount > 20) return "#f97316"; // Orange - Medium risk
    return "#10b981"; // Green - Low risk
  };

  const getRiskLabel = (crimeCount) => {
    if (crimeCount > 50) return "High Risk";
    if (crimeCount > 20) return "Medium Risk";
    return "Low Risk";
  };

  // Custom marker icon
  const createCustomIcon = (riskColor) => {
    return L.divIcon({
      html: `<div style="background-color: ${riskColor}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      className: "custom-marker",
      iconSize: [30, 30],
      popupAnchor: [0, -15],
    });
  };

  // Tile layer URL based on theme
  const getTileLayerUrl = () => {
    return mapTheme === "light"
      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
  };

  const toggleTheme = () => {
    setMapTheme(mapTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="card map-container">
      <div className="map-wrapper">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: "100%", borderRadius: "12px" }}
          className={mapTheme}
        >
          <TileLayer
            url={getTileLayerUrl()}
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Hotspot Markers */}
          {hotspots.map((hotspot, idx) => (
            <CircleMarker
              key={idx}
              center={[hotspot.center_lat, hotspot.center_lng]}
              radius={Math.min(hotspot.crime_count / 5 + 5, 25)}
              fillColor={getRiskColor(hotspot.crime_count)}
              fillOpacity={0.7}
              color="white"
              weight={2}
              onMouseEnter={() => setHoveredHotspot(hotspot)}
              onMouseLeave={() => setHoveredHotspot(null)}
              onClick={() => onHotspotClick(hotspot)}
            >
              <Popup>
                <div style={{ fontSize: "12px" }}>
                  <strong>Hotspot {hotspot.hotspot_id}</strong>
                  <p>Crimes: {hotspot.crime_count}</p>
                  <p>Risk: {getRiskLabel(hotspot.crime_count)}</p>
                  <p>Type: {hotspot.crime_type || "Mixed"}</p>
                  <p>Last Incident: {hotspot.last_date || "N/A"}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Map Theme">
          {mapTheme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Legend */}
        <div className="legend">
          <div style={{ fontWeight: "600", marginBottom: "12px", fontSize: "13px" }}>
            Risk Levels
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#10b981" }}></div>
            <span>Low (&lt;20 crimes)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#f97316" }}></div>
            <span>Medium (20-50)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#ef4444" }}></div>
            <span>High (&gt;50)</span>
          </div>
        </div>

        {/* Hovered Hotspot Info */}
        {hoveredHotspot && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              background: "white",
              padding: "12px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 400,
              fontSize: "12px",
              maxWidth: "250px",
            }}
          >
            <strong style={{ color: "#1e40af" }}>Hotspot {hoveredHotspot.hotspot_id}</strong>
            <p>Crime Count: {hoveredHotspot.crime_count}</p>
            <p>Risk Level: {getRiskLabel(hoveredHotspot.crime_count)}</p>
            <p>Coordinates: {hoveredHotspot.center_lat.toFixed(4)}, {hoveredHotspot.center_lng.toFixed(4)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
