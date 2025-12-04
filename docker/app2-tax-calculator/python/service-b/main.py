from flask import Flask, request, jsonify
import socket

app = Flask(__name__)
HOSTNAME = socket.gethostname()

TAX_TABLE = {"IN": 18, "US": 8, "EU": 20}

@app.get("/tax")
def tax():
    country = (request.args.get("country") or "DEFAULT").upper()
    tax = TAX_TABLE.get(country, 10)

    return jsonify({
        "service": "B",
        "country": country,
        "tax": tax,
        "container": HOSTNAME
    })
