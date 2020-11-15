import pymongo
import configparser
import paho.mqtt.client as mqtt
import json

config = configparser.ConfigParser()
config.read("config_flask.ini")

mongo_client = pymongo.MongoClient(str(config["DATABASE"]["CONSTRING"]))
scdb = mongo_client["SCDB"]

BROKER_ID = "192.168.0.18"
#code to insert
# x = tempSens.insert_one(in_dict)
# print("Added object with ID ", x)

def on_message(client, userdata, msg):
    data = json.loads(msg.payload.decode())
    try:
        collection = data.pop("name", "Errors")
        newEntry = scdb[collection].insert_one(data)
        print("Added object with ID ", newEntry)
    except:
        print("Unable to add element to database")

client = mqtt.Client()
client.on_message = on_message
client.connect(BROKER_ID, 1883)
client.subscribe("sensors/+")

client.loop_forever()