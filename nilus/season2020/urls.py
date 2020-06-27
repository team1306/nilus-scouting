from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'season2020'
urlpatterns = [
    path('scout/', views.scout, name='scout'),
    path('scout/submit/', views.submit_view, name='submit_view'),
    path('install/', views.install_page, name="install"),
    path('home/', views.home_page, name = "home"),

    # need to include service worker for url rendering
    path('service-worker.js', views.service_worker, name='service-worker.js')
]
