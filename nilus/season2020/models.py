from django.db import models

class Team(models.Model):
    number = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=256)

    def __str__(self):
        return str(self.number) + ' - ' + self.name

class Event(models.Model):
    name = models.CharField(max_length=256)
    teams = models.ManyToManyField(Team)

    def __str__(self):
        return self.name

class Match(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    # Don't force unique to allow for rematches.
    # Use a CharField so we can use things like 'Semifinal 1 Match 2'
    number = models.CharField(max_length=256)

    red_one = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='red_one')
    red_two = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='red_two')
    red_three = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='red_three')

    blue_one = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='blue_one')
    blue_two = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='blue_two')
    blue_three = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='blue_three')

    def all_teams(self):
        teams = set()
        teams.add(self.red_one)
        teams.add(self.red_two)
        teams.add(self.red_three)
        teams.add(self.blue_one)
        teams.add(self.blue_two)
        teams.add(self.blue_three)
        return teams

    def __str__(self):
        return self.number + ' at ' + str(self.event)

    class Meta:
        verbose_name_plural = "matches"

class ScoutResponse(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    comments = models.TextField(blank=True)