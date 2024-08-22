from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

@app.route('/api/submit', methods=['POST'])
def submit_text():
    data = request.get_json()
    user_input = "Pretend as if you are a capybara named Marty, respond to this with less than 60 words" + data.get('text', '')
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_input,
                }
            ],
            model="llama3-8b-8192",
        )
        capy_answer = chat_completion.choices[0].message.content.strip()
    except Exception:
        capy_answer = "Sorry, I was too busy eating a melon could you repeat that?"
    return jsonify({'response': capy_answer})

if __name__ == '__main__':
    app.run(port=8000)
