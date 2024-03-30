from django.http import JsonResponse
from django.shortcuts import render
from producto.models import *


def index(request):
    categorias = Categoria.objects.all()
    subcategorias = Subcategoria.objects.all()
    productos = Producto.objects.filter(estado=True)
    k = 0
    context = {"categorias": categorias,"subcategorias": subcategorias,"productos": productos,"k": k,}
    return render(request, 'index.html',context)
def obtener_imagen_color(request):
    color_id = request.GET.get('colorId')
    try:
        color = Color.objects.get(id=color_id)
        imagen_url = color.imagen.url
        return JsonResponse({'imagen_url': imagen_url,
                             'cantidad' : color.stock})
    except Color.DoesNotExist:
        return JsonResponse({'error': 'Color no encontrado',
                             "color": color_id})
def registro(request):
    return render(request, 'layouts/parcials/register.html')

