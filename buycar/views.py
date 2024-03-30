from django.shortcuts import redirect, render
from buycar.carrito import Carrito
from producto.models import *
# Create your views here.x
def carindex(request):
    carro = Carrito(request)
    subtotal = 0
    iva = 0
    total  = 0
    for key, value in carro.carrito.items():
        producto = Producto.objects.get(id=value["producto_id"])
        subtotal += int((producto.precio * value["cantidad"])*(1-producto.oferta/100))
        iva += (1+producto.porcentaje_iva/100) * producto.precio #Faltan los descuentos
        total += producto.stock
    categorias = Categoria.objects.all()
    subcategorias = Subcategoria.objects.all()
    productos = Producto.objects.all()
    context = {'categorias': categorias,
               'subcategorias': subcategorias,
               'productos': productos,
               'subtotal': subtotal,
               'iva': iva}
    return render(request,'carritogeneral.html',context)

def agregar_producto(request,producto_id,color_id,cantidad):
    carrito = Carrito(request)
    producto_carrito = Producto.objects.get(id=producto_id)
    color_carrito = Color.objects.get(id=color_id)
    carrito.agregar(producto_carrito,color_carrito,cantidad)
    redirect_url = request.META.get('HTTP_REFERER', 'index')
    return redirect(redirect_url)

def modificar_producto(request,producto_id,color_id,cantidad):
    carrito = Carrito(request)
    producto_carrito = Producto.objects.get(id=producto_id)
    color_carrito = Color.objects.get(id=color_id)
    carrito.modificar_cantidad(producto_carrito,color_carrito,cantidad)
    redirect_url = request.META.get('HTTP_REFERER', 'index')
    return redirect(redirect_url)

def eliminar_producto(request,producto_id,color_id):
    carrito = Carrito(request)
    producto_carrito = Producto.objects.get(id=producto_id)
    color_carrito = Color.objects.get(id=color_id)
    carrito.eliminar(producto_carrito,color_carrito)
    redirect_url = request.META.get('HTTP_REFERER', 'index')
    return redirect(redirect_url)

def limpiar_carrito(request):
    carrito = Carrito(request)
    carrito.limpiar_carrito()
    redirect_url = request.META.get('HTTP_REFERER', 'index')
    return redirect(redirect_url)