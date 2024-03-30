const names = document.querySelector(".names")
const email = document.querySelector(".email")
const joined = document.querySelector(".joined")
const body = document.querySelector("body")

    
function mostrarFormulario(formularioId) {
    // Oculta todos los formularios
    const formularios = document.querySelectorAll(".form-container");
    formularios.forEach((formulario) => {
        formulario.style.display = "none";
    });

    // Muestra el formulario correspondiente
    const formularioMostrar = document.getElementById(formularioId);
    if (formularioMostrar) {
        formularioMostrar.style.display = "block";
    } else {
        console.error("Formulario no encontrado:", formularioId);
    }
}
$(document).ready(function() {
    $('.pencil.alternate.icon').click(function() {
        var id_proveedor = $(this).closest('.proveedor_tabla').attr('data-proveedor-id');
        editarproveedor(id_proveedor);
    });
});
function editarproveedor(proveedor_id){
    $.ajax({
        url: '/admin/proveedor/edit/',
        type: 'GET',
        data: {
            proveedor_id: proveedor_id
        },
        success: function(data) {
            var proveedorJSON = data.proveedor;
            var proveedor = JSON.parse(proveedorJSON)[0].fields;
            document.getElementById('contenedor_proveedor').setAttribute('style', 'display: none')
            document.getElementById('boton_registro_proveedor').setAttribute('style', 'display: none');
            var formulario = document.getElementById('proveedor-form');
            console.log(proveedor)
            formulario.setAttribute('style', 'display: block;');
            formulario.querySelector('.ui.form').setAttribute('action', '/admin/proveedor/edit/'+ data.id_proveedor)
            formulario.querySelector('[name="nombre_completo"]').value= proveedor.nombre_completo;
            formulario.querySelector('[name="ciudad"]').value= proveedor.ciudad;
            formulario.querySelector('[name="nit"]').value= proveedor.nit;
            formulario.querySelector('[name="correo_electronico"]').value= proveedor.correo_electronico;
            formulario.querySelector('[name="telefono"]').value= proveedor.telefono;
            formulario.querySelector('[name="direccion"]').value= proveedor.direccion;
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}
document.getElementById('registro_proveedor').addEventListener('click',function(){
    document.getElementById('contenedor_proveedor').setAttribute('style', 'display: none');
    document.getElementById('boton_registro_proveedor').setAttribute('style', 'display: none');
    var formulario = document.getElementById('proveedor-form');
    formulario.setAttribute('style', 'display: block;');
});

