import sys
from flask import Flask, jsonify
import pymongo
import configparser

app = Flask(__name__)
client = None

if len(sys.argv) == 1:
    config = configparser.ConfigParser()
    config.read("config_flask.ini")
    print(config["DATABASE"]["CONSTRING"])
    client = pymongo.MongoClient(str(config["DATABASE"]["CONSTRING"]))


elif len(sys.argv) > 1:
    client = pymongo.MongoClient(sys.argv[1])

db = client["SCDB"]


@app.route("/")
def index():
    return "No data to show"


@app.route("/test-temp")
def get_test_temperatures():
    all_temperature = []
    for elem in db["TempSens"].find():
        elem["_id"] = str(elem["_id"])
        all_temperature.append(elem)
    return jsonify(all_temperature)


if __name__ == "__main__":
    app.run()
