import pytest
from django.test import Client

REGISTER_URL = "/api/register/"
LOGIN_URL = "/api/login/"
LOGOUT_URL = "/api/logout/"


def register_user(
    client,
    username="rekha",
    email="rekha@test.com",
    password="StrongPassword123",
    role="User",
):
    return client.post(
        REGISTER_URL,
        {
            "username": username,
            "email": email,
            "password": password,
            "confirm_password": password,
            "role": role,
        },
    )


@pytest.mark.django_db
def test_register():
    client = Client()

    response = register_user(client)

    assert response.status_code == 200


@pytest.mark.django_db
def test_login():
    client = Client()

    register_user(client)

    response = client.post(
        LOGIN_URL,
        {
            "username": "rekha",
            "password": "StrongPassword123",
        },
    )

    assert response.status_code == 200
    assert response.json()["message"] == "Login success"


DUMMY_USERS = [
    {
        "username": "user1",
        "email": "u1@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User",
    },
    {
        "username": "user2",
        "email": "u2@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "Developer",
    },
    {
        "username": "user3",
        "email": "u3@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User",
    },
    {
        "username": "user4",
        "email": "u4@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "Developer",
    },
    {
        "username": "user5",
        "email": "u5@test.com",
        "password": "StrongPassword123",
        "confirm_password": "StrongPassword123",
        "role": "User",
    },
]


@pytest.mark.django_db
def test_dummy_users():
    client = Client()

    for user in DUMMY_USERS:
        response = client.post(REGISTER_URL, user)
        assert response.status_code == 200

    assert len(DUMMY_USERS) == 5


@pytest.mark.django_db
def test_logout():
    client = Client()

    response = client.post(LOGOUT_URL)

    assert response.status_code == 200
    assert response.json()["message"] == "Logout successful"


@pytest.mark.django_db
def test_login_invalid_password():
    client = Client()

    register_user(client)

    response = client.post(
        LOGIN_URL,
        {
            "username": "rekha",
            "password": "WrongPassword",
        },
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_login_invalid_username():
    client = Client()

    response = client.post(
        LOGIN_URL,
        {
            "username": "unknown",
            "password": "StrongPassword123",
        },
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_duplicate_username():
    client = Client()

    register_user(client)

    response = register_user(
        client,
        username="rekha",
        email="another@test.com",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_duplicate_email():
    client = Client()

    register_user(client)

    response = register_user(
        client,
        username="anotheruser",
        email="rekha@test.com",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_login_returns_correct_role():
    client = Client()

    register_user(
        client,
        username="developer",
        email="developer@test.com",
        role="Developer",
    )

    response = client.post(
        LOGIN_URL,
        {
            "username": "developer",
            "password": "StrongPassword123",
        },
    )

    assert response.status_code == 200
    assert response.json()["role"] == "Developer"