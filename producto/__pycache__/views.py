from django.shortcuts import render,redirect
from .forms import Registro, Login
from django.contrib import messages
from django.contrib.auth import logout
from .decorators import only_modal_access
from .models import Cliente
from django.contrib.auth.hashers import check_password
# Create your views here.
@only_modal_access
def index(request):
    form = Registro(request.POST)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            messages.success(request, "Todo salio correcto")
            return  redirect('index')
        else:
            for field , errors in form.errors.items():
                messages.error(request, f"Hubo un error en {field} : {errors}")
            return redirect("index")
    return render(request, "layouts/parcials/register.html", {"form":form})

@only_modal_access
def login(request):
    form = Login(request.POST)
    if request.method == "POST":
        if form.is_valid():
            datos = form.cleaned_data
            try:
                cliente = Cliente.objects.get(correo_electronico=datos["email"])
                if datos["password"] == cliente.contraseña:
                    request.session['cliente_id'] = cliente.id
                    request.session['cliente_name'] = cliente.nombre
                    return redirect('index')
            except Cliente.DoesNotExist:
                messages.error(request, "El usuario o la contraseña no son invalidas")
                return redirect('index')
        else:
            messages.error(request, "El usuario o la contraseña no son validas")
            return redirect('index')    
    return render(request, "layouts/parcials/login.html",{"form":form})

def clogout(request):
    logout(request)
    return redirect("index")