# API routes
from flask import Blueprint, jsonify, request
from services.crime_service import (
    get_all_crimes,
    get_hotspots,
    get_risk_analysis,
    get_crime_stats,
    get_crime_alerts
)
from services.patrol_service import get_patrol_suggestions, optimize_patrol_routes

api_routes = Blueprint("api", __name__, url_prefix="/api")


@api_routes.route("/crimes", methods=["GET"])
def crimes():
    """Get all crime records with optional filters"""
    try:
        filters = {}
        
        # Parse filters from query parameters
        crime_types = request.args.get('crime_type')
        if crime_types:
            filters['crime_type'] = crime_types.split(',')
        
        risk_levels = request.args.get('risk_level')
        if risk_levels:
            filters['risk_level'] = [r.capitalize() for r in risk_levels.split(',')]
        
        date_from = request.args.get('date_from')
        if date_from:
            filters['date_from'] = date_from
        
        date_to = request.args.get('date_to')
        if date_to:
            filters['date_to'] = date_to
        
        crimes = get_all_crimes(filters)
        
        return jsonify({
            "success": True,
            "data": crimes,
            "count": len(crimes)
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_routes.route("/hotspots", methods=["GET"])
def hotspots():
    """Get crime hotspots"""
    try:
        filters = {}
        
        crime_types = request.args.get('crime_type')
        if crime_types:
            filters['crime_type'] = crime_types.split(',')
        
        hotspots_data = get_hotspots(filters)
        
        # Handle error response
        if isinstance(hotspots_data, dict) and 'error' in hotspots_data:
            return jsonify(hotspots_data), 400
        
        return jsonify({
            "success": True,
            "data": hotspots_data,
            "count": len(hotspots_data)
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_routes.route("/risk", methods=["GET"])
def risk():
    """Get risk analysis by area"""
    try:
        filters = {}
        
        crime_types = request.args.get('crime_type')
        if crime_types:
            filters['crime_type'] = crime_types.split(',')
        
        risk_data = get_risk_analysis(filters)
        
        return jsonify({
            "success": True,
            "data": risk_data,
            "count": len(risk_data)
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_routes.route("/patrol", methods=["GET"])
def patrol():
    """Get patrol recommendations"""
    try:
        filters = {}
        
        crime_types = request.args.get('crime_type')
        if crime_types:
            filters['crime_type'] = crime_types.split(',')
        
        patrol_data = get_patrol_suggestions(filters)
        
        return jsonify({
            "success": True,
            "data": patrol_data,
            "count": len(patrol_data)
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_routes.route("/stats", methods=["GET"])
def stats():
    """Get overall crime statistics"""
    try:
        stats_data = get_crime_stats()
        
        return jsonify({
            "success": True,
            "data": stats_data
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_routes.route("/patrol-routes", methods=["GET"])
def patrol_routes():
    """Get optimized patrol routes"""
    try:
        hotspots_data = get_hotspots()
        
        if isinstance(hotspots_data, dict) and 'error' in hotspots_data:
            return jsonify(hotspots_data), 400
        
        routes = optimize_patrol_routes(hotspots_data)
        
        return jsonify({
            "success": True,
            "data": routes,
            "count": len(routes)
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_routes.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({
        "success": True,
        "status": "API is running",
        "version": "1.0"
    }), 200


@api_routes.route("/alerts", methods=["GET"])
def alerts():
    """Get real-time crime alerts for high-risk areas"""
    try:
        alerts_data = get_crime_alerts()
        
        return jsonify({
            "success": True,
            "data": alerts_data,
            "count": len(alerts_data)
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

