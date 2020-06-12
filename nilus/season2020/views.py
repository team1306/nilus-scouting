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
    # TODO Get response, validate, and save to database
    return http.HttpResponseRedirect(urls.reverse('season2020:scout_success'))


def scout_success(request):
    return http.HttpResponse('Submitted')


def service_worker(request):
    urlbase  = "/season2020/scout/1/"
    context = {
        "matches":["1/", "2/", "3/", "4/"],
        "urlbase":urlbase
    }
    print(context)
    return render(request, 'season2020/service-worker.js', context ,content_type = "text/javascript")

def install_page(request):
    return render(request, "season2020/install.html")
