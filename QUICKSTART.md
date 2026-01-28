# 🚀 Quick Start Guide - SafeCity Dashboard

## 5-Minute Setup

### Step 1: Install Dependencies (2 min)
```bash
cd frontend
npm install
```

### Step 2: Start Development Server (1 min)
```bash
npm start
```

### Step 3: Ensure Backend Running (1 min)
```bash
# In another terminal, from backend directory
cd backend
python app.py
```

### Step 4: Open Browser (1 min)
Visit: `http://localhost:3000`

✅ **Dashboard is now running!**

---

## 📋 What You Get

### Interactive Map 🗺️
- Click hotspots to see patrol info
- Hover for details
- Toggle dark/light mode

### Smart Filters 🔍
- Filter by city, crime type, date, age, risk level
- Click "Apply Filters" to update
- "Export CSV" to download data

### Risk Analytics 📊
- See crime stats by area
- Color-coded risk levels
- Real-time updates

### Patrol Suggestions 🚓
- AI-powered unit recommendations
- Area-specific strategies
- Alert notes

### Heat Visualization 🔥
- Geographic crime density
- Concentration hotspots
- Dynamic sizing

---

## 🎯 Key Files

| File | What it Does |
|------|--------------|
| `src/pages/Dashboard.jsx` | Main dashboard - orchestrates everything |
| `src/components/MapView.jsx` | Crime hotspot map |
| `src/components/CrimeFilter.jsx` | Filter controls |
| `src/components/StatsCard.jsx` | Risk summary cards |
| `src/components/HeatMap.jsx` | Heat density map |
| `src/components/PatrolInfo.jsx` | Patrol recommendations |
| `src/services/api.js` | Backend API calls |
| `src/styles/theme.css` | All styling |

---

## 🔌 API Configuration

### Current Setup
```javascript
Base URL: http://127.0.0.1:5000/api

Endpoints:
- /hotspots    → Map & Heat visualization
- /risk        → Risk analytics cards
- /patrol      → Patrol recommendations
- /crimes      → Recent incidents table
```

### Change Backend URL
Edit `src/services/api.js`:
```javascript
const BASE_URL = "http://YOUR_SERVER:PORT/api";
```

---

## 🎨 Quick Customization

### Change Colors
Edit `src/styles/theme.css`:
```css
--primary-blue: #1e40af;      /* Main color */
--red-danger: #ef4444;        /* High risk */
--orange-warning: #f97316;    /* Medium risk */
--green-safe: #10b981;        /* Low risk */
```

### Add Crime Type
Edit `src/components/CrimeFilter.jsx` (line ~25):
```javascript
const crimeTypes = [
  "Theft",
  "Assault",
  "YOUR_CRIME_TYPE",  // ← Add here
];
```

### Add City
Edit `src/components/CrimeFilter.jsx` (line ~31):
```javascript
const cities = [
  "Delhi",
  "YOUR_CITY",  // ← Add here
];
```

---

## ⚡ Common Tasks

### Run Production Build
```bash
npm run build
```
Creates optimized version in `build/` folder

### Run Tests
```bash
npm test
```

### Clear Cache & Reinstall
```bash
rm -rf node_modules
npm install
```

### Check Dependencies
```bash
npm list
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| **API not connecting** | Ensure Flask backend running on port 5000 |
| **Map not showing** | Check internet (needs OpenStreetMap tiles) |
| **Filters not working** | Verify backend returns correct data format |
| **Slow performance** | Try `npm run build` and check Network tab |
| **Module not found** | Run `npm install` again |

---

## 📱 Test on Mobile

### Using ngrok (expose local to internet):
```bash
# Install ngrok: https://ngrok.com
ngrok http 3000

# Now accessible at: https://your-ngrok-url.ngrok.io
```

### Test Responsive:
- Press F12 in Chrome
- Click device icon (top-left)
- Select mobile device
- Reload page

---

## 📊 API Response Format

### Expected from Backend:

**Hotspots:**
```json
[
  {
    "hotspot_id": 1,
    "center_lat": 28.6139,
    "center_lng": 77.2090,
    "crime_count": 45,
    "crime_type": "Theft",
    "last_date": "2024-01-20"
  }
]
```

**Risk:**
```json
[
  {
    "area": "Area A",
    "risk_level": "High",
    "risk_score": 87.5,
    "crime_count": 45
  }
]
```

**Patrol:**
```json
[
  {
    "area": "Area A",
    "recommended_patrol_units": 5,
    "note": "High crime activity"
  }
]
```

---

## 💡 Pro Tips

1. **Speed Up Development**
   - Use VS Code REST Client to test APIs first
   - Keep DevTools Network tab open
   - Use `console.log()` for debugging

2. **Improve Performance**
   - Filter data on backend when possible
   - Limit hotspots to visible map area
   - Cache API responses

3. **Better UX**
   - Add loading skeletons
   - Pre-load data while filters being set
   - Show error messages to users

4. **For Production**
   - Set `.env` variables for backend URL
   - Enable CORS on backend
   - Add authentication layer
   - Implement data refresh interval

---

## 📚 Learn More

- **React**: https://react.dev/learn
- **Leaflet Maps**: https://leafletjs.com/examples.html
- **Axios**: https://axios-http.com/docs/intro
- **CSS Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/

---

## 🎯 What's Next?

### Short-term:
1. Connect to your backend
2. Test all features
3. Customize colors/cities
4. Deploy to staging

### Long-term:
1. Add more visualizations
2. Real-time WebSocket updates
3. Machine learning integration
4. Mobile app version
5. Authentication system

---

## 📞 Helpful Commands

```bash
# Start development
npm start

# Build for production
npm run build

# Run tests
npm test

# Analyze bundle size
npm run build -- --stats

# Install new package
npm install package-name

# Update all packages
npm update

# Remove node_modules (heavy operation)
rm -rf node_modules
npm install
```

---

## ✨ Features at a Glance

| Feature | Status |
|---------|--------|
| Interactive Map | ✅ Done |
| Filter System | ✅ Done |
| Risk Analytics | ✅ Done |
| Patrol Suggestions | ✅ Done |
| Heat Visualization | ✅ Done |
| Dark/Light Theme | ✅ Done |
| Responsive Design | ✅ Done |
| CSV Export | ✅ Done |
| Alert Notifications | ✅ Done |
| API Integration | ✅ Ready |

---

## 🎉 You're All Set!

Your SafeCity Dashboard is ready to:
- Visualize crime hotspots
- Analyze risk patterns
- Optimize patrol routes
- Make data-driven decisions
- Keep communities safer

**Questions?** Check the full docs in:
- `README.md` - Complete documentation
- `FRONTEND_SETUP.md` - Detailed setup guide
- `DASHBOARD_SUMMARY.md` - Feature overview

---

**SafeCity Dashboard - Making Cities Smarter 🛡️**

Happy coding! 🚀
