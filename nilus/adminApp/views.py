from django.shortcuts import render
from django import http, urls

from . import models

def testPage(request):
    return http.HttpResponse("Test Sucessfull- adminApp")