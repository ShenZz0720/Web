var swiper = new Swiper(".banner_swiper", {
  spaceBetween: 30,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar", 
    draggable: true,
  },

  autoplay: {
  delay: 3000, // 设置自动切换的时间间隔，单位为毫秒
  disableOnInteraction: false, // 用户操作Swiper之后，是否禁止自动轮播，默认为true
  },

  loop: true, // 开启循环模式

});


var swiper = new Swiper(".spot-swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
  loop:true,
  autoplay:{
    delay:3000,
    disableOnInteraction: false,
  },
  mousewheel: {
  invert: false,    
  eventsTarget: '.spot-swiper' 
},


});