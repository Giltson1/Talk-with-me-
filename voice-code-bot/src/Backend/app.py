import os
import requests
from flask import Flask
from flask_cors import CORS
from flask import jsonify
from flask import request
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure CORS properly for security
CORS(app, origins=[
    "http://localhost:3000",
    "https://your-production-domain.com"
])

# Load token from environment variable with validation
HUGGINGFACE_API_TOKEN = os.environ.get("HF_API_TOKEN")
if not HUGGINGFACE_API_TOKEN:
    print("Warning: HF_API_TOKEN environment variable is not set. API calls will fail.")
    HUGGINGFACE_API_TOKEN = None

API_URL = "https://api-inference.huggingface.co/models/Salesforce/codet5-base"
HEADERS = {
    "Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}" if HUGGINGFACE_API_TOKEN else None
}

@app.route("/analyze-code", methods=["POST"])
def analyze_code():
    data = request.get_json()
    print(f"Received request data: {data}")
    code = data.get("code", "")
    if not code.strip():
        print("No code provided in request")
        return jsonify({"error": "No code provided"}), 400

    if not HUGGINGFACE_API_TOKEN:
        return jsonify({"error": "API token not configured"}), 500

    try:
        response = requests.post(API_URL, headers=HEADERS, json={"inputs": code})
        print(f"Request to Huggingface API sent. Status code: {response.status_code}")
        print(f"Response content: {response.content}")
        result = response.json()
        print(f"Parsed JSON result: {result}")

        if "error" in result:
            print(f"Error from Huggingface API: {result['error']}")
            return jsonify({"error": result["error"]}), 500

        feedback = result[0].get("generated_text", "")
        print(f"Sending feedback: {feedback}")
        return jsonify({"feedback": feedback})
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "token_configured": HUGGINGFACE_API_TOKEN is not None})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
