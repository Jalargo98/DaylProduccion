from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from cliente.models import *
import os
from django.conf import settings

def nombreImagen(instance, filename):
    extension = os.path.splitext(filename)[1]
    cliente_id = instance.cliente.id
    pedido_id = instance.id
    new_filename = f"{pedido_id}{extension}"
    return os.path.join('json/'+str(cliente_id), new_filename)

# Create your models here.
class MetodosPago(models.Model):
  nombre = models.CharField(help_text="Nombre del metodo de pago", max_length=100)
  
  def __str__(self):
    return f'{self.nombre}'
  
class Pedidos(models.Model):
  metodo_pago = models.ForeignKey(MetodosPago,on_delete=models.SET_NULL,null=True,blank=True)
  fecha_creacion = models.DateTimeField(auto_now_add=True)
  estado = models.BooleanField()
  situacion = models.CharField(help_text='Si el pedido se encuentra en ruta, entregado o no ha sido enviado', max_length=60)
  cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
  productos = models.JSONField()
  
  class Meta:
    db_table = 'Pedidos'  
  
class Factura(models.Model):
  fecha_factura = models.DateTimeField(auto_now_add=True)
  fecha_vencimiento = models.DateTimeField(null=True,blank=True)
  metodo_pago = models.ForeignKey(MetodosPago,on_delete=models.SET_NULL, null=True)
  total = models.DecimalField(max_digits=15,decimal_places=2,null=True)
  cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
  estado = models.CharField(max_length=30,help_text="Estado del pedido")
  pedido = models.ForeignKey(Pedidos,on_delete=models.SET_NULL,null=True)
  
  def __str__(self):
    return f'{self.id} cliente {self.cliente.nombre}'
  class Meta:
    db_table = 'Factura'

class DetalleFactura(models.Model):
  factura = models.ForeignKey(Factura,on_delete=models.SET_NULL, null=True)
  producto = models.ForeignKey(Producto,on_delete=models.SET_NULL, null=True)
  
  cantidad = models.IntegerField(help_text='Cantidad del producto')  
  iva = models.DecimalField(max_digits=5, decimal_places=2)
  precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
  oferta = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
  
  def __str__(self):
    return f'{self.id} {self.factura.id}'
  class Meta:
    db_table = 'Detalle_factura'