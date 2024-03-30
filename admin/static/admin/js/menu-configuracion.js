logo = document.getElementById('logo')

window.addEventListener('resize', function(event) {
  if(this.screen.width < 1600){
    console.log('change')
  }
}, true);



//funcion de ocultar el menu


document.addEventListener('DOMContentLoaded', function () {
  var iconoIzquierdo = document.getElementById('icon-izquierdo');
  var menuIzquierdo = document.querySelector('.menu-izq');
  var menuCentro = document.querySelector('.contenido-central');

  iconoIzquierdo.addEventListener('click', function () {
    menuIzquierdo.classList.toggle('menu-visible');
    menuCentro.classList.toggle('menu-centro-left');
    $(iconoIzquierdo).attr('style', 'display:none;transition: display 2s ease;')
    $(menuCentro).attr('style', 'width:100%;left:25%;');
  });
  if(window.innerWidth < 401){
    window.addEventListener('resize', function () {
      if (window.innerWidth > 400) {
        inputCentro.classList.remove('ocultar1');
      } else {
        
      }
    });
  }
});

//Funcion de regreso a home
logo.addEventListener('click', function(){
  window.location.href ='/';
})

document.addEventListener('DOMContentLoaded', function () {
  $('#searchFilters').on('keypress', function(e) {
    if (e.which == 13) {
      updateSearchResults();
    }
  });
  $('div.ui.icon.input > i.search.icon').click(function(){
    updateSearchResults();
  });
  function updateSearchResults(){
    var selectFilters = []; // Array para almacenar los valores data-value

    $('#selectFilters').children('a').each(function() {
      var dataValue = $(this).attr('data-value');
      selectFilters.push(dataValue); // Agregar el valor data-value al array
    });

    var selectFilters = selectFilters.join(',');
    var searchValue = $('#searchFilters').val();
    axios({
      method: 'GET',
      url: '/admin/search/',
      params: {
        searchFilter: selectFilters,
        searchValue: searchValue
      },
      headers: {'X-Custom-Header': 'foobar'}, // cabeceras personalizadas
      timeout: 5000, // tiempo máximo antes de abortar la solicitud, en milisegundos
    })
    .then(function (response) {
      window.location.href = '/admin/search/complete';
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  function resize_items_select() {
    if (!$('#selectFilters').hasClass('active')) {
        $('#selectFilters').children('a').each(function(index) {
            if (index != 0) {
              setTimeout(function() {
                $(this).css('display', 'none !important');
                console.log($(this).val)
              },1000);
            }
        });
    } else {
        $('#selectFilters').children('a').each(function() {
            $(this).css('display', 'inline-block !important');
        });
    }
  }
  $('#close-menu-izq').click(function(){
    $('#menu-izquierda').attr('class', 'menu-izq');
    $('#icon-izquierdo').attr('style','display: block;transition: display 2s ease;')
    $('.contenido-central').attr('style','')
  })


});