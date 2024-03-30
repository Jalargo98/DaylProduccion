from django.conf import settings
import json

def agregar_carrito(dict):
  try:
    carrito = json.loads(dict)
  except json.JSONDecodeError:
        pass
  items_paypal = []
  for key, value in carrito.items():
    carrito_dict = {'item_name':value['nombre'],'quantity':value['cantidad'],'amount':value['valor']}
    items_paypal.append(carrito_dict)
  total_carrito = sum(item["quantity"] * item["amount"] for item in items_paypal)
  return {'items_paypal':items_paypal,'total_carrito':total_carrito}