import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import HeatMap from "../components/HeatMap";
import StatsCard from "../components/StatsCard";
import PatrolInfo from "../components/PatrolInfo";
import CrimeFilter from "../components/CrimeFilter";
import AlertsSection from "../components/AlertsSection";
import { getCrimes, getHotspots } from "../services/api";
import "../styles/theme.css";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    area: "",
    crimeType: [],
    dateFrom: "",
    dateTo: "",
  });

  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [crimes, setCrimes] = useState([]);
  const [showAllCrimes, setShowAllCrimes] = useState(false);

  // Load hotspots and crimes data
  useEffect(() => {
    // Convert filter keys to API format (camelCase to snake_case)
    const apiFilters = {
      crime_type: filters.crimeType || [],
      date_from: filters.dateFrom || "",
      date_to: filters.dateTo || "",
      area: filters.area || "",
    };

    // Fetch hotspots
    getHotspots(apiFilters)
      .then((res) => {
        // API returns { success: true, data: [...], count: number }
        const hotspotsData = Array.isArray(res.data?.data) ? res.data.data : [];
        setHotspots(hotspotsData);
      })
      .catch((err) => {
        console.error("Error fetching hotspots:", err);
        setHotspots([]);
      });

    // Fetch crimes
    getCrimes(apiFilters)
      .then((res) => {
        // API returns { success: true, data: [...], count: number }
        const crimesData = Array.isArray(res.data?.data) ? res.data.data : [];
        setCrimes(crimesData);
      })
      .catch((err) => {
        console.error("Error fetching crimes:", err);
        setCrimes([]);
      });
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };

  const displayedCrimes = crimes.slice(0, showAllCrimes ? crimes.length : 5);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <div className="container">
          <h1>🛡️ Mumbai Crime Intelligence Dashboard</h1>
          <p className="header-subtitle">Real-time crime mapping & predictive policing analytics for Mumbai Metropolitan Region</p>
        </div>
      </div>

      <div className="container">
        {/* Dynamic Real-Time Alerts Section */}
        <AlertsSection />

        {/* Filters */}
        <CrimeFilter onFilterChange={handleFilterChange} />

        {/* Stats Row */}
        <div className="card" style={{ padding: "24px", marginBottom: "24px" }}>
          <h2 className="card-title">📊 Risk Summary by Area</h2>
          <StatsCard selectedFilters={filters} />
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-top">
          {/* Map */}
          <div>
            <MapView hotspots={hotspots} selectedFilters={filters} onHotspotClick={handleHotspotClick} />
          </div>

          {/* Patrol Panel */}
          <PatrolInfo selectedHotspot={selectedHotspot} />
        </div>

        <div className="dashboard-bottom">
          {/* Heatmap */}
          <div>
            <div className="card" style={{ padding: "0", marginBottom: "0" }}>
              <div style={{ padding: "24px" }}>
                <h2 className="card-title">🔥 Crime Density Heatmap</h2>
              </div>
              <HeatMap selectedFilters={filters} />
            </div>
          </div>

          {/* Recent Crimes Table */}
          <div className="card">
            <h2 className="card-title">📋 Recent Incidents</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Area</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedCrimes.length > 0 ? (
                    displayedCrimes.map((crime, idx) => (
                      <tr key={idx}>
                        <td>#{crime.id || idx + 1}</td>
                        <td>{crime.crime_type || "N/A"}</td>
                        <td>{crime.date || new Date().toLocaleDateString()}</td>
                        <td>{crime.area || "N/A"}</td>
                        <td>
                          <span className={`severity-badge severity-${(crime.severity || "medium").toLowerCase()}`}>
                            {crime.severity || "Medium"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", color: "#6b7280" }}>
                        No incidents recorded
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {crimes.length > 5 && (
              <button
                className="btn btn-secondary"
                onClick={() => setShowAllCrimes(!showAllCrimes)}
                style={{ marginTop: "16px", width: "100%" }}
              >
                {showAllCrimes ? "Show Less" : `Show All (${crimes.length} incidents)`}
              </button>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="card" style={{ marginTop: "24px", textAlign: "center", color: "#6b7280" }}>
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p style={{ fontSize: "12px", marginTop: "8px" }}>
            Data refreshes automatically • Connected to backend API
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
