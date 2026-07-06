import re
from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(write_only=True)

    role = serializers.ChoiceField(
        choices=[
            ("Developer", "Developer"),
            ("User", "User")
        ]
    )

    class Meta:
        model = User
        fields =[
           "full_name",
            "username",
            "email",
            "password",
            "confirm_password",
            "role"
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, data):

        errors = {}

        # --------------------------
        # Full Name Validation
        # --------------------------

        full_name = data.get("full_name", "").strip()

        if not full_name:
            errors["full_name"] = "Full name is required."

        elif len(full_name) < 3:
            errors["full_name"] = "Full name must be at least 3 characters."

        elif not re.fullmatch(r"[A-Za-z ]+", full_name):
            errors["full_name"] = "Full name can contain only letters and spaces."

        # --------------------------
        # Username Validation
        # --------------------------

        username = data.get("username", "").strip()

        if len(username) < 4:
            errors["username"] = "Username must be at least 4 characters."

        elif " " in username:
            errors["username"] = "Username cannot contain spaces."

        elif User.objects.filter(username=username).exists():
            errors["username"] = "Username already exists."

        # --------------------------
        # Email Validation
        # --------------------------

        email = data.get("email", "").strip()

        email_pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

        if not re.match(email_pattern, email):
            errors["email"] = "Enter a valid email address."

        elif User.objects.filter(email=email).exists():
            errors["email"] = "Email already exists."

        if data["password"] != data["confirm_password"]:
            errors["confirm_password"] = "Passwords do not match."

        password = data["password"]

        password_errors = []

        if len(password) < 8:
            password_errors.append("Minimum 8 characters.")

        if not re.search(r"[A-Z]", password):
            password_errors.append("At least one uppercase letter.")

        if not re.search(r"[a-z]", password):
            password_errors.append("At least one lowercase letter.")

        if not re.search(r"\d", password):
            password_errors.append("At least one number.")

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            password_errors.append("At least one special character.")

        if password_errors:
            errors["password"] = password_errors

        if User.objects.filter(username=data["username"]).exists():
            errors["username"] = "Username already exists."

        if User.objects.filter(email=data["email"]).exists():
            errors["email"] = "Email already exists."

        if errors:
            raise serializers.ValidationError(errors)

        return data
class DeveloperSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
        ]

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "role",
            "date_joined",
            "is_active",
        ]