$(document).ready(function () {
  // Owl Carousel
  $(".owl-carousel").owlCarousel({
    dots: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
});
