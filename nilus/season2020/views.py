from django.shortcuts import render, get_object_or_404
from django import http

from . import models

def scout(request, match_id, team_num):
    match = get_object_or_404(models.Match, pk=match_id)
    team = get_object_or_404(models.Team, number=team_num)
    color = match.get_team_color(team)

    if not team in match.all_teams():
        return http.HttpResponseForbidden('This team is not part of this match.')

    context = {
        "match": match,
        "team": team,
        "color": color,
    }

    return render(request, 'season2020/scout.html', context)