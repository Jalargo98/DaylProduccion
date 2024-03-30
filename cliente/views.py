from django.shortcuts import render,redirect
from . models import Cliente
from .forms import Registro, Login
from django.contrib import messages
from .decorators import ajax_request_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout
from .models import Cliente
from django.forms import ValidationError
from django.contrib.auth.hashers import check_password
from django.contrib.auth.decorators import login_required
from factura.models import *
from django.contrib.auth.forms import UserChangeForm
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.urls import reverse

# Create your views here.
@ajax_request_required
def index(request):
    if request.method == "POST":
        form = Registro(request.POST)
        if form.is_valid():
            form_data = form.cleaned_data
            try:
                user = User.objects.create_user(
                    form_data['correo_electronico'],
                    form_data['correo_electronico'],
                    form_data['contraseña']
                )
                user.first_name = form_data['nombre']
                user.save()
                cliente = Cliente.objects.create(
                    user=user,
                    nombre=form_data['nombre'],
                    telefono=form_data['telefono'],
                    ciudad=form_data['ciudad'],
                    tipo_persona=form_data['tipo_persona'],
                    nit=form_data['nit'],
                    departamento=form_data['departamento'],
                    tipo_via=form_data['tipo_via'],
                    numero=form_data['numero'],
                    complemento=form_data['complemento'],
                    casa_apto=form_data['casa_apto'],
                    descripcion=form_data['descripcion']
                )
                cliente.save()

            except user.DoesNotExist as e:
                messages.error(f'Error: {e}')

            messages.success(request, f"El usuario {form_data['nombre']} se registro con exito")
            return redirect('index')
        else:
            for field, errors in form.errors.items():
                messages.error(request, f"Hubo un error en {field}: {errors}")
            return redirect("index")
    return render(request, "layouts/parcials/register.html", {})

@ajax_request_required
def login(request):
    form = Login(request.POST)
    if request.method == "POST":
        if form.is_valid():
            datos = form.cleaned_data
            user = authenticate(username=datos['email'],password=datos['password'])
            if user is None:
                messages.error(request, f'Error en las credenciales')
            else:
                auth_login(request, user)
                if user.is_superuser:
                    return redirect('admin:index')
            return redirect('index')
        else:
            return redirect('index')
    return render(request, "layouts/parcials/login.html",{"form":form})

def clogout(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect("index")


def mostrar_factura_cliente(request):
    cliente = Cliente.objects.get(user=request.user)
    factura = Factura.objects.get(cliente=cliente)
    context ={
        'factura':factura
    }
    return render(request, 'facturaCliente.html', context)


@login_required
def modificar_cliente(request):
    cliente = Cliente.objects.get(user=request.user)
    form = Registro(request.POST)
    if request.method =='POST':
        contraseña_ing = request.POST.get('verifi_cliente')
        if check_password(contraseña_ing, request.user.password):
            for field_name, field in form.fields.items():
                valor=form[field_name].value()
                if valor is not None:
                    if field_name.lower() not in ['contraseña', 'correo_electronico']:
                        setattr(cliente, field_name, valor)
                    elif field_name.lower() == 'contraseña':
                        request.user.set_password(valor)
                    elif field_name.lower() == 'correo_electronico':
                        request.user.username = valor
                        request.user.email = valor
                        
                    request.user.save()
                    cliente.save()
                    messages.success(request,'Los cambios se han realizado con exito')
                    return redirect('cliente:notificacion')
    return render(request, 'modificar_dato1s.html', {'form':form,'cliente':cliente, 'url':'configuracion'})
            
#print(f"{field_name}:{form[field_name].value()}")
#{field.widget.attrs.get('nombre')}


def notificacion(request):

    mensaje_html = (
        '<head></head><body style="margin: 20px auto auto 200px;font-family:"Gill Sans", "Gill Sans MT", Calibri,"Trebuchet MS", sans-serif;"><h1 style="text-align: center;color: #5EA0FF;" >Hola {first_name},</h1><p style="font-size: 20px;text-align: justify;">Queríamos informarte que se han realizado cambios en tu perfil:</p><p style="font-size: 20px;text-align: justify;">Por favor, revisa la información actualizada y asegúrate de que todo esté correcto.</p><p style="font-size: 20px;text-align: justify;">Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros.</p><p style="font-size: 20px;text-align: justify;">Si no has sido el que a realizado estas modificaciones contactanos y cambia la contraseña con este link</p><p style="font-size: 20px;text-align: justify;"><a href="{url}">Clic aqui para dirijirlo a cambiar contraseña</a></p><p style="font-size: 20px;text-align: justify;">Gracias por utilizar nuestro servicio.</p><p style="margin: 3px 10px; font-size: 20px;">Atentamente,</p><p style=" margin: 3px 10px; font-size: 20px;">Tu Equipo de Soporte</p><p style="margin: 3px 10px; color: #5EA0FF; font-weight: bold;  font-size: 25px;">DAYL</p></body></html>'
    ).format(first_name=request.user.first_name, url=f"http://{request.get_host()}/{reverse('password_reset')}")

    mensaje_texto = (
        'Hola {first_name},\n\n'
        'Queríamos informarte que se han realizado cambios en tu perfil:.\n\n'
        'Por favor, revisa la información actualizada y asegúrate de que todo esté correcto\n\n'
        'Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros \n\n'
        'Si no has sido el que a realizado estas modificaciones contactanos y cambia la contraseña con este link {url} \n\n'
        'Gracias por utilizar nuestro servicio. \n\n'
        'Atentamente,\n Tu Equipo de Soporte \n Dayl'
    ).format(first_name=request.user.first_name, url=reverse('password_reset'))

    email=EmailMultiAlternatives(
        'MODIFICACIONES EN LA CUENTA',  # Asunto del correo electrónico
        mensaje_texto,  # Cuerpo del correo electrónico en texto sin formato
        settings.EMAIL_HOST_USER,  # Dirección de correo electrónico del remitente
        [request.user.email]  # Lista de direcciones de correo electrónico de destino
    )

    email.attach_alternative(mensaje_html, "text/html")

    email.fail_silently = False
    email.send()

    return redirect('index')

                
    