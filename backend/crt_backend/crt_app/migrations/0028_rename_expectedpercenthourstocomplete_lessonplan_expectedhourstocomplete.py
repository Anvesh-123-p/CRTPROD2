# Generated by Django 5.0.9 on 2024-10-09 07:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crt_app', '0027_subject_duration_subject_startdate'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lessonplan',
            old_name='expectedpercenthourstocomplete',
            new_name='expectedhourstocomplete',
        ),
    ]
