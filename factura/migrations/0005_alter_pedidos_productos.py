# Generated by Django 4.2.4 on 2024-03-20 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('factura', '0004_factura_pedido_alter_factura_fecha_factura_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedidos',
            name='productos',
            field=models.JSONField(default={'default': 'default'}),
            preserve_default=False,
        ),
    ]
