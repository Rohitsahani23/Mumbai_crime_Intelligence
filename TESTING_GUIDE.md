# SafeCity System - Complete Testing Guide

## System Status
✅ **Both Frontend and Backend are Running**

### Running Services:
- **Backend**: Flask on `http://127.0.0.1:5000` 
- **Frontend**: React on `http://localhost:3000`

---

## Quick Start - View the Dashboard

1. Open your web browser
2. Navigate to: **`http://localhost:3000`**
3. You should see the SafeCity Intelligence Dashboard with:
   - Interactive map with crime hotspots
   - Crime filter panel on the left
   - Risk analysis cards
   - Patrol recommendations
   - Alert notifications

---

## Testing the Frontend Features

### 1. Map Interaction
- **View Hotspots**: Red/orange/green markers show crime concentration
- **Click Hotspot**: Select a hotspot to see patrol recommendations
- **Dark/Light Theme**: Toggle theme button in top-right corner of map

### 2. Crime Filtering
Navigate to the Filter Panel and try:
- **Crime Type Filter**: Select from: Theft, Assault, Burglary, Robbery, Murder, Rape, Cybercrime
- **Risk Level Filter**: Select: High, Medium, Low
- **Date Range**: Pick start and end dates
- **Apply Filters**: Click "Apply Filters" button
- **Reset**: Click "Reset" to clear all filters

### 3. Statistics & Cards
- View risk summary cards showing:
  - Area name
  - Crime count
  - Risk level (High/Medium/Low)
  - Risk score (0-100)

### 4. Patrol Information
- View recommended patrol units for each area (1-5 units)
- See deployment notes and alerts

### 5. Recent Incidents
- Scroll to "Recent Incidents" table
- View crime records with all details
- Expand to see more incidents

---

## Testing the Backend API

### Health Check
```
GET http://127.0.0.1:5000/api/health
```

Expected Response:
```json
{
  "success": true,
  "status": "API is running",
  "version": "1.0"
}
```

### Get All Crimes
```
GET http://127.0.0.1:5000/api/crimes
```

### Get Hotspots
```
GET http://127.0.0.1:5000/api/hotspots
```

### Get Risk Analysis
```
GET http://127.0.0.1:5000/api/risk
```

### Get Patrol Recommendations
```
GET http://127.0.0.1:5000/api/patrol
```

### Get Statistics
```
GET http://127.0.0.1:5000/api/stats
```

### Filtered Queries (Examples)
```
# Get only theft crimes
GET http://127.0.0.1:5000/api/crimes?crime_type=Theft

# Get high-risk crimes
GET http://127.0.0.1:5000/api/risk?crime_type=Assault,Murder

# Get date-filtered crimes
GET http://127.0.0.1:5000/api/crimes?date_from=2024-01-10&date_to=2024-01-15
```

---

## Sample Data

### Crime Records (10 total)
| ID | Crime Type | Date | Time | Area | Severity |
|----|-----------|------|------|------|----------|
| 1 | Theft | 2024-01-10 | 21:30 | Area A | Medium |
| 2 | Assault | 2024-01-11 | 22:00 | Area A | High |
| 3 | Burglary | 2024-01-12 | 02:15 | Area B | High |
| 4 | Robbery | 2024-01-13 | 20:45 | Area B | Medium |
| 5 | Theft | 2024-01-14 | 18:10 | Area C | Low |
| 6 | Cybercrime | 2024-01-15 | 10:30 | Area C | Medium |
| 7 | Rape | 2024-01-16 | 23:00 | Area D | High |
| 8 | Murder | 2024-01-17 | 01:45 | Area D | High |
| 9 | Theft | 2024-01-18 | 19:20 | Area E | Low |
| 10 | Assault | 2024-01-19 | 14:30 | Area E | Medium |

### Areas Covered
- Area A (Central)
- Area B (North)
- Area C (East)
- Area D (West)
- Area E (South)

---

## Expected Functionality Checklist

### Frontend Components
- [ ] Dashboard loads without errors
- [ ] Map displays with Leaflet basemap
- [ ] Hotspots appear as markers on map
- [ ] Crime filter panel is visible and functional
- [ ] Risk cards display correctly
- [ ] Heat map layer works
- [ ] Patrol information updates
- [ ] Alert notifications show
- [ ] Recent incidents table loads
- [ ] Dark/Light theme toggle works
- [ ] Responsive design works on mobile (resize browser)

### Backend API
- [ ] Health check responds successfully
- [ ] /api/crimes returns crime data
- [ ] /api/hotspots returns clustered data
- [ ] /api/risk returns risk analysis
- [ ] /api/patrol returns patrol suggestions
- [ ] /api/stats returns statistics
- [ ] Filtering parameters work (crime_type, risk_level, dates)
- [ ] CORS headers are present in responses
- [ ] Error handling works (try invalid data)

### Data Processing
- [ ] KMeans clustering identifies 4 hotspots
- [ ] Risk scores normalize to 0-100 range
- [ ] Patrol units scale 1-5 based on risk
- [ ] CSV data loads correctly

---

## Troubleshooting

### Frontend Issues

**Issue: Dashboard won't load**
- Check: Browser console (F12 → Console tab)
- Verify: React server running on port 3000
- Solution: Kill processes and restart with `npm start` from frontend folder

**Issue: Filters not working**
- Check: Network tab shows API calls to backend
- Verify: Backend is running on port 5000
- Solution: Check browser console for error messages

**Issue: Map not displaying**
- Verify: Leaflet CSS is loaded (check DevTools)
- Check: Browser console for errors
- Solution: Clear browser cache and reload

**Issue: "Blank page" or white screen**
- Check: Browser console for JavaScript errors
- Verify: All dependencies installed (npm install)
- Solution: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Backend Issues

**Issue: Port 5000 already in use**
```powershell
# Find and kill process using port 5000
Get-Process -Name python | Stop-Process -Force
```

**Issue: ModuleNotFoundError**
- Solution: Reinstall dependencies
```bash
pip install -r requirements.txt --upgrade
```

**Issue: CSV file not found**
- Verify: `d:\safe-city\data\crime_data.csv` exists
- Check: File is properly named and in correct location

**Issue: CORS errors**
- Verify: Backend has CORS enabled in app.py
- Check: Frontend API URL is correct (`http://127.0.0.1:5000`)

### Port Issues

**Kill processes using ports:**
```powershell
# Kill Python (Backend)
Get-Process -Name python | Stop-Process -Force

# Kill Node (Frontend)
Get-Process -Name node | Stop-Process -Force
```

---

## Development Notes

### File Structure
```
d:\safe-city\
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Dashboard page
│   │   ├── services/     # API client
│   │   └── styles/       # CSS styling
│   ├── package.json
│   └── public/
├── backend/              # Flask API
│   ├── app.py           # Main Flask app
│   ├── routes.py        # API endpoints
│   ├── config.py        # Configuration
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── requirements.txt
├── data/
│   └── crime_data.csv   # Crime dataset
└── ai_ml/               # ML models (future)
```

### Tech Stack
- **Frontend**: React 19, Leaflet 1.9, Axios, Chart.js
- **Backend**: Flask 2.3, Pandas, Scikit-learn
- **Data**: CSV, KMeans clustering
- **Styling**: CSS3 with CSS variables

---

## Performance Tips

1. **Map Rendering**: Hotspots are clustered for performance
2. **Data Loading**: Only processes visible crime records
3. **API Calls**: Implement caching for production
4. **Database**: Current uses CSV; upgrade to database for scale

---

## Security Considerations

For production deployment:
1. Remove debug mode from Flask
2. Implement authentication
3. Add input validation
4. Use HTTPS
5. Set up proper CORS policies
6. Implement rate limiting
7. Add database security

---

## Next Steps

1. **Add Real Data**:
   - Replace sample crime_data.csv with real data
   - Ensure CSV has columns: id, crime_type, date, time, latitude, longitude, area, severity

2. **Customize**:
   - Edit colors in `frontend/src/styles/theme.css`
   - Modify API base URL in `frontend/src/services/api.js`
   - Update filter options in components

3. **Deploy**:
   - Build frontend: `npm run build`
   - Deploy to hosting service
   - Use production WSGI server for Flask

4. **Integrate ML Models**:
   - Train on crime patterns
   - Implement in `ai_ml/` folder
   - Add to backend routes

---

## Support & Documentation

For detailed documentation, see:
- `README.md` - Main documentation
- `QUICKSTART.md` - Quick setup guide
- `ARCHITECTURE.md` - System design
- `FRONTEND_SETUP.md` - Frontend customization

---

**Last Updated**: 2024-01-20
**System Version**: 1.0 - Production Ready
