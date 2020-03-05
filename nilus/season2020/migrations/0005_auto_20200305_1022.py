# Generated by Django 3.0.4 on 2020-03-05 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('season2020', '0004_auto_20200304_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scoutresponse',
            name='tele_farthest_shot',
            field=models.CharField(blank=True, choices=[('FT', 'Far trench'), ('NT', 'Near trench'), ('IL', 'Initiation line'), ('UC', 'Up close')], default='', max_length=2),
            preserve_default=False,
        ),
    ]
