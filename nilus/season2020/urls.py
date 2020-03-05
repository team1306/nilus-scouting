from django.urls import path

from . import views

app_name = 'season2020'
urlpatterns = [
    path('scout/<int:match_id>/<int:team_num>', views.scout, name='scout'),
]