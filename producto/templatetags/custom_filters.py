from django import template

register = template.Library()

@register.filter
def mayus_inicial(value):
    return str(value[0]).upper()+str(value[1::])
@register.filter
def capitalice(value):
    return value.upper()

@register.simple_tag
def increment(value):
    return value+1

@register.simple_tag
def calcular_precio_oferta_iva(valor,iva,oferta):
    if oferta is None:
        return valor*((iva/100)+1)
    else:
        return round((valor*(1-(oferta/100)))*((iva/100)+1),0)
@register.simple_tag
def calcular_precio_iva(producto):
    return round(producto.precio*((producto.porcentaje_iva/100)+1),0)
@register.simple_tag()
def imagen_carrito(producto):
    imagen = producto.color_set.first()
    return imagen.stock
@register.simple_tag(takes_context=True)
def primera_imagen(context,producto):
    primera_imagen = producto.color_set.first()
    if primera_imagen:
        return primera_imagen.imagen.url
    else:
        return "unknown"
@register.simple_tag(takes_context=True)
def imagenes_color(context,producto):
    imagenes = producto.color_set.all()
    return imagenes
@register.filter
def productos_categoria(productos,categoria):
    productosreturn = []
    for producto in productos:
        if producto.subcategoria.categoria.nombre == categoria:
            productosreturn.append(producto)
    return productosreturn
@register.filter
def imagen_id(producto):
    primera_imagen = producto.color_set.first()
    return primera_imagen.id

@register.filter
def first_letter(value):
    for i in value:
        if i.isalpha():
            return i.upper()
        
#para calcular los impuestos
@register.simple_tag
def calcular_total_impuesto(acumulado, iva):
    return round(acumulado * (iva/100))

#sumar todos los totales del producto antes de iva
@register.simple_tag
def total_antes_iva(dict):
    total = 0
    for key, p in dict:
        total+= p["precio"]*p['cantidad']
    return total

#calcular iva tota

@register.filter
def iva_total(dict):
    total = 0
    
    for key, p in dict:
        iva = p["iva"]/100
        total += iva * (p["precio"]*p['cantidad'])
    return round(total)

