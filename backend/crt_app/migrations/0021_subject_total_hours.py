# Generated by Django 5.0.9 on 2024-10-08 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crt_app', '0020_topic_percent_constituting_alter_class_clg_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='total_hours',
            field=models.IntegerField(default=0),
        ),
    ]
