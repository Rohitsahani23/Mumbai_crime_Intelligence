import React, { useState, useEffect } from "react";
import { getAlerts } from "../services/api";
import "../styles/alerts.css";

const AlertsSection = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlerts();
    
    // Refresh alerts every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAlerts();
      
      if (response.data.success) {
        setAlerts(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch alerts");
      console.error("Error fetching alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Organize alerts by type
  const criticalAlerts = alerts.filter(a => a.type === 'critical');

  if (loading && alerts.length === 0) {
    return (
      <div className="alerts-section">
        <h2>Live Crime Alerts</h2>
        <div className="loading">Loading alerts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alerts-section">
        <h2>Live Crime Alerts</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="alerts-section">
      <div className="alerts-header">
        <h2>🚨 Live Crime Alerts</h2>
        <p className="alerts-subtitle">High-risk areas requiring immediate police deployment</p>
      </div>

      {/* Critical Alerts Section */}
      {criticalAlerts.length > 0 && (
        <div className="alert-section-group">
          <h3 className="section-title critical-section">🚨 CRITICAL ALERTS</h3>
          <div className="alerts-container">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={`alert-card alert-${alert.type}`}>
                <div className="alert-header">
                  <span className="alert-icon">{alert.icon}</span>
                  <div className="alert-title-group">
                    <h3 className="alert-title">{alert.title}</h3>
                    <span className="alert-area">{alert.area}</span>
                  </div>
                  <div className="alert-risk-score">
                    <span className={`risk-badge risk-${alert.type}`}>
                      Risk: {alert.risk_score}%
                    </span>
                  </div>
                </div>

                <div className="alert-body">
                  <p className="alert-message">{alert.message}</p>
                  <p className="alert-details">{alert.details}</p>
                </div>

                <div className="alert-footer">
                  <div className="alert-stats">
                    <span className="stat">
                      <span className="stat-label">High Severity:</span>
                      <span className="stat-value">{alert.high_severity_count}</span>
                    </span>
                    <span className="stat">
                      <span className="stat-label">Total Incidents:</span>
                      <span className="stat-value">{alert.total_crimes}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <div className="no-alerts">
          <p>✓ No critical alerts at this time</p>
        </div>
      )}

      <div className="alerts-refresh">
        <button onClick={() => { setLoading(true); fetchAlerts(); }} className="refresh-button" disabled={loading}>
          {loading ? "⏳ Refreshing..." : "🔄 Refresh Alerts"}
        </button>
        <span className="refresh-note">Auto-updates every 30 seconds</span>
      </div>
    </div>
  );
};

export default AlertsSection;
