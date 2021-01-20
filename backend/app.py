from flask import Flask, jsonify
from flask_cors import cross_origin
import pymongo
import configparser
import argparse

app = Flask(__name__)

parser = argparse.ArgumentParser(description="Process the connection string")
parser.add_argument('--constring', nargs='?', action='store', type=str, help='The connection string.')

args, unknown = parser.parse_known_args()


def create_client(conStr):
    new_client = pymongo.MongoClient(conStr)
    return new_client


config = configparser.ConfigParser()
config.read("config_flask.ini")
client = None

if args.constring is not None:
    client = create_client(str(args.constring))
    print("ARGS TRUE")
else:
    client = create_client(str(config["DATABASE"]["CONSTRING"]))
    print("ARGS FALSE")

print(client)
db = client["SCDB"]


@app.route("/", methods=["GET"])
def index():
    return "No data to show"


@app.route("/test-temp", methods=["GET"])
@cross_origin()
def get_test_temperatures():
    all_temperature = []
    for elem in db["TempSens"].find():
        elem["_id"] = str(elem["_id"])
        all_temperature.append(elem)
    return jsonify(all_temperature)


@app.route("/boyd-orr", methods=["GET"])
@cross_origin()
def get_boyd_orr_sensors():
    all_sensors = []
    for elem in db["BoydOrr"].find():
        elem["_id"] = str(elem["_id"])
        all_sensors.append(elem)
    return jsonify(all_sensors)


if __name__ == "__main__":
    app.run()
