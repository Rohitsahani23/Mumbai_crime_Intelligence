import React, { useEffect, useState } from "react";
import { getRisk } from "../services/api";
import "../styles/theme.css";

const StatsCard = ({ selectedFilters = {} }) => {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Convert filter structure to API format
    const apiFilters = {
      crime_type: selectedFilters.crimeType || [],
      date_from: selectedFilters.dateFrom || "",
      date_to: selectedFilters.dateTo || "",
      area: selectedFilters.area || "",
    };

    getRisk(apiFilters)
      .then((res) => {
        // API returns { success: true, data: [...], count: number }
        const risksData = Array.isArray(res.data?.data) ? res.data.data : [];
        setRisks(risksData);
      })
      .catch((err) => {
        console.error("Error fetching risks:", err);
        setRisks([]);
      })
      .finally(() => setLoading(false));
  }, [selectedFilters]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      {risks.length > 0 ? (
        risks.map((r, i) => (
          <div key={i} className={`stats-card ${r.risk_level?.toLowerCase() || "medium"}`}>
            <div className="stats-label">{r.area}</div>
            <div className="stats-value">{r.crime_count || 0}</div>
            <div className="stats-detail">
              Risk: <strong>{r.risk_level || "Medium"}</strong>
            </div>
            <div className="stats-detail" style={{ marginTop: "8px" }}>
              Score: {(r.risk_score || 0).toFixed(2)}/100
            </div>
          </div>
        ))
      ) : (
        <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#6b7280" }}>
          No data available
        </div>
      )}
    </div>
  );
};

export default StatsCard;

