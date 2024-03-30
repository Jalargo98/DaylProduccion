from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'cliente'

urlpatterns = [
    path('',views.index,name="probando"),
    path('login',views.login,name="login"),
    path('logout',views.clogout,name="logout"),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)