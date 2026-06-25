from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    role = models.CharField(max_length=50)

class Vulnerability(models.Model):
    title = models.CharField(max_length=200)
    severity = models.CharField(max_length=20)
    status = models.CharField(max_length=20)

class Incident(models.Model):
    title = models.CharField(max_length=200)
    status = models.CharField(max_length=20)

class Task(models.Model):
    title = models.CharField(max_length=200)
    assigned_to = models.ForeignKey(User,on_delete=models.CASCADE)