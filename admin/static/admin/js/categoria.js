const names = document.querySelector(".names")
const email = document.querySelector(".email")
const joined = document.querySelector(".joined")
const navBar = document.querySelector("nav")
const navToggle = document.querySelector(".navToggle")
const navLinks = document.querySelectorAll(".navList")
const darkToggle = document.querySelector(".darkToggle")
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
        var id_categoria = $(this).closest('.productos_tabla').attr('data-categoria-id');
        editarColor(id_categoria);
    });
});
function editarColor(id_categoria){
    $.ajax({
        url: '/admin/categoria/edit/',
        type: 'GET',
        data: {
            id_categoria: id_categoria
        },
        success: function(data) {
            var categoriaJSON = data.categoria;
            var categoria = JSON.parse(categoriaJSON)[0].fields;
            document.getElementById('contenedor_colores').setAttribute('style', 'display: none');
            document.getElementById('boton_registro_producto').setAttribute('style', 'display: none');
            var formulario = document.getElementById('categoria_form');
            formulario.setAttribute('style', 'display: block;');
            formulario.querySelector('.ui.form').setAttribute('action', '/admin/categoria/edit/'+id_categoria)
            formulario.querySelector('[name="nombre"]').value = categoria.nombre;
            document.getElementById('img_preview').src ="/media/"+categoria.imagen;
            formulario.querySelector('[name="imagen"]').value = categoria.imagen;
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

document.getElementById('registro_producto').addEventListener('click',function(){
    document.getElementById('contenedor_colores').setAttribute('style', 'display: none');
    document.getElementById('boton_registro_producto').setAttribute('style', 'display: none');
    var formulario = document.getElementById('categoria_form');
    formulario.setAttribute('style', 'display: block;');
});