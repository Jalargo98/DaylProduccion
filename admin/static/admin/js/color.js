const names = document.querySelector(".names")
const email = document.querySelector(".email")
const joined = document.querySelector(".joined")
const body = document.querySelector("body")
const imagenTexto = document.getElementById('id_imagen_texto');
const imagenFile = document.getElementById('id_imagen');

document.getElementById('disparador-input').addEventListener('click',function(){
    imagenFile.setAttribute('name', 'imagen');
    imagenFile.required = true;
    imagenTexto.setAttribute('name', 'imagen2');
    imagenTexto.required = false;
    imagenFile.click()
})
imagenFile.addEventListener('change', function () {
    const imagenPreview = document.getElementById('img_preview');
    if (imagenFile.files && imagenFile.files[0]) {
        const imageURL = URL.createObjectURL(imagenFile.files[0]);
        imagenPreview.src = imageURL;
    }
});
$(document).ready(function() {
    $('.pencil.alternate.icon').click(function() {
        var id_color = $(this).closest('.productos_tabla').attr('data-color-id');
        editarColor(id_color);
    });
});
function editarColor(id_color){
    $.ajax({
        url: '/admin/color/edit/',
        type: 'GET',
        data: {
            id_color: id_color
        },
        success: function(data) {
            var colorJSON = data.color;
            var color = JSON.parse(colorJSON)[0].fields;
            document.getElementById('contenedor_colores').setAttribute('style', 'display: none')//Aqui va el id de la tabla de los productos
            document.getElementById('boton_registro_producto').setAttribute('style', 'display: none');//El botón para abrir el formulario de registro
            var formulario = document.getElementById('color_form');
            formulario.setAttribute('style', 'display: block;');
            formulario.querySelector('.ui.form').setAttribute('action', '/admin/color/edit/'+id_color)
            formulario.querySelector('[name="color"]').value = color.color;
            formulario.querySelector('[name="stock"]').value = color.stock;
            formulario.querySelector('[name="producto"]').value = color.producto;
            document.getElementById('img_preview').src ="/media/"+color.imagen;
            formulario.querySelector('[name="imagen"]').value = color.imagen;
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

document.getElementById('registro_producto').addEventListener('click',function(){
    document.getElementById('contenedor_colores').setAttribute('style', 'display: none');
    document.getElementById('boton_registro_producto').setAttribute('style', 'display: none');
    var formulario = document.getElementById('color_form');
    formulario.setAttribute('style', 'display: block;');
});