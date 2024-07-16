from flask import Flask, jsonify, request 
from flask_cors import CORS
from groq import generate_groq
from local import generate_local

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['POST'])
async def test():
    req = request.json
    question = req['question']
    schema = req['schema']
    memory = req['memory']
    model = req['model']

    if model == "Local":
        return generate_local(question, schema, memory)
    else:
        return generate_groq(question, schema, memory)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)

