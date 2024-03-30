function enviarPeticion(idProducto) {
  const start = new Date();
  const url = '/admin/graficaxproducto/';
  const data = {
      id_producto: idProducto,
  };

  $.ajax({
      url: url,
      type: 'GET',
      data: data,
      success: function(response) {
          $('#graph-container').html(response);
      },
      error: function(xhr, status, error) {
          console.log(error);
      }
  });

}

$(document).ready(function() {
$('#producto-input').on('input', function() {
    var searchTerm = $(this).val();
    if (searchTerm.length > 3) {
        $.ajax({
            url: '/admin/API/producto_categoria/',
            type: 'GET',
            data: {
                'searchTerm': searchTerm
            },
            success: function(response) {
                var productos = JSON.parse(response);
                mostrarProductos(productos);
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    } else {
        $('#producto-lista').empty();
    }
});

function mostrarProductos(productos) {
    $('#producto-lista').empty();

    if (productos.length > 0) {
        productos.forEach(function(producto) {
            var opcionProducto = $('<div class="opcion-producto" data-id="' + producto.id + '" data-nombre="' + producto.title + '" data-categoria="' + producto.category + '">' + producto.title + ' - ' + producto.category + '</div>');
            opcionProducto.click(function() {
                var productoSeleccionado = $(this);
                $('#producto-input').val(productoSeleccionado.data('nombre'));
                enviarPeticion(producto.id)
                $('#producto-lista').empty();
            });
            $('#producto-lista').append(opcionProducto);
        });
    } else {
        console.log('No se encontraron productos');
    }
}
});