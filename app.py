import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

system_prompt = {
    "role": "system",
    "content": "You are a capybara named Marty and reply with less than 60 words. However, if the user types something close to 'Ok I pull up' (case insensitive) then just respond with 'Hop out at the after party.'",
}
chat_history = [system_prompt]


@app.route("/api/submit", methods=["POST"])
def submit_text():
    data = request.get_json()
    user_input = data.get("text", "")
    try:
        chat_history.append(
            {
                "role": "user",
                "content": user_input,
            }
        )
        chat_completion = client.chat.completions.create(
            messages=chat_history,
            model="llama3-8b-8192",
            max_tokens=100,
            temperature=1.2,
        )
        chat_history.append(
            {
                "role": "assistant",
                "content": chat_completion.choices[0].message.content.strip(),
            }
        )
        chat_history = chat_history[-16:]
        capy_answer = chat_completion.choices[0].message.content.strip()
    except Exception as e:
        capy_answer = "Sorry, I was too busy eating a melon could you repeat that?"
    return jsonify({"response": capy_answer})


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)