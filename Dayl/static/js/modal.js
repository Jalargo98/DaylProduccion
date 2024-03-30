document.getElementById('inicio-btn').addEventListener("click", function(){
var form = document.getElementById('login-form');
if (validateFormLogin(form)) {
    form.submit();
}
});

document.getElementById('registro-button derecha').addEventListener("click", function(){
var person_type = document.getElementById('person-type').value;
var form = document.getElementById('registro-form-'+person_type);

if (validateForm(form)) {
    form.submit();
}
});


function validateFormLogin(form) {
  var requiredFields = form.querySelectorAll('[required]');

  for (var i = 0; i < requiredFields.length; i++) {
    if (!requiredFields[i].value) {
      alert("Por favor, complete todos los campos requeridos.");
      return false;
    }
    else{
      return true;
    }
  }
};
function validateForm(form) {
  var requiredFields = form.querySelectorAll('[required]');

  for (var i = 0; i < requiredFields.length; i++) {
    if (!requiredFields[i].value) {
      alert("Por favor, complete todos los campos requeridos.");
      return false;
    }
  }

  var password = form.querySelector('input[name="contraseña"]').value;
  var confirm_password = form.querySelector('input[name="confirm_password"]').value;
  var termsCheckbox = form.querySelector('input[name="public"]').checked;
  if (password !== confirm_password) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    alert("La contraseña debe tener al menos 6 caracteres, un carácter alfabético y un carácter numérico.");
    return false;
  }
  if (termsCheckbox != true) {
    alert("Debe aceptar los términos y condiciones.");
    return false;
  }

  // Agregar otras validaciones aquí si es necesario

  return true;
}