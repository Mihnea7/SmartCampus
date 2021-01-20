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
    rv = client.get('/')
    assert rv.status_code == 200
    assert b"No data to show" in rv.data


def test_test_temperature(client):
    rv = client.get('/test-temp')
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) == 5


def test_get_boyd_orr_sensors(client):
    rv = client.get('/boyd-orr')
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) > 0
    first_item = expected[0]
    assert first_item["name"] is not None
    assert type(first_item["level"]) is str
    assert type(first_item["current"]) is dict
    assert type(first_item["history"]) is list
