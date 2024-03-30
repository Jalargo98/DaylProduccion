
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name="index"),
    path('producto/',include(('producto.urls','product'),namespace='product'), name="product"),
    path('carrito/', include(('buycar.urls', 'buycar'), namespace='buycar'), name="buycar"),
    path('obtener_imagen_color/', views.obtener_imagen_color, name='obtener_imagen_color'),
    path('cliente/',include(('cliente.urls', 'cliente'), namespace='cliente'), name='cliente'),
    path('admin/', include(('admin.urls', 'admin'), namespace='admin'), name='admin'),
    path('factura/', include(('factura.urls','factura'),namespace='factura'),name='factura'),
    path('registro/', views.registro, name="registro"),
    path('paypal/', include("paypal.standard.ipn.urls")),
    path('reset_password/', auth_views.PasswordResetView.as_view(template_name="reset1.html"), name='password_reset'),
    path('reset_password_send/', auth_views.PasswordResetDoneView.as_view(template_name="mensaje-cambio-pass.html"), name='password_reset_done'),
    path('reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(template_name="contraseña_new.html"), name='password_reset_confirm'),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name="mensaje-terminado-contraseña.html"), name='password_reset_complete'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
