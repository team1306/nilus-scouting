from django.urls import path

from . import views

urlpatterns = [
    path('scout/<int:match_id>/<int:team_num>', views.scout),
]