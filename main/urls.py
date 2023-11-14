from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('staff/', views.staff, name='staff'),
    path('get_en/<int:en_id>', views.view_entry, name="view_entry"),
    path('star/<int:en_id>', views.star_en, name="star_en")
]