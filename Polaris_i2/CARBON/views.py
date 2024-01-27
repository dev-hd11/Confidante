# (C) Himank Deka, 2023
from django.shortcuts import render

# Create your views here.
def home(request) :
    return render(request, "homepage.html")

def test(request) :
    return render(request, "notbuilt.html")