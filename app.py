from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/api/submit', methods=['POST'])

def submit_text():
    data = request.get_json()
    text = data.get('text', '')
    return jsonify({'response': text})

if __name__ == '__main__':
    app.run(port=5000)
