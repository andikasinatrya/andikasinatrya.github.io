window.addEventListener("scroll", function () {
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 10);
});

var cursor = document.querySelector(".blob");

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiperleader = new Swiper(".uniqueSwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2.5,
    slideShadows: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const a = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = () => {
  a.classList.toggle("active");
};

const menu = document.querySelector("#menu");
document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !a.contains(e.target)) {
    a.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 828) {
    const swiperPrev = document.querySelector(".swiper-button-prev");
    const swiperNext = document.querySelector(".swiper-button-next");

    swiperPrev.style.display = "none";
    swiperNext.style.display = "none";
  }
});
