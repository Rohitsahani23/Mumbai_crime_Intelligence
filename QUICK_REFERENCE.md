# SafeCity - Quick Reference

## ⚡ Start the System (3 Steps)

### Step 1: Start Backend
```powershell
cd D:\safe-city\backend
python app.py
# Runs on: http://127.0.0.1:5000
```

### Step 2: Start Frontend
```powershell
cd D:\safe-city\frontend
npm start
# Runs on: http://localhost:3000
```

### Step 3: Open Browser
```
http://localhost:3000
```

---

## 🎯 Key URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Dashboard | http://localhost:3000 | Main UI |
| API Health | http://127.0.0.1:5000/api/health | Check backend |
| API Docs | http://127.0.0.1:5000 | API documentation |

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/health | GET | Health check |
| /api/crimes | GET | Crime records |
| /api/hotspots | GET | Crime hotspots |
| /api/risk | GET | Risk analysis |
| /api/patrol | GET | Patrol recommendations |
| /api/stats | GET | Statistics |
| /api/patrol-routes | GET | Optimized routes |

---

## 🛑 Stop Services

### PowerShell
```powershell
# Kill all Python processes
Get-Process -Name python | Stop-Process -Force

# Kill all Node processes
Get-Process -Name node | Stop-Process -Force
```

### Terminal (while running)
```
Press Ctrl+C in each terminal window
```

---

## 📊 Dashboard Features

- ✅ Interactive map with hotspot markers
- ✅ Crime filtering (type, risk, date)
- ✅ Risk analysis by area
- ✅ Patrol recommendations
- ✅ Heat density visualization
- ✅ Dark/Light theme toggle
- ✅ Recent incidents table
- ✅ Alert notifications

---

## 🔍 Test API in Browser

Copy and paste into address bar:
```
http://127.0.0.1:5000/api/crimes
http://127.0.0.1:5000/api/hotspots
http://127.0.0.1:5000/api/risk
http://127.0.0.1:5000/api/patrol
http://127.0.0.1:5000/api/stats
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `frontend/src/services/api.js` | API client config |
| `backend/app.py` | Flask server |
| `backend/routes.py` | API endpoints |
| `data/crime_data.csv` | Crime data |
| `frontend/src/styles/theme.css` | Styling |

---

## ⚙️ Configuration

**Backend Port**: 5000 (in `backend/app.py`)
**Frontend Port**: 3000 (React default)
**Data File**: `data/crime_data.csv`
**API Base URL**: `http://127.0.0.1:5000/api`

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Kill Node: `Get-Process node \| Stop-Process -Force` |
| Port 5000 in use | Kill Python: `Get-Process python \| Stop-Process -Force` |
| "Cannot find module" | Run: `npm install --legacy-peer-deps` |
| CSV not found | Check: `d:\safe-city\data\crime_data.csv` exists |
| API not responding | Verify: Backend running on http://127.0.0.1:5000 |
| Blank page | Check: Browser console (F12) for errors |

---

## 📈 Performance Expectations

- Dashboard load time: < 2 seconds
- Map rendering: < 1 second
- API response time: < 500ms
- Filter application: < 1 second
- Hotspot clustering: Automatic (KMeans)

---

## 🔐 Default Configuration

- **Debug Mode**: ON (development)
- **CORS**: Enabled for all origins
- **Data Path**: `../data/crime_data.csv`
- **Crime Types**: 7 types (Theft, Assault, Burglary, etc.)
- **Areas**: 5 areas (Area A-E)
- **Sample Records**: 10 crimes

---

## 📚 Documentation Files

- `README.md` - Full documentation
- `QUICKSTART.md` - 5-minute setup
- `TESTING_GUIDE.md` - Complete testing guide
- `ARCHITECTURE.md` - System design
- `SYSTEM_RUNNING.md` - Running status

---

## 🎓 Learning Resources

### File Locations:
- **React Components**: `frontend/src/components/`
- **API Client**: `frontend/src/services/api.js`
- **Backend Services**: `backend/services/`
- **Styling**: `frontend/src/styles/theme.css`

### Key Technologies:
- React 19.2.4
- Flask 2.3+
- Pandas 2.0+
- Scikit-learn 1.3+
- Leaflet 1.9.4

---

## ✅ System Requirements

- ✅ Python 3.8+
- ✅ Node.js 14+
- ✅ npm 6+
- ✅ Modern web browser
- ✅ 200MB disk space
- ✅ Ports 3000 & 5000 available

---

## 🚀 First Time Setup

```powershell
# 1. Install backend dependencies
cd d:\safe-city\backend
pip install -r requirements.txt

# 2. Install frontend dependencies
cd d:\safe-city\frontend
npm install --legacy-peer-deps

# 3. Start backend (Terminal 1)
cd d:\safe-city\backend
python app.py

# 4. Start frontend (Terminal 2)
cd d:\safe-city\frontend
npm start

# 5. Open browser
# http://localhost:3000
```

---

**Version**: 1.0
**Status**: ✅ Production Ready
**Last Updated**: 2024-01-20
