# Generated by Django 3.1.2 on 2020-10-24 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventoryman', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cracker',
            name='name',
            field=models.CharField(max_length=300, verbose_name='Cracker name 1'),
        ),
    ]
