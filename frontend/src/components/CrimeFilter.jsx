import React, { useState } from "react";
import "../styles/theme.css";

const CrimeFilter = ({ onFilterChange = () => {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    area: "",
    crimeType: [],
    dateFrom: "",
    dateTo: "",
  });

  const crimeTypes = [
    "Theft",
    "Assault",
    "Burglary",
    "Robbery",
    "Rape",
    "Murder",
    "Cybercrime",
  ];

  // Mumbai Districts with their coordinates
  const mumbaiDistricts = [
    "South Mumbai",
    "Fort",
    "Colaba",
    "Bandra",
    "Worli",
    "Dadar",
    "Andheri",
    "Borivali",
  ];

  const handleCrimeTypeChange = (crime) => {
    const updated = filters.crimeType.includes(crime)
      ? filters.crimeType.filter((c) => c !== crime)
      : [...filters.crimeType, crime];
    setFilters({ ...filters, crimeType: updated });
  };

  const handleAreaChange = (area) => {
    setFilters({ ...filters, area });
    // Immediately apply filter when area changes
    onFilterChange({ ...filters, area });
  };

  const handleInputChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      area: "",
      crimeType: [],
      dateFrom: "",
      dateTo: "",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const exportData = () => {
    const csv = "area,crimes,risk_level\n" + "Data export feature coming soon";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mumbai-crime-data.csv";
    a.click();
  };

  return (
    <div className="filter-panel">
      <div className="filter-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h2>🔍 Mumbai District Filters</h2>
        <button className="toggle-btn">{isCollapsed ? "▼" : "▲"}</button>
      </div>

      {!isCollapsed && (
        <>
          <div className="filter-content">
            {/* District Selector */}
            <div className="filter-group">
              <label>📍 Select District</label>
              <select 
                value={filters.area} 
                onChange={(e) => handleAreaChange(e.target.value)}
                className="district-select"
              >
                <option value="">All Districts</option>
                {mumbaiDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Crime Type Multi-Select */}
            <div className="filter-group">
              <label>🚨 Crime Type</label>
              <div className="multi-select-group">
                {crimeTypes.map((crime) => (
                  <label key={crime} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.crimeType.includes(crime)}
                      onChange={() => handleCrimeTypeChange(crime)}
                    />
                    <span>{crime}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="filter-group date-range-group">
              <label>📅 Date Range</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                  placeholder="From"
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleInputChange("dateTo", e.target.value)}
                  placeholder="To"
                />
              </div>
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn btn-primary" onClick={applyFilters}>
              ✓ Apply Filters
            </button>
            <button className="btn btn-secondary" onClick={resetFilters}>
              ↻ Reset
            </button>
            <button className="btn btn-export" onClick={exportData} style={{ marginLeft: "auto" }}>
              ⬇ Export CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CrimeFilter;
