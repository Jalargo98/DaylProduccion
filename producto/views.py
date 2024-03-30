from django.http import JsonResponse
from django.shortcuts import render,redirect
from . models import *
# Create your views here.
def index(request):
    categorias = Categoria.objects.all()
    subcategorias = Subcategoria.objects.all()
    productos = Producto.objects.all()    
    return render(request, "indexproducto.html", {"categorias":categorias,"subcategorias":subcategorias,"productos":productos})

def categorias(request,categoria,subcategoria=None):
    if subcategoria is not None:
        productos=Producto.objects.filter(subcategoria__nombre=subcategoria,estado=True)
        categoria = categoria
        subcategoria = subcategoria
        categorias = Categoria.objects.all()
        subcategorias = Subcategoria.objects.all()
        context={"productos": productos,
                 "categoria": categoria,
                 "subcategoria": subcategoria,
                 "categorias": categorias,
                 "subcategorias": subcategorias}
    elif categoria is not None:
        productos = Producto.objects.filter(subcategoria__categoria__nombre=categoria,estado=True)
        categorias = Categoria.objects.all()
        subcategorias = Subcategoria.objects.all()
        context={"productos": productos,
                 "categoria": categoria,
                 "categorias": categorias,
                 "subcategorias": subcategorias}
    return render(request, "productos.html",context)

def producto(request,nombre_producto,id):
    producto=Producto.objects.get(nombre=nombre_producto,estado=True,id=id)
    categorias = Categoria.objects.all()
    subcategorias = Subcategoria.objects.all()
    context={"producto": producto,
            "subcategorias": subcategorias,
            "categorias": categorias}
    if producto:
        return render(request, "producto.html",context)
    else:
        return redirect('product:producto_index')
    
def search_producto(request,nombre_producto):
    categorias = Categoria.objects.all()
    productos = Producto.objects.filter(nombre__icontains=nombre_producto)
    subcategorias = Subcategoria.objects.all()
    context = {"productos": productos,
                 "categoria": nombre_producto,
                 "categorias": categorias,
                 "subcategorias": subcategorias}
    return render(request, 'productos.html',context)