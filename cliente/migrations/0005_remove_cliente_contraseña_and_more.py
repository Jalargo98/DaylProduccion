# Generated by Django 4.2.4 on 2023-09-15 17:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0004_alter_cliente_table'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cliente',
            name='contraseña',
        ),
        migrations.RemoveField(
            model_name='cliente',
            name='correo_electronico',
        ),
    ]
