import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = Flask(__name__)
CORS(app)

# Initialize the model and tokenizer
print("Loading model... This may take a moment.")
try:
    model_name = "Qwen/Qwen2.5-Coder-7B-Instruct"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    # Check if GPU is available
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")
    
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
        device_map="auto" if device == "cuda" else None
    )
    
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    # Fallback to a smaller model if the large one fails
    print("Falling back to smaller model...")
    model_name = "microsoft/DialoGPT-medium"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    device = "cpu"

@app.route("/analyze-code", methods=["POST"])
def analyze_code():
    data = request.get_json()
    print(f"Received request data: {data}")
    code = data.get("code", "")

    if not code.strip():
        print("No code provided in request")
        return jsonify({"error": "No code provided"}), 400

    try:
        # Prepare the prompt for code analysis
        prompt = f"""Analyze the following code and provide feedback:

{code}

Please provide:
1. What this code does
2. Any potential issues or improvements
3. Best practices suggestions
"""

        messages = [
            {"role": "user", "content": prompt}
        ]
        
        # Tokenize the input
        inputs = tokenizer.apply_chat_template(
            messages,
            add_generation_prompt=True,
            tokenize=True,
            return_dict=True,
            return_tensors="pt",
        ).to(model.device if hasattr(model, 'device') else device)

        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=200,
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        # Decode the response
        response_text = tokenizer.decode(
            outputs[0][inputs["input_ids"].shape[-1]:],
            skip_special_tokens=True
        )
        
        feedback = response_text.strip()
        print(f"Generated feedback: {feedback}")
        return jsonify({"feedback": feedback})
        
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return jsonify({"error": f"Error analyzing code: {str(e)}"}), 500

if __name__ == "__main__":
    # Disable reloader to prevent restart loop during model loading
    app.run(debug=True, use_reloader=False, port=5000)
