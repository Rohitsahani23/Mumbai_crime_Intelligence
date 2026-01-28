# SafeCity Frontend - Setup & Installation Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Dashboard](#running-the-dashboard)
4. [Backend Configuration](#backend-configuration)
5. [Features Overview](#features-overview)
6. [Customization Guide](#customization-guide)

---

## Prerequisites

### Required
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** v6+ (comes with Node.js)
- **Git** (optional, for version control)

### Recommended
- VS Code with React Extensions
- Chrome/Firefox with DevTools
- Flask backend running locally

---

## Installation

### Step 1: Navigate to Frontend Directory

```bash
cd d:\safe-city\frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all packages listed in `package.json`:
- React 19.2.4
- React Leaflet 5.0.0 (Maps)
- Chart.js 4.4.0 (Charts)
- Axios (HTTP client)
- And other dependencies

### Step 3: Verify Installation

```bash
npm list react react-leaflet leaflet axios
```

You should see versions without errors.

---

## Running the Dashboard

### Development Mode

```bash
npm start
```

The app will:
- Start on `http://localhost:3000`
- Auto-reload when files change
- Show errors in console and browser

### Production Build

```bash
npm run build
```

Creates optimized build in `build/` folder.

### Testing

```bash
npm test
```

Runs test suite in watch mode.

---

## Backend Configuration

### Backend API Endpoint

The frontend is configured to connect to:
```
http://127.0.0.1:5000/api
```

### Configure Different Backend

Edit `src/services/api.js`:

```javascript
const BASE_URL = "http://YOUR_BACKEND_URL:PORT/api";
```

### Expected API Endpoints

Your Flask backend should provide:

| Endpoint | Method | Response |
|----------|--------|----------|
| `/api/hotspots` | GET | `[{ hotspot_id, center_lat, center_lng, crime_count, crime_type, last_date }]` |
| `/api/risk` | GET | `[{ area, risk_level, risk_score, crime_count }]` |
| `/api/patrol` | GET | `[{ area, recommended_patrol_units, note, additional_notes }]` |
| `/api/crimes` | GET | `[{ id, crime_type, date, time, latitude, longitude, area, severity }]` |

### CORS Configuration

Ensure your Flask backend has CORS enabled:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

---

## Features Overview

### 1. 🗺️ Interactive Crime Map
- Real-time hotspot visualization
- Color-coded risk levels
- Hover tooltips with crime details
- Dark/light theme toggle
- Risk legend

**File**: `src/components/MapView.jsx`

### 2. 🔍 Advanced Filtering
- City selection
- Crime type multi-select (8 categories)
- Age range slider
- Date range picker
- Risk level filter
- Collapsible panel
- Export to CSV

**File**: `src/components/CrimeFilter.jsx`

### 3. 📊 Risk Analytics
- Risk score by area
- Crime count cards
- Color-coded severity
- Responsive grid layout

**File**: `src/components/StatsCard.jsx`

### 4. 🔥 Heat Density Map
- Geographic crime concentration
- Dynamic circle sizing
- Tooltip information
- Real-time updates

**File**: `src/components/HeatMap.jsx`

### 5. 🚓 Patrol Recommendations
- AI-powered unit suggestions
- Area-wise patrol plans
- Alert notes
- Selected hotspot context

**File**: `src/components/PatrolInfo.jsx`

### 6. 📋 Dashboard Management
- Alert notifications
- Recent incidents table
- Component orchestration
- State management
- Filter coordination

**File**: `src/pages/Dashboard.jsx`

---

## Customization Guide

### Change Color Scheme

Edit `src/styles/theme.css`:

```css
:root {
  --primary-blue: #1e40af;      /* Main brand color */
  --red-danger: #ef4444;        /* High risk */
  --orange-warning: #f97316;    /* Medium risk */
  --green-safe: #10b981;        /* Low risk */
}
```

### Add More Crime Types

Edit `src/components/CrimeFilter.jsx`:

```javascript
const crimeTypes = [
  "Theft",
  "Assault",
  "Burglary",
  "Robbery",
  "YOUR_NEW_CRIME_TYPE",  // Add here
];
```

### Adjust Risk Thresholds

Edit `src/components/MapView.jsx`:

```javascript
const getRiskColor = (crimeCount) => {
  if (crimeCount > 100) return "#ef4444";    // Increase threshold
  if (crimeCount > 50) return "#f97316";
  return "#10b981";
};
```

### Change Map Center Location

Edit `src/components/MapView.jsx`:

```javascript
const defaultCenter = [28.6139, 77.2090];  // [latitude, longitude]
const defaultZoom = 12;
```

### Add More Cities

Edit `src/components/CrimeFilter.jsx`:

```javascript
const cities = ["Delhi", "Mumbai", "Bangalore", "YOUR_CITY"];
```

### Customize Alert Messages

Edit `src/pages/Dashboard.jsx`:

```javascript
setAlerts([
  {
    id: 1,
    title: "Your Alert Title",
    message: "Your alert message",
    type: "critical",  // or "warning"
    time: new Date().toLocaleTimeString(),
  },
]);
```

---

## File Structure Reference

```
src/
├── components/           # Reusable React components
│   ├── MapView.jsx       # Crime hotspot map
│   ├── HeatMap.jsx       # Heat density visualization
│   ├── CrimeFilter.jsx   # Filter controls
│   ├── StatsCard.jsx     # Risk summary cards
│   └── PatrolInfo.jsx    # Patrol recommendations
│
├── pages/                # Full page components
│   └── Dashboard.jsx     # Main dashboard
│
├── services/             # API & external services
│   └── api.js            # Axios API client
│
├── styles/               # CSS styling
│   └── theme.css         # Complete theme styles
│
├── App.js                # Main app component
├── index.js              # React DOM entry
└── index.css             # Global styles
```

---

## Performance Tips

1. **Reduce Hotspot Markers**: Filter data on backend
2. **Lazy Load Components**: Use React.lazy() for heavy components
3. **Memoize Components**: Use React.memo() for expensive renders
4. **Optimize API Calls**: Debounce filter changes
5. **Cache API Responses**: Implement caching layer
6. **Compress Images**: Use WebP format for map tiles

---

## Troubleshooting

### Issue: "Cannot find module 'react-leaflet'"

```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: "CORS error from backend"

Add to Flask backend:
```python
from flask_cors import CORS
CORS(app)
```

### Issue: "Map tiles not loading"

- Check internet connection
- Verify tile server is accessible
- Try different tile provider in MapView.jsx

### Issue: "No data displayed"

1. Verify backend is running on port 5000
2. Check API response format matches expected schema
3. Open DevTools → Network → check API responses

---

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag build/ folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm install gh-pages --save-dev
# Update package.json homepage
npm run build
npm run deploy
```

---

## Support & Resources

- **React Docs**: https://react.dev
- **Leaflet Docs**: https://leafletjs.com
- **Chart.js Docs**: https://www.chartjs.org
- **Axios Docs**: https://axios-http.com

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Start development server
3. ✅ Connect to backend API
4. ✅ Test all features
5. ✅ Customize for your needs
6. ✅ Deploy to production

---

**SafeCity Frontend Dashboard** - Built for smart policing 🛡️
