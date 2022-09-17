from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from bot import alpha_beta_search

app = Flask(__name__)
CORS(app)
PORT = 5000

@app.route('/')
def hello_world():
   return 'This is API for Dots and Boxes Bot'

@app.route('/api/bot', methods=['POST'])
def getBotAction():
   # get the action the bot will take
   data = request.get_json()
   for line in data["lineStatus"]:
      for i in range(len(line)):
         for j in range(len(line[i])):
            if line[i][j] == -1:
               line[i][j] = 1
   action = alpha_beta_search({"board_status": data["boardStatus"], "line_status": data["lineStatus"]})
   return make_response(jsonify(action), 200)

if __name__ == '__main__':
   app.run(port=PORT)