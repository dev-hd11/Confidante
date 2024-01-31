# (C) Himank Deka, 2023
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('user/', views.user, name='user'),
    path('user/del/', views.delete, name='delete'),
    path('user/change-password/', views.passwd, name='passwd'),
    path('auth/', views.auth, name='auth'), # type: ignore
    path('auth/signout/', views.signout, name='signout')
]