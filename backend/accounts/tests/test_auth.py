import pytest
from django.test import Client


@pytest.mark.django_db
def test_register():
    client = Client()

    response = client.post("/api/register/", {
        "username": "rekha",
        "email": "rekha@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User"
    })

    print("Status:", response.status_code)
    print("Content:", response.content.decode())

    assert response.status_code == 200


@pytest.mark.django_db
def test_login():
    client = Client()

    # Register user first
    register_response = client.post("/api/register/", {
        "username": "rekha",
        "email": "rekha@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User"
    })

    print("Register:", register_response.status_code)
    print("Register Content:", register_response.content.decode())

    # Login
    response = client.post("/api/login/", {
        "username": "rekha",
        "password": "StrongPassword123"
    })

    print("Login:", response.status_code)
    print("Login Content:", response.content.decode())

    assert response.status_code == 200


DUMMY_USERS = [
    {
        "username": "user1",
        "email": "u1@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User"
    },
    {
        "username": "user2",
        "email": "u2@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "Developer"
    },
    {
        "username": "user3",
        "email": "u3@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User"
    },
    {
        "username": "user4",
        "email": "u4@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "Developer"
    },
    {
        "username": "user5",
        "email": "u5@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User"
    },
]


@pytest.mark.django_db
def test_dummy_users():
    client = Client()

    for user in DUMMY_USERS:
        response = client.post("/api/register/", user)

        print(response.status_code)
        print(response.content.decode())

        assert response.status_code == 200

    assert len(DUMMY_USERS) == 5


@pytest.mark.django_db
def test_logout():
    client = Client()

    response = client.post("/api/logout/")

    print(response.status_code)
    print(response.content.decode())

    assert response.status_code == 200