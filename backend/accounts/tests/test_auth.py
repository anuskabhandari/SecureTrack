import pytest
from django.test import Client

@pytest.mark.django_db
def test_login():
    client = Client()

    # first register user (needed for login to work)
    client.post("/api/register/", {
        "username": "rekha",
        "email": "rekha@test.com",
        "password": "123"
    })

    # now login test
    response = client.post("/api/login/", {
        "username": "rekha",
        "password": "123"
    })

    assert response.status_code == 200



DUMMY_USERS = [
    {"username": "user1", "email": "u1@test.com", "password": "123"},
    {"username": "user2", "email": "u2@test.com", "password": "123"},
    {"username": "user3", "email": "u3@test.com", "password": "123"},
    {"username": "user4", "email": "u4@test.com", "password": "123"},
    {"username": "user5", "email": "u5@test.com", "password": "123"},
]

@pytest.mark.django_db
def test_dummy_users():
    client = Client()

    for user in DUMMY_USERS:
        response = client.post("/api/register/", user)
        assert response.status_code == 200

    assert len(DUMMY_USERS) == 5