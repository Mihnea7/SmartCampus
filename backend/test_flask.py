import pytest
import json
from app import app as flask_app


@pytest.fixture
def app():
    yield flask_app


@pytest.fixture
def client(app):
    yield app.test_client()


def test_index(app, client):
    rv = client.get('/')
    assert rv.status_code == 200
    assert b"No data to show" in rv.data


def test_test_temperature(app, client):
    rv = client.get('/test-temp')
    assert rv.status_code == 200
    expected = json.loads(rv.get_data(as_text=True))
    assert len(expected) == 5
