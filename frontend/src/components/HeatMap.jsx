import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { getHotspots } from "../services/api";
import "leaflet/dist/leaflet.css";
import "../styles/theme.css";

const HeatMap = ({ selectedFilters = {} }) => {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Convert filter keys to API format (camelCase to snake_case)
    const apiFilters = {
      crime_type: selectedFilters.crimeType || [],
      date_from: selectedFilters.dateFrom || "",
      date_to: selectedFilters.dateTo || "",
      area: selectedFilters.area || "",
    };
    getHotspots(apiFilters)
      .then((res) => {
        // API returns { success: true, data: [...], count: number }
        const hotspotsData = Array.isArray(res.data?.data) ? res.data.data : [];
        setHotspots(hotspotsData);
      })
      .catch((err) => {
        console.error("Error fetching hotspots:", err);
        setHotspots([]);
      })
      .finally(() => setLoading(false));
  }, [selectedFilters]);

  const getHeatColor = (crimeCount) => {
    if (crimeCount > 50) return "#ef4444";
    if (crimeCount > 20) return "#f97316";
    return "#10b981";
  };

  if (loading) {
    return (
      <div className="card" style={{ height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "0", overflow: "hidden" }}>
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        className="heatmap"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hotspots.map((h) => (
          <CircleMarker
            key={h.hotspot_id}
            center={[h.center_lat, h.center_lng]}
            radius={Math.min((h.crime_count / 10) * 5 + 8, 30)}
            fillColor={getHeatColor(h.crime_count)}
            color="white"
            weight={3}
            opacity={0.8}
            fillOpacity={0.6}
          >
            <Tooltip>
              <strong>Hotspot {h.hotspot_id}</strong>
              <br />
              Crimes: {h.crime_count}
              <br />
              Type: {h.crime_type || "Mixed"}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HeatMap;
