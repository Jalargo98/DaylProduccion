from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('',views.index,name="producto_index"),
    path('<str:categoria>',views.categorias,name="categorias"),
    path('<str:categoria>/<str:subcategoria>',views.categorias,name="categorias"),
    path('<str:nombre_producto>/<int:id>/', views.producto, name='producto'),
    path('search/<str:nombre_producto>/',views.search_producto,name="search_producto"),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)