from django.db import models
from enum import Enum

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
    
    def get_team_color(self, team):
        if team == self.red_one:
            return AllianceColor.RED
        if team == self.red_two:
            return AllianceColor.RED
        if team == self.red_three:
            return AllianceColor.RED
        if team == self.blue_one:
            return AllianceColor.BLUE
        if team == self.blue_two:
            return AllianceColor.BLUE
        if team == self.blue_three:
            return AllianceColor.BLUE
        raise ValueError('That team is not in this match')

    def __str__(self):
        return self.number + ' at ' + str(self.event)

    class Meta:
        verbose_name_plural = "matches"

class ScoutResponse(models.Model):
    # Constants
    SHOT_FAR_TRENCH = 'FT'
    SHOT_NEAR_TRENCH = 'NT'
    SHOT_INIT_LINE = 'IL'
    SHOT_UP_CLOSE = 'UC'

    SHOT_DISTANCE_CHOICES = [
        (SHOT_FAR_TRENCH, 'Far trench'),
        (SHOT_NEAR_TRENCH, 'Near trench'),
        (SHOT_INIT_LINE, 'Initiation line'),
        (SHOT_UP_CLOSE, 'Up close'),
    ]

    # Basic details
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    # Autonomous
    auto_low_balls = models.PositiveIntegerField(null=True, blank=True, default=0)
    auto_high_balls = models.PositiveIntegerField(null=True, blank=True, default=0)
    auto_can_intake = models.BooleanField(default=False)

    # Teleop
    tele_low_balls = models.PositiveIntegerField(null=True, blank=True, default=0)
    tele_high_balls = models.PositiveIntegerField(null=True, blank=True, default=0)
    tele_control_panel = models.BooleanField(default=False)
    tele_did_climb = models.BooleanField(default=False)
    tele_farthest_shot = models.CharField(max_length=2, blank=True, choices=SHOT_DISTANCE_CHOICES)

    comments = models.TextField(blank=True)

class AllianceColor(Enum):
    RED = 1
    BLUE = 2