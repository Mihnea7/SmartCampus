import Adafruit_DHT
import time
import pymongo
import configparser
import json
import paho.mqtt.client as mqtt

DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4

NAME = "bedroom0"
BROKER_IP = "192.168.0.18"
sensor_data = {"name": NAME, "temperature": 0, "humidity": 0}

config = configparser.ConfigParser()
config.read("config_flask.ini")


def get_sensor_measurement():
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        if humidity >= 0.0 and humidity <= 100.0:
            return humidity, temperature
        else:
            return get_sensor_measurement()
    else:
        return get_sensor_measurement()


client = mqtt.Client()
client.connect(BROKER_IP, 1883, 60)
client.loop_start()

try:
    humidity, temperature = get_sensor_measurement()
    sensor_data["temperature"] = temperature
    sensor_data["humidity"] = humidity
    sensor_data["time"] = time.time()

    client.publish("sensors/dht11", json.dumps(sensor_data), 1)

    time.sleep(2)

except:
    print("Exception occured")
