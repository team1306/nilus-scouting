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
    path('service-worker.js', TemplateView.as_view(template_name="season2020/service-worker.js",
        content_type='application/javascript'), name='service-worker.js')
]
