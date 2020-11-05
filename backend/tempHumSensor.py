import Adafruit_DHT
import time
import pymongo
import configparser

DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4
NAME = "bedroom0"

config = configparser.ConfigParser()
config.read("config_flask.ini")

def get_sensor_measurement():
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        if humidity >= 0.0 and humidity <= 100.0:
            return humidity, temperature
        else:
            return get_sensor_measurement()
    else:
        return get_sensor_measurement()


print(get_sensor_measurement())

client = pymongo.MongoClient(str(config["DATABASE"]["CONSTRING"]))
db = client.test
print(client.list_database_names())
scdb = client['SCDB']
print(scdb.list_collection_names())
tempSens = scdb['TempSens']
try:
    humidity, temp = get_sensor_measurement()
    in_dict = {"name":NAME, "humidity":humidity, "temperature":temp}
    x = tempSens.insert_one(in_dict)
    print("Added object with ID ", x)
except:
    print("Error occured")
