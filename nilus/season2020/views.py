from django.shortcuts import render, get_object_or_404
from django import http, urls

from . import models

def scout(request, match_id, team_num):
    match = get_object_or_404(models.Match, pk=match_id)
    team = get_object_or_404(models.Team, number=team_num)

    if not team in match.all_teams():
        return http.HttpResponseForbidden('This team is not part of this match.')

    color = match.get_team_color(team)

    context = {
        "match": match,
        "team": team,
        "color": color,
    }

    return render(request, 'season2020/scout.html', context)

def submit_scout(request, match_id, team_num):
    return http.HttpResponseRedirect(urls.reverse('season2020:scout_success'))

def scout_success(request):
    return http.HttpResponse('Submitted')