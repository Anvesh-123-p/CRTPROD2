# Generated by Django 5.0.9 on 2024-10-08 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crt_app', '0024_lessonplan_completedhours_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='lessonplan',
            name='expectedpercenthourstocomplete',
            field=models.IntegerField(default=0),
        ),
    ]
