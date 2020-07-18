from django import http, urls
from django.shortcuts import get_object_or_404, render

from settings import settings

from . import models


def scout(request):
    return render(request, 'season2020/scout.html')


def submit_scout(request, match_id, team_num):
    # TODO Get response, validate, and save to database
    return http.HttpResponseRedirect(urls.reverse('season2020:scout_success'))


def submit_view(request):
    return render(request, "season2020/submit.html")


def install_page(request):
    return render(request, "season2020/install.html")


def home_page(request):
    # TODO: Pull match schedule from database/blue alliance
    context = {
        "matches": [
            {
                "number": 1,
                "red1": 1,
                "red2": 2,
                "red3": 3,
                "blue1": 4,
                "blue2": 5,
                "blue3": 6,
            },
            {
                "number": 2,
                "red1": 11,
                "red2": 22,
                "red3": 33,
                "blue1": 44,
                "blue2": 55,
                "blue3": 66,
            },
            {
                "number": 3,
                "red1": 111,
                "red2": 222,
                "red3": 333,
                "blue1": 444,
                "blue2": 555,
                "blue3": 666,
            },
            {
                "number": 4,
                "red1": 1111,
                "red2": 2222,
                "red3": 3333,
                "blue1": 4444,
                "blue2": 5555,
                "blue3": 6666,
            },
        ]
    }
    return render(request, "season2020/home.html", context=context)


def submit_form(request):
    print(request.POST)
    return http.HttpResponse(status=200)



# Rendered Javascript objects.
# Below are not views but various script elements that needed to be passed through the renderer,
# for instance to use the {% url %} tag


def service_worker(request):
    context = {
        "static_paths": []
    }
    return render(request, "season2020/renderedScripts/service-worker.js", context=context, content_type='application/javascript')


def submit_script(request):
    return render(request, "season2020/renderedScripts/postForms.js", content_type='application/javascript')
