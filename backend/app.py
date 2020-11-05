from flask import Flask, jsonify
import pymongo
import configparser

app = Flask(__name__)
config = configparser.ConfigParser()
config.read("config_flask.ini")
print(config["DATABASE"]["CONSTRING"])
client = pymongo.MongoClient(str(config["DATABASE"]["CONSTRING"]))
db = client["SCDB"]


@app.route("/alltemp")
def index():
    all_temperature = []
    for elem in db["TempSens"].find():
        elem["_id"] = str(elem["_id"])
        all_temperature.append(elem)
    return jsonify(all_temperature)


if __name__ == "__main__":
    app.run()
