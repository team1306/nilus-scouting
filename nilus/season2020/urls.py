from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'season2020'
urlpatterns = [
    path('scout/', views.scout, name='scout'),
    path('scout/submit/<int:match_id>/<int:team_num>/', views.submit_scout, name='submit_scout'),
    path('scout/success/', views.scout_success, name='scout_success'),
    path('install/', views.install_page, name="install"),

    # need to include service worker for accurate scope
    path('service-worker.js', TemplateView.as_view(template_name="season2020/service-worker.js",
        content_type='application/javascript'), name='service-worker.js')
]
