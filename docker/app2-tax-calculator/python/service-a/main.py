from flask import Flask, request, jsonify
from flask_cors import CORS
import requests, os, socket

app = Flask(__name__)

# CORS (must be before routes)
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
CORS(app, origins=[frontend_url])

HOSTNAME = socket.gethostname()
TAX_SERVICE_URL = os.getenv("TAX_SERVICE_URL", "http://service-b:4000")

@app.get("/price")
def price():
    amount = float(request.args.get("amount", 0))
    country = (request.args.get("country") or "DEFAULT").upper()

    r = requests.get(f"{TAX_SERVICE_URL}/tax", params={"country": country})
    j = r.json()

    tax = float(j.get("tax", 0))
    total = amount + tax

    return jsonify({
        "service": "A",
        "amount": amount,
        "tax": tax,
        "total": total,
        "container": HOSTNAME,
        "service_b_container": j.get("container")
    })
