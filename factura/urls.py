
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('detalle_compra/', views.detalle_compra, name="detalle_compra"),
    path('pago_paypal/<int:id_pedido>', views.pago_paypal, name="pago_paypal"),
    path('payment_done/',views.paypal_return,name='paypal-return'),
    path('payment_cancelled',views.paypal_cancel,name='paypal-cancel'),
    path('mostrar-factura/',views.mostrar_tabla_factura, name="mostrar-factura"),
    path('verfactura/<int:id_factura>', views.mostrar_factura, name="verfactura"),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
