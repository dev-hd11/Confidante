# (C) Himank Deka, 2023
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('get-started/', views.test, name='test')
]