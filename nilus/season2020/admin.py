from django.contrib import admin

from . import models

admin.site.register(models.Team)
admin.site.register(models.Event)
admin.site.register(models.Match)
admin.site.register(models.ScoutResponse)