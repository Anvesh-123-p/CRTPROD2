# Generated by Django 5.0.1 on 2024-08-31 05:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(max_length=32)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('mobile_number', models.BigIntegerField()),
                ('password', models.CharField(max_length=256)),
                ('user_type', models.CharField(choices=[('ST', 'Student'), ('FAC', 'Faculty'), ('HOD', 'HOD')], default='ST', max_length=3)),
                ('dept', models.CharField(choices=[('CSE', 'CSE'), ('ECE', 'ECE'), ('EEE', 'EEE'), ('MECH', 'MECH'), ('CIVIL', 'CIVIL'), ('x', 'x')], default='x', max_length=10)),
                ('roll_number', models.CharField(blank=True, max_length=10, null=True, unique=True)),
                ('status', models.CharField(choices=[('NAC', 'Not Active'), ('AC', 'Active')], default='NAC', max_length=3)),
                ('graduation_year', models.PositiveIntegerField(blank=True, default=2024, null=True)),
                ('specialisation', models.CharField(blank=True, max_length=100, null=True)),
                ('designation', models.CharField(blank=True, max_length=100, null=True)),
                ('qualification', models.CharField(blank=True, max_length=100, null=True)),
                ('experience', models.IntegerField(blank=True, null=True)),
                ('reset_password', models.CharField(blank=True, max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('class_id', models.AutoField(primary_key=True, serialize=False)),
                ('sem', models.IntegerField(choices=[(1, 'I'), (2, 'II'), (3, 'III'), (4, 'IV'), (5, 'V'), (6, 'VI'), (7, 'VII'), (8, 'VIII')])),
                ('dept', models.CharField(choices=[('CSE', 'CSE'), ('ECE', 'ECE'), ('EEE', 'EEE'), ('MECH', 'MECH'), ('CIVIL', 'CIVIL'), ('x', 'x')], default='x', max_length=10)),
                ('sec', models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C')], max_length=1)),
            ],
            options={
                'unique_together': {('sem', 'dept', 'sec')},
            },
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('sub_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('class_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='crt_app.class')),
                ('user', models.ManyToManyField(to='crt_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('sem', models.IntegerField(choices=[(1, 'I'), (2, 'II'), (3, 'III'), (4, 'IV'), (5, 'V'), (6, 'VI'), (7, 'VII'), (8, 'VIII')])),
                ('dept', models.CharField(choices=[('CSE', 'CSE'), ('ECE', 'ECE'), ('EEE', 'EEE'), ('MECH', 'MECH'), ('CIVIL', 'CIVIL'), ('x', 'x')], default='x', max_length=10)),
                ('hours', models.IntegerField()),
                ('status', models.CharField(choices=[('NS', 'Not Started'), ('C', 'Completed')], default='NS', max_length=10)),
                ('comments', models.TextField(blank=True, null=True)),
                ('target_date', models.DateField()),
                ('actual_completed_date', models.DateField(blank=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crt_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='LessonPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('A', 'Active'), ('IA', 'Inactive')], default='IA', max_length=10)),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crt_app.subject')),
                ('topic', models.ManyToManyField(to='crt_app.topic')),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crt_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Approval',
            fields=[
                ('approval_id', models.AutoField(primary_key=True, serialize=False)),
                ('stu_name', models.CharField(max_length=100)),
                ('roll_number', models.CharField(max_length=100)),
                ('stu_email', models.EmailField(max_length=254)),
                ('dept', models.CharField(max_length=100)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('rejected', 'Rejected'), ('approved', 'Approved')], default='pending', max_length=10)),
                ('approval_type', models.CharField(choices=[('new_stu_account', 'stu_account')], default='new_stu_account', max_length=20)),
                ('old_data', models.TextField(blank=True, null=True)),
                ('new_data', models.TextField(blank=True, null=True)),
                ('hod_id', models.ForeignKey(limit_choices_to={'user_type': 'HOD'}, on_delete=django.db.models.deletion.CASCADE, related_name='hod_approvals', to='crt_app.user')),
            ],
        ),
    ]
