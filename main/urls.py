from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('staff/', views.staff, name='staff'),
    path('get_en/<int:en_id>', views.view_entry, name="view_entry"),
    path('star/<int:en_id>', views.star_en, name="star_en"),
    path('delete/<int:en_id>', views.delete, name="delete"),
    path('set_stff/', views.set_data, name = "set_data"),
    path('inside/user/<int:us_id>', views.view_acc, name = "view_user"),
    path('inside/user/<int:us_id/password-reset', views.pass_chgn, name = "pass_chgn")
]