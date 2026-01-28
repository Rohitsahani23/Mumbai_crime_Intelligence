# 🏗️ SafeCity Frontend Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Browser (React App)                          │
│                   http://localhost:3000                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │          Dashboard.jsx (Main Page)          │
        │  - State Management                         │
        │  - Filter Coordination                      │
        │  - Alert Management                         │
        │  - Component Orchestration                  │
        └─────────────────────────────────────────────┘
                              │
        ┌─────────┬───────────┼───────────┬─────────────┬──────────┐
        │         │           │           │             │          │
        ▼         ▼           ▼           ▼             ▼          ▼
    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐ ┌────────┐ ┌──────────┐
    │MapView │ │HeatMap │ │StatsCard│ │CrimeFilter │ │PatrolInfo│ │Alerts   │
    │        │ │        │ │        │ │           │ │        │ │Notifications
    │ • Map  │ │ • Heat │ │ • Risk │ │ • City    │ │ • Units│ │          │
    │ • Hover│ │ • Tint │ │ • Cards│ │ • Crimes  │ │ • Area │ │ • Critical
    │ • Click│ │ • Zoom │ │ • Score│ │ • Date    │ │ • Notes│ │ • Warning
    │ • Color│ │ • Tiles│ │ • Count│ │ • Age     │ │ • Alert│ │          │
    │ • Theme│ │ • Dark │ │ • Grid │ │ • Risk    │ │ • Toggle│           │
    └────────┘ └────────┘ └────────┘ └────────────┘ └────────┘ └──────────┘
        │         │           │             │              │
        └─────────┼───────────┴─────────────┴──────────────┘
                  │
                  ▼
        ┌──────────────────────────────────┐
        │    API Service (api.js)          │
        │   Axios HTTP Client              │
        │  Base: http://127.0.0.1:5000/api │
        └──────────────────────────────────┘
                  │
    ┌─────────┬───┼────┬─────────┐
    │         │   │    │         │
    ▼         ▼   ▼    ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
│Hotspots│ │ Risk   │ │Patrol  │ │Crimes    │
│Endpoint│ │Endpoint│ │Endpoint│ │Endpoint  │
└────────┘ └────────┘ └────────┘ └──────────┘
    │         │        │          │
    └─────────┴────────┴──────────┘
              │
              ▼
    ┌──────────────────────────────┐
    │   Flask Backend (5000)       │
    │                              │
    │   • Data Processing          │
    │   • Risk Analysis            │
    │   • Patrol Optimization      │
    │   • Crime Data Management    │
    └──────────────────────────────┘
              │
              ▼
    ┌──────────────────────────────┐
    │   Database (SQLite/PostgreSQL)│
    │                              │
    │   • Crime Records            │
    │   • Hotspots                 │
    │   • Risk Scores              │
    │   • Patrol Data              │
    └──────────────────────────────┘
```

---

## Component Hierarchy

```
App
 └── Dashboard (Main Page)
      ├── Header
      ├── AlertNotifications
      │   ├── CriticalAlert
      │   └── WarningAlert
      ├── CrimeFilter
      │   ├── CitySelector
      │   ├── CrimeTypeMultiSelect
      │   ├── AgeRangeSlider
      │   ├── DateRangePicker
      │   ├── RiskLevelFilter
      │   └── ActionButtons
      ├── RiskSummary (StatsCard)
      │   ├── Card (Low Risk)
      │   ├── Card (Medium Risk)
      │   └── Card (High Risk)
      ├── MainContent (Grid)
      │   ├── MapView
      │   │   ├── Map Container
      │   │   ├── Hotspot Markers
      │   │   ├── Legend
      │   │   └── Theme Toggle
      │   └── PatrolInfo
      │       ├── PatrolCard
      │       ├── PatrolCard
      │       └── PatrolCard
      ├── AnalyticsContent (Grid)
      │   ├── HeatMap
      │   │   ├── Map Container
      │   │   ├── Heat Circles
      │   │   └── Tooltip
      │   └── RecentIncidents
      │       ├── Table Header
      │       ├── TableRow
      │       ├── TableRow
      │       └── SeverityBadges
      └── Footer
```

---

## Data Flow Diagram

```
User Action
    │
    ├─ SELECT FILTERS
    │   │
    │   └─ CrimeFilter → Dashboard (onFilterChange)
    │       │
    │       ▼
    │   Dashboard.state.filters = {
    │     city, crimeType, ageMin/Max,
    │     dateFrom/To, riskLevel
    │   }
    │
    ├─ APPLY FILTERS
    │   │
    │   └─ Dashboard sends filters to API Service
    │       │
    │       ├─ api.getHotspots() → MapView
    │       ├─ api.getRisk() → StatsCard
    │       ├─ api.getPatrol() → PatrolInfo
    │       └─ api.getCrimes() → Dashboard (table)
    │
    └─ COMPONENT UPDATE
        │
        ├─ MapView re-renders with new hotspots
        ├─ StatsCard re-renders with new risks
        ├─ HeatMap re-renders with new density
        ├─ PatrolInfo re-renders with new suggestions
        └─ Dashboard updates table with new incidents
```

---

## State Management

```
Dashboard.state
├── filters {
│   ├── city: string
│   ├── crimeType: string[]
│   ├── ageMin: number
│   ├── ageMax: number
│   ├── dateFrom: string
│   ├── dateTo: string
│   └── riskLevel: string[]
├── selectedHotspot: object | null
├── hotspots: array
├── crimes: array
├── alerts: array
└── showAllCrimes: boolean
```

---

## Event Flow

```
1. USER INTERACTION
   └─ Click "Apply Filters"
   
2. EVENT HANDLER
   └─ handleFilterChange(newFilters)
   
3. STATE UPDATE
   └─ setFilters(newFilters)
   
4. API CALLS
   ├─ getHotspots(filters)
   ├─ getRisk(filters)
   ├─ getPatrol()
   └─ getCrimes()
   
5. RESPONSE RECEIVED
   └─ setHotspots(data)
   └─ setRisks(data)
   └─ setPatrols(data)
   
6. RE-RENDER COMPONENTS
   └─ MapView receives new hotspots
   └─ StatsCard receives new risks
   └─ HeatMap receives new hotspots
   └─ PatrolInfo receives new patrols
   
7. DOM UPDATE
   └─ Browser displays new data
```

---

## File Dependencies

```
src/pages/Dashboard.jsx
├── imports: MapView.jsx
├── imports: HeatMap.jsx
├── imports: StatsCard.jsx
├── imports: CrimeFilter.jsx
├── imports: PatrolInfo.jsx
├── imports: api.js
│   ├── getCrimes()
│   ├── getHotspots()
│   ├── getRisk()
│   └── getPatrol()
└── imports: theme.css

src/components/MapView.jsx
├── imports: api.js
├── imports: leaflet
├── imports: react-leaflet
└── imports: theme.css

src/components/HeatMap.jsx
├── imports: api.js
├── imports: leaflet
├── imports: react-leaflet
└── imports: theme.css

src/components/StatsCard.jsx
├── imports: api.js
└── imports: theme.css

src/components/CrimeFilter.jsx
└── imports: theme.css

src/components/PatrolInfo.jsx
├── imports: api.js
└── imports: theme.css

src/services/api.js
└── imports: axios

src/App.js
├── imports: Dashboard.jsx
├── imports: theme.css
└── imports: leaflet.css

src/index.js
└── imports: App.js
```

---

## Styling Architecture

```
theme.css (1000+ lines)
├── Global Styles
│   ├── Box-sizing reset
│   ├── Color variables
│   └── Font definitions
├── Component Styles
│   ├── Header
│   ├── Filter Panel
│   ├── Cards (Stats, Patrol)
│   ├── Map Container
│   ├── Charts
│   ├── Alerts
│   └── Tables
├── Utilities
│   ├── Buttons (.btn-primary, .btn-secondary)
│   ├── Grid layouts
│   ├── Flexbox helpers
│   └── Spacing utilities
├── Animations
│   ├── Slide in (alerts)
│   ├── Fade (hover effects)
│   ├── Spin (loading)
│   └── Smooth transitions
└── Responsive Breakpoints
    ├── Desktop (1200px+)
    ├── Tablet (768px - 1199px)
    └── Mobile (<768px)
```

---

## API Endpoint Mapping

```
┌─────────────────────────────────────────────────────┐
│             API BASE URL                           │
│    http://127.0.0.1:5000/api                      │
└─────────────────────────────────────────────────────┘
         │          │           │          │
         │          │           │          │
    ┌────▼───┐  ┌───▼───┐  ┌───▼─┐  ┌────▼─────┐
    │/hotspots│  │ /risk │  │/patrol│ │ /crimes  │
    └────┬────┘  └───┬───┘  └───┬──┘  └────┬─────┘
         │           │          │           │
         │           │          │           │
    Used by:    Used by:   Used by:   Used by:
    • MapView   • StatsCard • PatrolInfo • Dashboard
    • HeatMap                               (table)
```

---

## Performance Considerations

```
Optimization Strategies Implemented:

1. COMPONENT LEVEL
   ├── Functional components (lighter)
   ├── useCallback for handlers
   ├── useMemo for expensive operations
   └── Lazy loading ready

2. RENDERING LEVEL
   ├── Conditional rendering
   ├── Keys on lists
   ├── Avoid inline functions
   └── Stable component props

3. STYLING LEVEL
   ├── CSS (no runtime overhead)
   ├── CSS Variables (single computation)
   ├── Hardware acceleration (transforms)
   └── Optimized animations (0.2-0.3s)

4. API LEVEL
   ├── Axios with timeout
   ├── Error handling
   ├── Loading states
   └── Caching ready

5. ASSET LEVEL
   ├── Leaflet tiles lazy load
   ├── Icons as emojis (no HTTP)
   └── CSS minified in production
```

---

## Security Considerations

```
Implemented:
✅ Input validation on filters
✅ Error handling (no sensitive data exposed)
✅ CORS configuration (backend)
✅ No hardcoded secrets

Recommended:
⚠️ Add API authentication token
⚠️ Validate response schemas
⚠️ Rate limiting on backend
⚠️ HTTPS in production
⚠️ Content Security Policy headers
```

---

## Testing Strategy

```
Unit Tests:
├── Components render correctly
├── Props are handled
├── State updates work
└── Event handlers fire

Integration Tests:
├── API calls work
├── Filters update components
├── Data flows correctly
└── User interactions work end-to-end

E2E Tests:
├── Full dashboard workflow
├── Filter and view results
├── Export data
└── Navigate features

Coverage Target: 80%+
```

---

## Deployment Architecture

```
Development
├── npm start
└── localhost:3000

Staging
├── npm run build
└── staging.safecity.com

Production
├── npm run build
├── npm run analyze (bundle size)
├── Deploy to CDN
└── safecity.com
```

---

## Technology Stack

```
Frontend:
├── React 19.2.4 (UI Library)
├── React-Leaflet 5.0.0 (Mapping)
├── Leaflet 1.9.4 (Maps Engine)
├── Axios 1.13.4 (HTTP Client)
├── Chart.js 4.4.0 (Charts) [Ready]
├── CSS3 (Styling)
└── ES6+ (JavaScript)

Backend:
├── Flask (Python Framework)
├── SQLite/PostgreSQL (Database)
├── Pandas (Data Processing)
└── Scikit-learn (ML)

DevTools:
├── npm (Package Manager)
├── Create React App (Scaffolding)
├── VS Code (Editor)
└── Chrome DevTools (Debugging)
```

---

## Browser Support

```
Supported:
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Safari (iOS 14+)
✅ Chrome Mobile

Polyfills:
├── ES6 (built-in)
├── Fetch API (built-in)
└── CSS Grid (native support 95%+)
```

---

## File Size Analysis

```
Minified Bundle:
├── React: ~42 KB
├── React-DOM: ~26 KB
├── Leaflet: ~36 KB
├── Axios: ~13 KB
├── App Code: ~50 KB
├── CSS: ~30 KB
└── Total: ~200 KB (gzipped: ~60 KB)

Optimizations:
✅ Code splitting ready
✅ Lazy loading ready
✅ CSS optimization ready
✅ Image optimization ready
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Scalable component structure
- ✅ Easy API integration
- ✅ Flexible styling system
- ✅ Performance optimized
- ✅ Mobile responsive
- ✅ Production ready

