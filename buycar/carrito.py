def calcular_precio_carrito(producto):
    if producto.oferta is None:
        return float(producto.precio) * ((float(producto.porcentaje_iva) / 100) + 1)
    else:
        return int(round((1-producto.oferta/100)*producto.precio*((1+producto.porcentaje_iva/100))))
    
class Carrito:
    def __init__(self,request):
        self.request = request
        self.session = request.session
        self.carrito = self.session.get("carrito", {})
        if not self.carrito:
            self.session["carrito"] = {}
            self.carrito = self.session["carrito"]

    
    def agregar(self,producto,color,cantidad):
        id = str(producto.id)+"_"+str(color.id)
        if id not in self.carrito.keys():
            if cantidad > color.stock:
                cantidad = color.stock
            self.carrito[id] = {
                "producto_id": producto.id,
                "nombre": producto.nombre,
                "iva": int(producto.porcentaje_iva),
                "oferta": int(producto.oferta),
                "precio":int(round(producto.precio,0)),
                "cantidad": cantidad,
                "valor" : calcular_precio_carrito(producto),
                "acumulado": calcular_precio_carrito(producto)*cantidad,
                "color_id": color.id,
                "imagen": color.imagen.url
            }
        else:
            if color.stock >= (cantidad+self.carrito[id]["cantidad"]):
                self.carrito[id]["cantidad"] += cantidad
                self.carrito[id]["acumulado"] = self.carrito[id]["cantidad"] * calcular_precio_carrito(producto)
            else:
                self.carrito[id]["cantidad"] = color.stock
                self.carrito[id]["acumulado"] = self.carrito[id]["cantidad"] * calcular_precio_carrito(producto)
        self.guardar_carrito()
        
    def guardar_carrito(self):
        self.session["carrito"] = self.carrito
        self.session.modified = True
    
    def eliminar(self,producto,color):
        id = str(producto.id)+"_"+str(color.id)
        if id in self.carrito:
            del self.carrito[id]
        self.guardar_carrito()
        
    def modificar_cantidad(self,producto,color,cantidad):
        id = str(producto.id)+"_"+str(color.id)
        if id in self.carrito.keys():
            self.carrito[id]["cantidad"] = cantidad
            self.carrito[id]["acumulado"] = calcular_precio_carrito(producto)*self.carrito[id]["cantidad"]
            if self.carrito[id]["cantidad"] <= 0:
                self.eliminar(producto)
            self.guardar_carrito()
            
    def limpiar_carrito(self):
        self.session["carrito"] = {}
        self.session.modified = True