from django.db import models

# Create your models here.
class Auth(models.Model) :
    username = models.CharField(max_length=100)
    password = models.DecimalField(max_digits=8, decimal_places=0)
