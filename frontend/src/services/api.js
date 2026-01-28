import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Crime and Hotspot APIs
export const getCrimes = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.crime_type && filters.crime_type.length > 0) {
    params.append('crime_type', filters.crime_type.join(','));
  }
  
  if (filters.riskLevel && filters.riskLevel.length > 0) {
    params.append('risk_level', filters.riskLevel.join(','));
  }
  
  if (filters.dateFrom) {
    params.append('date_from', filters.dateFrom);
  }
  
  if (filters.dateTo) {
    params.append('date_to', filters.dateTo);
  }
  
  return apiClient.get("/crimes", { params });
};

export const getHotspots = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.crime_type && filters.crime_type.length > 0) {
    params.append('crime_type', filters.crime_type.join(','));
  }
  
  return apiClient.get("/hotspots", { params });
};

export const getRisk = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.crime_type && filters.crime_type.length > 0) {
    params.append('crime_type', filters.crime_type.join(','));
  }
  
  return apiClient.get("/risk", { params });
};

export const getPatrol = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.crime_type && filters.crime_type.length > 0) {
    params.append('crime_type', filters.crime_type.join(','));
  }
  
  return apiClient.get("/patrol", { params });
};

export const getStats = () => {
  return apiClient.get("/stats");
};

export const getPatrolRoutes = () => {
  return apiClient.get("/patrol-routes");
};

export const getPredictedHotspots = () => {
  return apiClient.get("/hotspots");
};

export const getHealth = () => {
  return apiClient.get("/health");
};

export const getAlerts = () => {
  return apiClient.get("/alerts");
};

// Error handling helper
export const handleApiError = (error) => {
  console.error("API Error:", error);
  
  let message = "An error occurred";
  
  if (error.response) {
    message = error.response.data?.error || error.response.statusText || message;
  } else if (error.request) {
    message = "No response from server. Check if backend is running on port 5000.";
  } else {
    message = error.message;
  }
  
  return {
    success: false,
    message: message,
    status: error.response?.status || null,
  };
};


