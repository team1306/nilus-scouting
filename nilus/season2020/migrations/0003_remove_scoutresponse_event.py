# Generated by Django 3.0.4 on 2020-03-04 21:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('season2020', '0002_scoutresponse'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='scoutresponse',
            name='event',
        ),
    ]