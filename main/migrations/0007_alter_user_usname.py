# Generated by Django 4.2.6 on 2023-11-25 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_auto_20231114_1718'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='usname',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
