from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Entry(models.Model) :
    title = models.CharField(max_length=300)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    star = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) :
        return self.title
