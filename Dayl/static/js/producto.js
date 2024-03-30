document.getElementById('sum_button').addEventListener('click', input_sum);
document.getElementById('substract_button').addEventListener('click', input_substract);
document.getElementById('quantity-input').addEventListener('change', input_change);
var color_imagen =document.getElementById('colores-select');
obtener_imagen_color(color_imagen.value);
color_imagen.addEventListener('change', function() {
    obtener_imagen_color(color_imagen.value);
});

function input_sum() {
    var cantidadInput = document.getElementById('quantity-input');
    var cantidad = cantidadInput.value;
    var cantidad_max = document.getElementById('Cantidad_actualizada_ajax').getAttribute('data-producto-cantidad');
    
    if (parseInt(cantidad) < parseInt(cantidad_max)) {
        cantidadInput.value = parseInt(cantidad) + 1;
    }
    cambiar_url();
}
function input_substract() {
    var cantidadInput = document.getElementById('quantity-input');
    var cantidad = cantidadInput.value;

    if (parseInt(cantidad)>1){
        cantidadInput.value = parseInt(cantidad) - 1;
    }
    cambiar_url();
}
function input_change(){
    var cantidadInput = document.getElementById('quantity-input');
    var cantidad = cantidadInput.value;
    var cantidad_max = document.getElementById('Cantidad_actualizada_ajax').getAttribute('data-producto-cantidad');

    if (parseInt(cantidad)>parseInt(cantidad_max)){
        cantidadInput.value = parseInt(cantidad_max);
    }
    else if(parseInt(cantidad) < 1){
        cantidadInput.value = 1;
    }
    else if (isNaN(cantidad) || cantidad.toString().includes('e')){
        cantidadInput.value = 1;
    }
    cambiar_url();
}
function obtener_imagen_color(id_color){
    var imagen = document.getElementById('producto-imagen')
    var elementoDiv = document.getElementById('Cantidad_actualizada_ajax');
    var elementoStrong = elementoDiv.querySelector('strong');

    $.ajax({
        url: '/obtener_imagen_color/',  // Reemplaza con la URL correcta
        type: 'GET',
        data: {
            colorId: id_color  // Reemplaza con el ID del color que deseas buscar
        },
        success: function(data) {
            // Los datos retornados están en 'data'
            var imagenUrl = data.imagen_url;
            var cantidad = data.cantidad;
            imagen.setAttribute('src',imagenUrl);
            elementoDiv.setAttribute('data-producto-cantidad',cantidad);
            elementoStrong.nextSibling.textContent = cantidad;
            cambiar_url();
        },
        error: function(error) {
            // Maneja los errores si es necesario
            console.error('Error:', error);
        }
    });
}
function cambiar_url(){
    var url_carrito = document.getElementById('agregar-carrito');
    productoId = url_carrito.getAttribute('producto-id');
    colorId = color_imagen.value;
    cantidad = document.getElementById('quantity-input').value;
    var url = '/carrito/agregarc/' + productoId + '/' + colorId + '/' + cantidad ;
    document.getElementById('agregar-carrito').href = url;
}