# Patrol suggestion logic
from services.crime_service import get_risk_analysis

def get_patrol_suggestions(filters=None):
    """Get patrol recommendations based on risk analysis"""
    risks = get_risk_analysis(filters)
    
    if not risks:
        return []
    
    suggestions = []
    
    for area in risks:
        risk_level = area["risk_level"]
        crime_count = area["crime_count"]
        
        # Determine units based on risk level
        if risk_level == "High":
            units = min(5, 2 + (crime_count // 15))  # Scale up to 5 units
            note = "High crime activity - increase patrols"
            alert = "Urgent: Deploy additional units"
        elif risk_level == "Medium":
            units = min(3, 1 + (crime_count // 20))
            note = "Moderate activity - regular patrol"
            alert = "Monitor closely"
        else:
            units = 1
            note = "Low activity - routine patrol"
            alert = None
        
        suggestion = {
            "area": area["area"],
            "recommended_patrol_units": int(units),
            "note": note,
            "risk_level": risk_level,
            "crime_count": crime_count
        }
        
        if alert:
            suggestion["additional_notes"] = alert
        
        suggestions.append(suggestion)
    
    return suggestions


def optimize_patrol_routes(hotspots):
    """Optimize patrol routes based on hotspots"""
    if not hotspots:
        return []
    
    # Sort hotspots by crime count
    sorted_hotspots = sorted(hotspots, key=lambda x: x['crime_count'], reverse=True)
    
    routes = []
    for idx, hotspot in enumerate(sorted_hotspots[:5]):  # Top 5 hotspots
        route = {
            "route_id": idx + 1,
            "hotspot_id": hotspot['hotspot_id'],
            "priority": "High" if idx == 0 else "Medium" if idx < 3 else "Low",
            "coordinates": [hotspot['center_lat'], hotspot['center_lng']],
            "estimated_time": f"{15 + (idx * 10)} minutes"
        }
        routes.append(route)
    
    return routes
