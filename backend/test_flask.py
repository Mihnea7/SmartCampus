import pytest
import json
from app import app as flask_app


@pytest.fixture
def app():
    yield flask_app


@pytest.fixture()
def client(app):
    yield app.test_client()


def test_index(client):
    rv = client.get("/")
    assert rv.status_code == 200
    assert b"No data to show" in rv.data


def test_test_temperature(client):
    rv = client.get("/test-temp")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) == 5


def test_get_boyd_orr_sensors(client):
    rv = client.get("/boyd-orr")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) > 0
    first_item = expected[0]
    assert first_item["name"] is not None
    assert type(first_item["level"]) is int
    assert type(first_item["current"]) is dict
    assert type(first_item["history"]) is list


def test_library_sensors(client):
    rv = client.get("/library")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) > 0
    first_item = expected[0]
    assert first_item["name"] is not None
    assert type(first_item["level"]) is int
    assert type(first_item["current"]) is dict
    assert type(first_item["history"]) is list


def test_outside_sensors(client):
    rv = client.get("/outside-sensors")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) > 0
    first_item = expected[0]
    assert first_item["name"] is not None
    assert type(first_item["lat"]) is float
    assert type(first_item["long"]) is float
    assert type(first_item["current"]) is dict
    assert type(first_item["history"]) is list


def test_get_specific_outside_sensor_correct_input(client):
    rv = client.get("/outside-sensors?sensorid=6020441c6105ef7c424d56ce")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) == 7
    assert len([expected]) == 1


def test_get_specific_outside_sensor_wrong_input(client):
    rv = client.get("/outside-sensors?sensorid=6020441c6105ef7e")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) == 0


def test_get_sensor_by_id_collection_correct(client):
    rv = client.get("/sensor?collection=BoydOrr&sensorid=5fbc0aef4bfde1fc24017a92")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len([expected]) == 1
    assert expected["name"] == "221_headcount"


def test_get_sensor_by_id_collection_wrong(client):
    rv = client.get("/sensor?collection=wrong&sensorid=52")
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) == 0
