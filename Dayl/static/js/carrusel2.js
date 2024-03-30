document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
  
    let intervalId;
  
    function startAutoplay() {
      intervalId = setInterval(function() {
        carousel.prepend(carousel.lastElementChild);
      }, 300000); // Ajusta el intervalo de tiempo según tus necesidades
    }
  
    function stopAutoplay() {
      clearInterval(intervalId);
    }
  
    function goToNextSlide() {
      carousel.prepend(carousel.lastElementChild);
      stopAutoplay();
    }
  
    function goToPrevSlide() {
      carousel.appendChild(carousel.firstElementChild);
      stopAutoplay();
    }
  
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
  
    carousel.addEventListener('mouseover', stopAutoplay);
    carousel.addEventListener('mouseout', startAutoplay);
  
    function initializeCarousel() {
      startAutoplay();
    }
  
    initializeCarousel();
  });
  