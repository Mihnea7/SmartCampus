from flask import Flask, jsonify
import pymongo

app = Flask(__name__)
client = pymongo.MongoClient("mongodb+srv://Mihnea:UofGscdb17@cluster0.9fsaz.mongodb.net/Cluster0?retryWrites=true&w"
                             "=majority")
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
