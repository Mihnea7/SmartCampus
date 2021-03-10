from flask import Flask, Response, jsonify, request
from flask_cors import cross_origin
from bson.objectid import ObjectId
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


@app.route("/library", methods=["GET"])
@cross_origin()
def get_library_sensors():
    all_sensors = []
    for elem in db["Library"].find():
        elem["_id"] = str(elem["_id"])
        all_sensors.append(elem)
    return jsonify(all_sensors)


@app.route("/outside-sensors", methods=["GET"])
@cross_origin()
def get_outside_sensors():
    sensor_id = request.args.get("sensorid")
    if sensor_id:
        try:
            sensor = db["OutsideSensors"].find_one({"_id": ObjectId(sensor_id)})
            sensor["_id"] = str(sensor["_id"])
            return jsonify(sensor)
        except Exception:
            return jsonify({})
    all_sensors = []
    for elem in db["OutsideSensors"].find():
        elem["_id"] = str(elem["_id"])
        all_sensors.append(elem)
    return jsonify(all_sensors)


@app.route("/sensor", methods=["GET"])
@cross_origin()
def get_sensor_by_id_collection():
    collection = request.args.get("collection")
    sensor_id = request.args.get("sensorid")
    if sensor_id and collection:
        try:
            sensor = db[collection].find_one({"_id": ObjectId(sensor_id)})
            sensor["_id"] = str(sensor["_id"])
            return jsonify(sensor)
        except Exception:
            return jsonify({})


@app.route("/parking-spaces", methods=["GET"])
@cross_origin()
def get_parking_spaces_sensors():
    all_sensors = []
    for elem in db["ParkingSpaces"].find():
        elem["_id"] = str(elem["_id"])
        all_sensors.append(elem)
    return jsonify(all_sensors)


@app.route("/eval-user", methods=["POST"])
@cross_origin()
def add_user_data():
    users = db["EvalUsers"]
    data = request.get_json()
    user_id = data["userId"]
    times = data["times"]
    correctness = data["correctness"]
    clicks = data["clicks"]

    result = users.count_documents({"userId": user_id}, limit=1)
    if result == 0 and len(times) == 8 and len(correctness) == 8 and len(clicks) == 8:
        users.insert_one(data)
        return Response(status=200)
    return Response(status=500)


if __name__ == "__main__":
    app.run()
