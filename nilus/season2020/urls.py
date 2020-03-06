from django.urls import path

from . import views

app_name = 'season2020'
urlpatterns = [
    path('scout/<int:match_id>/<int:team_num>/', views.scout, name='scout'),
    path('scout/submit/<int:match_id>/<int:team_num>/', views.submit_scout, name='submit_scout'),
    path('scout/success/', views.scout_success, name='scout_success'),
]