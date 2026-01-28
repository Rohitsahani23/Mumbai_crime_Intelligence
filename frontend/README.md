# SafeCity - Smart Crime Mapping & Intelligence Dashboard

A modern, professional React-based dashboard for real-time crime mapping, hotspot detection, and patrol recommendations. Built with React, Leaflet, and Chart.js.

## 🚀 Features

### 1. **Interactive Map Visualization**
- Real-time crime hotspot mapping with Leaflet
- Dynamic color-coded markers (Red = High Risk, Orange = Medium, Green = Low)
- Hover tooltips showing hotspot details
- Click to select hotspots and view patrol recommendations
- Dark/Light theme toggle for better visibility

### 2. **Comprehensive Filtering System**
- **City Selection**: Filter by multiple cities (Delhi, Mumbai, Bangalore, etc.)
- **Crime Type Multi-Select**: Filter by 8+ crime categories
- **Age Range Selector**: Min-max age range slider
- **Date Range Picker**: Filter incidents by date
- **Risk Level Filter**: Low/Medium/High risk categorization
- **Collapsible Filter Panel**: Clean UI with expand/collapse functionality

### 3. **Dashboard Components**
- **Risk Summary Cards**: Visual cards showing crime statistics per area
- **Crime Density Heatmap**: Geographic visualization of crime concentration
- **Recent Incidents Table**: Sortable table with severity badges
- **Patrol Recommendations**: AI-powered patrol unit suggestions
- **Alert Notifications**: Real-time alerts for high-risk zones

### 4. **Advanced Features**
- Real-time data updates based on filter selections
- Responsive design (Desktop, Tablet, Mobile)
- Smooth animations and transitions
- Color-coded severity badges
- CSV export functionality
- Professional styling with CSS

### 5. **Integration**
- Axios-based REST API client
- Connected to Flask backend at `http://127.0.0.1:5000/api`
- Supports multiple endpoints: `/crimes`, `/hotspots`, `/risk`, `/patrol`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── MapView.jsx           # Interactive crime map with markers
│   │   ├── HeatMap.jsx           # Heat density visualization
│   │   ├── CrimeFilter.jsx       # Comprehensive filter controls
│   │   ├── StatsCard.jsx         # Risk summary cards
│   │   └── PatrolInfo.jsx        # Patrol recommendations
│   ├── pages/
│   │   └── Dashboard.jsx         # Main dashboard page
│   ├── services/
│   │   └── api.js                # API client & endpoints
│   ├── styles/
│   │   └── theme.css             # Complete styling (Color palette, layouts, etc.)
│   ├── App.js                    # Main app component
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
├── package.json                  # Dependencies
└── README.md                      # This file
```

## 📦 Dependencies

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-leaflet": "^5.0.0",
  "leaflet": "^1.9.4",
  "axios": "^1.13.4",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🔌 API Integration

The dashboard expects the Flask backend to provide these endpoints:

### Endpoints Expected

```javascript
GET /api/crimes       - Fetch crime records
GET /api/hotspots     - Get crime hotspots
GET /api/risk         - Get risk scores by area
GET /api/patrol       - Get patrol recommendations
```

### API Response Format Example

```javascript
// Hotspots
{
  hotspot_id: 1,
  center_lat: 28.6139,
  center_lng: 77.2090,
  crime_count: 45,
  crime_type: "Theft",
  last_date: "2024-01-20"
}

// Risk
{
  area: "Area A",
  risk_level: "High",
  risk_score: 87.5,
  crime_count: 45
}

// Patrol
{
  area: "Area A",
  recommended_patrol_units: 5,
  note: "High crime activity - increase patrols"
}
```

## 🎨 Color Palette

- **Primary Blue**: `#1e40af` - Main brand color
- **Red (High Risk)**: `#ef4444` - Critical alert zones
- **Orange (Medium Risk)**: `#f97316` - Warning zones
- **Green (Low Risk)**: `#10b981` - Safe areas
- **White**: `#ffffff` - Card backgrounds
- **Dark Text**: `#1f2937` - Primary text color

## 🎯 Key Components

### MapView.jsx
- Interactive Leaflet map with crime hotspot markers
- Color-coded risk visualization
- Hover information tooltips
- Click to select hotspots
- Dark/Light theme toggle
- Legend explaining risk colors

### CrimeFilter.jsx
- Collapsible filter panel
- Multiple filter options (City, Crime Type, Age, Date, Risk Level)
- Apply/Reset buttons
- CSV export functionality

### StatsCard.jsx
- Risk summary cards by area
- Shows crime count and risk score
- Color-coded by risk level
- Responsive grid layout

### HeatMap.jsx
- Geographic heat density visualization
- Circular markers representing crime concentration
- Tooltip on hover
- Dynamic radius based on crime count

### PatrolInfo.jsx
- Patrol unit recommendations
- Area-wise patrol suggestions
- Additional alerts and notes
- Shows selected hotspot context

### Dashboard.jsx
- Main orchestrator component
- Manages overall state and filters
- Coordinates all sub-components
- Displays alerts and recent incidents

## 🎮 Usage Guide

### 1. Filter Crime Data
1. Click the filter panel to expand
2. Select a city, crime types, date range, and risk levels
3. Click "Apply Filters" to update the dashboard

### 2. View Hotspots
- **Interactive Map**: Hover over markers to see details
- **Click to Select**: Click a marker to see patrol suggestions
- **Color Code**: Red = High, Orange = Medium, Green = Low

### 3. Export Data
- Click "Export CSV" in the filter panel
- Data exports as CSV for external analysis

### 4. Toggle Map Theme
- Click the moon/sun icon on the map
- Switch between light and dark themes

## 📊 Performance Optimizations

- Lazy loading of components
- Debounced API calls on filter changes
- Memoized component renders
- Efficient state management
- CSS animations for smooth UX

## 🐛 Troubleshooting

### API Connection Issues
- Ensure Flask backend is running on `http://127.0.0.1:5000`
- Check CORS is enabled on backend
- View console errors for detailed messages

### Map Not Loading
- Verify Leaflet CSS is imported: `import "leaflet/dist/leaflet.css"`
- Check network for tile layer connectivity
- Try toggling dark/light theme

### Data Not Showing
- Verify backend is returning data in expected format
- Check Network tab in DevTools for API responses
- Ensure filters match available data

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ - Full layout with all components
- **Tablet**: 768px - 1199px - Adjusted grid layouts
- **Mobile**: <768px - Single column layout, optimized controls

## 🔮 Future Enhancements

- Real-time WebSocket updates
- Predictive modeling for crime hotspots
- Machine learning-based patrol optimization
- SMS/Email alerts for high-risk zones
- User authentication and roles
- Historical trend analysis
- 3D map visualization
- Mobile app version

## 📄 License

This project is part of the SafeCity initiative.

## 👥 Support

For issues or feature requests, contact the development team.

---

**SafeCity Dashboard** - Making cities smarter and safer 🛡️

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
