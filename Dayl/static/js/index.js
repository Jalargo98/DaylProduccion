function cambiarDiseno() {
  const anchoPantalla = window.innerWidth;
  const bodyElement = document.querySelector('body');

  if (anchoPantalla > 767) {
    bodyElement.classList.add('pantalla-grande');
    bodyElement.classList.remove('pantalla-pequena');
  } else {
    bodyElement.classList.remove('pantalla-grande');
    bodyElement.classList.add('pantalla-pequena');
  }
}
$(document).ready(function () {
  $('.ui.dropdown').dropdown();

  $('.hamburger-menu').click(function () {
      $(this).toggleClass('active');
      $('.menu-hamburger').toggle();
  });

  $(window).resize(function () {
      var windowWidth = $(window).width();
      if (windowWidth > 767) {
          $('.hamburger-menu').removeClass('active');
          $('.menu-hamburger').hide();
      }
  });
});
$(document).ready(function() {
  // Maneja el clic en el elemento principal del menú
  $('.dropdown-main').on('click', function() {
    $(this).children('.menu-dropdown').toggleClass('active');
  });
});

$(document).ready(function() {
  $('#registro-btn').click(function() {
      $('#registro-content').load('/cliente/');
      $('.registro-modal').modal('show');
  });
});
$(document).ready(function() {
  $('#login-btn').click(function() {
      $('#registro-content').load('/cliente/login');
      $('.registro-modal').modal('show');
  });
});
function toggleForm() {
  var personType = document.getElementById('person-type').value;
  var juridicaForm = document.getElementById('juridica-form');
  var naturalForm = document.getElementById('natural-form');
  var questionSection = document.getElementById('question-section');

  if (personType === 'juridica') {
    juridicaForm.style.display = 'block';
    naturalForm.style.display = 'none';
  } else if (personType === 'natural') {
    juridicaForm.style.display = 'none';
    naturalForm.style.display = 'block';
  } else {
    juridicaForm.style.display = 'none';
    naturalForm.style.display = 'none';
    questionSection.style.display = 'block';
  }
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

$('div.search-bar > input').on('keypress', function(e) {
  // Verificar si la tecla presionada es Enter
  if (e.which == 13) {
    var input = $(this).val();
    var url = `/producto/search/${input}/`
    window.location.href = url;
  }
});

$('div.search-bar > button').click(function(){
  var input = $('div.search-bar > input').val();
  var url = `/producto/search/${input}/`
  window.location.href = url;
});
$('li.search-bar > input').on('keypress',function(e){
  if (e.which == 13) {
    var input = $(this).val();
    var url = `/producto/search/${input}/`
    window.location.href = url;
  }
})