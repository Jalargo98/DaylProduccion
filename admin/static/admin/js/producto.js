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
        var id_producto = $(this).closest('.productos_tabla').attr('data-producto-id');
        editarProducto(id_producto);
    });
});
function editarProducto(producto_id){
    $.ajax({
        url: '/admin/producto/edit/',
        type: 'GET',
        data: {
            producto_id: producto_id
        },
        success: function(data) {
            var productoJSON = data.producto;
            var producto = JSON.parse(productoJSON)[0].fields;
            document.getElementById('contenedor_productos').setAttribute('style', 'display: none')
            document.getElementById('boton_registro_producto').setAttribute('style', 'display: none');
            var formulario = document.getElementById('producto-form');
            formulario.setAttribute('style', 'display: block;');
            formulario.querySelector('.ui.form').setAttribute('action', '/admin/producto/edit/'+data.id_producto)
            formulario.querySelector('[name="nombre"]').value= producto.nombre;
            formulario.querySelector('[name="porcentaje_iva"]').value= producto.porcentaje_iva;
            formulario.querySelector('[name="precio"]').value= producto.precio;
            formulario.querySelector('[name="oferta"]').value= producto.oferta;
            formulario.querySelector('[name="subcategoria"]').value= producto.subcategoria;
            formulario.querySelector('[name="proveedor"]').value= producto.proveedor;
            formulario.querySelector('[name="descripcion"]').value= producto.descripcion;
            formulario.querySelector('[name="stock"]').value= producto.stock;
            formulario.querySelector('[name="estado"]').checked= producto.estado;
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}
document.getElementById('registro_producto').addEventListener('click',function(){
    document.getElementById('contenedor_productos').setAttribute('style', 'display: none');
    document.getElementById('boton_registro_producto').setAttribute('style', 'display: none');
    var formulario = document.getElementById('producto-form');
    formulario.setAttribute('style', 'display: block;');
});
var formulario = document.querySelector('#producto-form form');
formulario.addEventListener('submit',function(event){
    event.preventDefault();
    console.log(formulario)
    alerta_borrar_producto(formulario);
});
function alerta_borrar_producto(formulario) {
    if (formulario.querySelector('[name="estado"]').checked === false) {
        swal({
            title: "Desactivar Producto",
            text: "Estas seguro que deseas desactivar el producto?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Tu producto se encuentra inactivo", {
                    icon: "success",
                });
                formulario.querySelector('[name="estado"]').checked = false;
                formulario.submit();
            } else {
                swal("Tu producto se encuentra activo");
                formulario.querySelector('[name="estado"]').checked = true;
                formulario.submit();
            }
        });
    }else{
        formulario.submit();
    }
}
