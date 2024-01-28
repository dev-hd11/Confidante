# (C) Himank Deka, 2023
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('success/', views.success, name='success'),
    path('auth/', views.auth, name='auth'), # type: ignore
]