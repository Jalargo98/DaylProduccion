from django import forms
from .models import Cliente

class Registro(forms.ModelForm):
    confirm_password = forms.CharField(max_length=50,validators=[Cliente.validate_password])
    class Meta:
        model = Cliente
        fields = "__all__"
    def clean(self):
        cleaned_data = super().clean()
        contraseña = cleaned_data.get('contraseña')
        confirm_password = cleaned_data.get('confirm_password')

        if contraseña != confirm_password:
            self.add_error('confirm_password', 'Las contraseñas deben ser iguales')

        return cleaned_data
    
class Login(forms.Form):
    email = forms.CharField(max_length=50)
    password = forms.CharField(max_length=50,widget=forms.PasswordInput)