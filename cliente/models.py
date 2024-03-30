from django.db import models
from django.forms import ValidationError
from django.contrib.auth.models import User
from producto.models import Producto
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Cliente(models.Model):
    
    def validate_password(value):
        if len(value) < 6:
            raise ValidationError(_('La contraseña debe tener al menos 6 caracteres.'))
        
        if not any(char.isdigit() for char in value):
            raise ValidationError(_('La contraseña debe contener al menos un número.'))

        if not any(char.isalpha() for char in value):
            raise ValidationError(_('La contraseña debe contener al menos una letra.'))

    TIPO_PERSONA_CHOICES = (
        ('Juridica', 'Juridica'),
        ('Natural', 'Natural'),
    )
    
    TIPO_VIA_CHOICES = (
        ('CRR', 'Carrera'),
        ('CLL', 'Calle'),
        ('AV', 'Avenida'),
        ('DG', 'Diagonal'),
        ('TV', 'Transversal'),
    )
    
    DEPARTAMENTO_CHOICES = (('AMZ', 'Amazonas'),
        ('ANT', 'Antioquia'),
        ('ARA', 'Arauca'),
        ('ATL', 'Atlántico'),
        ('BOL', 'Bolívar'),
        ('BOY', 'Boyacá'),
        ('CAL', 'Caldas'),
        ('CAQ', 'Caquetá'),
        ('CAS', 'Casanare'),
        ('CAU', 'Cauca'),
        ('CES', 'Cesar'),
        ('CHO', 'Chocó'),
        ('COR', 'Córdoba'),
        ('CUN', 'Cundinamarca'),
        ('GUA', 'Guainía'),
        ('GUV', 'Guaviare'),
        ('HUI', 'Huila'),
        ('GUA', 'Guajira'),
        ('MAG', 'Magdalena'),
        ('MET', 'Meta'),
        ('NAR', 'Nariño'),
        ('NDS', 'Norte de Santander'),
        ('PUT', 'Putumayo'),
        ('QUI', 'Quindío'),
        ('RIS', 'Risaralda'),
        ('SAP', 'San Andrés y Providencia'),
        ('SAN', 'Santander'),
        ('SUC', 'Sucre'),
        ('TOL', 'Tolima'),
        ('VAC', 'Valle del Cauca'),
        ('VAU', 'Vaupés'),
        ('VID', 'Vichada'),)
    nombre = models.CharField(max_length=120,help_text="Nombre del cliente")
    telefono = models.CharField(max_length=15, help_text="Telefono del cliente")
    ciudad = models.CharField(max_length=30, help_text="Ciudad del cliente")
    tipo_persona = models.CharField(max_length=50, choices=TIPO_PERSONA_CHOICES, help_text="Tipo juridica de Cliente")
    nit = models.CharField(max_length=15, help_text="Nit de Cliente", null=True, blank=True)
    departamento = models.CharField(max_length=50,choices=DEPARTAMENTO_CHOICES)  
    tipo_via = models.CharField(max_length=3, choices=TIPO_VIA_CHOICES, help_text="Tipo de vía")
    numero = models.CharField(max_length=10, help_text="Número de vía")
    complemento = models.CharField(max_length=20, help_text="Complemento de dirección", null=True, blank=True)
    casa_apto = models.CharField(max_length=10, help_text="Casa o Apartamento", null=True, blank=True)
    descripcion = models.TextField(max_length=150, help_text="Descripción adicional", null=True, blank=True)
    user = models.OneToOneField(User, null=True, on_delete=models.SET_NULL, help_text="Llave foránea relacionada al usuario Django")
    class Meta:
        db_table = 'cliente'
    if nit:
        def __str__(self):
            return f'{self.nombre} ({self.nit})'
    else:
        def __str__(self):
            return f'{self.nombre}'