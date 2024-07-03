from flask import Flask, jsonify, request 
from flask_cors import CORS
from resolvers import Resolvers


app = Flask(__name__)
CORS(app)


@app.route('/test', methods=['POST'])
async def test():
    req = request.json
    question = req['question']
    schema = req['schema']
    model = req['model']

    resolver = Resolvers()
    return resolver.generate_sql(question, schema, model)
    
    
if __name__ == '__main__':
    app.run(host='localhost', port=5000)

