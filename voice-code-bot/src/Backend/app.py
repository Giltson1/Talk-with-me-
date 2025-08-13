import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv  # <-- add this
# command to run python voice-code-bot/src/Backend/app.py
load_dotenv()  # <-- add this

app = Flask(__name__)
CORS(app)

# Load token from environment variable (safer than hardcoding)
HUGGINGFACE_API_TOKEN = os.environ.get("HF_API_TOKEN")

API_URL = "https://api-inference.huggingface.co/models/Salesforce/codet5-base"
HEADERS = {
    "Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}"
}

@app.route("/analyze-code", methods=["POST"])
def analyze_code():
    data = request.get_json()
    print(f"Received request data: {data}")
    code = data.get("code", "")

    if not code.strip():
        print("No code provided in request")
        return jsonify({"error": "No code provided"}), 400

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

if __name__ == "__main__":
    app.run(debug=True)
