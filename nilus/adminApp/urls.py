from django.urls import path

from . import views

app_name = 'adminApp'
urlpatterns = [
    path('', views.testPage, name="temporary_test"),
]