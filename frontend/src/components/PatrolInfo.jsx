import React, { useEffect, useState } from "react";
import { getPatrol } from "../services/api";
import "../styles/theme.css";

const PatrolInfo = ({ selectedHotspot = null }) => {
  const [patrols, setPatrols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const itemsToShowInitially = 3;

  useEffect(() => {
    setLoading(true);
    getPatrol()
      .then((res) => {
        // API returns { success: true, data: [...], count: number }
        const patrolsData = Array.isArray(res.data?.data) ? res.data.data : [];
        setPatrols(patrolsData);
      })
      .catch((err) => {
        console.error("Error fetching patrols:", err);
        setPatrols([]);
      })
      .finally(() => setLoading(false));
  }, [selectedHotspot]);

  if (loading) {
    return (
      <div className="patrol-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="patrol-container">
      <h2 className="card-title">🚓 Patrol Recommendations</h2>

      {selectedHotspot && (
        <div style={{ background: "#eff6ff", padding: "12px", borderRadius: "8px", marginBottom: "16px", border: "1px solid #dbeafe" }}>
          <strong>Selected Hotspot:</strong> #{selectedHotspot.hotspot_id}
        </div>
      )}

      {patrols.length > 0 ? (
        <>
          {patrols.slice(0, showAll ? patrols.length : itemsToShowInitially).map((p, i) => (
            <div key={i} className="patrol-card">
              <div className="patrol-id">Area {p.area}</div>
              <div className="patrol-units">🚔 {p.recommended_patrol_units} Units</div>
              <div className="patrol-notes">{p.note || "Routine patrol recommended"}</div>
              {p.additional_notes && (
                <div className="patrol-notes" style={{ marginTop: "8px", fontSize: "12px", color: "#ef4444" }}>
                  ⚠️ {p.additional_notes}
                </div>
              )}
            </div>
          ))}
          {patrols.length > itemsToShowInitially && (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn btn-secondary"
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  minWidth: "200px",
                }}
              >
                {showAll ? "▲ Show Less" : "▼ Show More"} ({patrols.length - itemsToShowInitially} more)
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ color: "#6b7280", textAlign: "center", padding: "20px" }}>
          No patrol data available
        </div>
      )}
    </div>
  );
};

export default PatrolInfo;
