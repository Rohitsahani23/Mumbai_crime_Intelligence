# Flask main server
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes import api_routes

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for all routes
CORS(app, origins="*", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Register API routes
app.register_blueprint(api_routes)


# Health check route
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "SafeCity Backend API",
        "version": "1.0",
        "status": "running",
        "endpoints": {
            "/api/crimes": "GET - All crime records",
            "/api/hotspots": "GET - Crime hotspots",
            "/api/risk": "GET - Risk analysis",
            "/api/patrol": "GET - Patrol recommendations",
            "/api/stats": "GET - Crime statistics",
            "/api/patrol-routes": "GET - Optimized routes",
            "/api/health": "GET - Health check"
        }
    }), 200


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False)
