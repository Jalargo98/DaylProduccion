from django import forms
from producto.models import Producto,Color,Categoria,Subcategoria,Proveedor

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = '__all__'
class ColorForm(forms.ModelForm):
    class Meta:
        model = Color
        fields = '__all__'
class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = '__all__'
class SubcategoriaForm(forms.ModelForm):
    class Meta:
        model = Subcategoria
        fields = '__all__'
        
class ProveedorForm(forms.ModelForm):
    class Meta:
        model = Proveedor
        fields = '__all__'
        