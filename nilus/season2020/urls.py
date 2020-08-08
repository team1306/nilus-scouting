from django.urls import path
from django.views.generic import TemplateView, RedirectView

from . import views

app_name = 'season2020'
urlpatterns = [
    path('scout/', views.scout, name='scout'),
    path('scout/submit/', views.submit_view, name='submit_view'),
    path('scout/submitForm/', views.submit_form, name="submit_form"),
    path('install/', views.install_page, name="install"),
    path('home/', views.home_page, name = "home"),
    #redirect to install on default
    path("", RedirectView.as_view(pattern_name="season2020:install", permanent=False)),

    # need to include service worker for url rendering
    path('service-worker.js', views.service_worker, name='service-worker.js'),
    path('submit-forms.js', views.submit_script, name='submit-forms.js')
]
