from django.shortcuts import render, get_object_or_404
from django import http, urls

from . import models


def scout(request):
    return render(request, 'season2020/scout.html')


def submit_scout(request, match_id, team_num):
    # TODO Get response, validate, and save to database
    return http.HttpResponseRedirect(urls.reverse('season2020:scout_success'))


def scout_success(request):
    return http.HttpResponse('Submitted')

def install_page(request):
    return render(request, "season2020/install.html")
