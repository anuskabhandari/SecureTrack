from django.core.management.base import BaseCommand
from accounts.models import User


class Command(BaseCommand):
    help = "Create default admin user"

    def handle(self, *args, **kwargs):
        if User.objects.filter(username="admin").exists():
            self.stdout.write(self.style.WARNING("Admin already exists"))
            return

        User.objects.create_superuser(
            username="admin",
            email="admin@gmail.com",
            password="1234567890",
            full_name="Administrator",
            role="Admin",
        )

        self.stdout.write(self.style.SUCCESS("Superuser created successfully"))