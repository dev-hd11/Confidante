from django.db import models

# Create your models here.
class User(models.Model) :
    usname = models.CharField(max_length=50)
    passwd = models.CharField(max_length=10)

    def __str__(self) :
        return self.usname

class Entry(models.Model) :
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=250)
    date = models.DateField(auto_now=True)
    is_starred = models.BooleanField(default=False)
    holder = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def __str__(self) :
        return f"{self.holder.usname} wrote {self.title}"