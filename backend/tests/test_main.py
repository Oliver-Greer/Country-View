from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200


def test_get_members():
    state = "CA"
    response = client.get(f"/api/members?state={state}")
    assert response.status_code == 200
    data = response.json()
    assert "members" in data
    for member in data["members"]:
        assert "name" in member
        assert "party" in member
        assert "chamber" in member
        # district is optional
        # TODO: figure out how to test this
