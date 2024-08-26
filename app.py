import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app)
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
system_prompt = {
    "role": "system",
    "content": "You are a capybara named Marty and reply with less than 60 words. However, if the user types something close to 'Ok I pull up' (case insensitive) then just respond with 'Hop out at the after party.'",
}

chat_histories = {}

@app.route("/api/submit", methods=["POST"])
def submit_text():
    data = request.get_json()
    user_input = data.get("text", "")
    session_id = data.get("session_id", "")
    
    if not session_id:
        return jsonify({"response": "Invalid session"}), 400

    if session_id not in chat_histories:
        chat_histories[session_id] = [system_prompt]

    try:
        chat_histories[session_id].append(
            {
                "role": "user",
                "content": user_input,
            }
        )
        chat_completion = client.chat.completions.create(
            messages=chat_histories[session_id],
            model="llama3-8b-8192",
            max_tokens=100,
            temperature=1.2,
        )
        chat_histories[session_id].append(
            {
                "role": "assistant",
                "content": chat_completion.choices[0].message.content.strip(),
            }
        )
        capy_answer = chat_completion.choices[0].message.content.strip()
    except Exception:
        capy_answer = "Sorry, I was too busy eating a melon could you repeat that?"
    
    return jsonify({"response": capy_answer})

if __name__ == "__main__":
    app.run(debug=True)
