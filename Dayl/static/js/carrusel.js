document.addEventListener('DOMContentLoaded', function() {
  var swiper = new Swiper('.swiper', {
    slidesPerView: getSlidesPerView(),
    direction: getDirection(),
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2000, // Intervalo de tiempo en milisegundos entre cada cambio de slide
      disableOnInteraction: false, // Permite retomar el autoplay después de interacciones manuales
    },
    loop: true, // Agrega la opción de bucle
    on: {
      resize: function () {
        swiper.changeDirection(getDirection());
        swiper.params.slidesPerView = getSlidesPerView();
        swiper.update();
      },
      slideChange: function() {
        swiper.autoplay.start(); // Iniciar autoplay al cambiar de slide
      }
    },
  });

  function getSlidesPerView() {
    if (window.innerWidth <= 300){
      return 1;
    } else if (window.innerWidth <= 900){
      return 2;
    } else{
      return 3;
    }
  }
  function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 50 ? 'vertical' : 'horizontal';

    return direction;
  }
});
