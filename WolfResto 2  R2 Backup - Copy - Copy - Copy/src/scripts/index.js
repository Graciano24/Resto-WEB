/* eslint-disable no-use-before-define */
import "regenerator-runtime";
import "../styles/style.css";
import "../styles/responsive.css";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App({
  button: document.querySelector("#hamburgerButton"),
  drawer: document.querySelector("#navigationDrawer"),
  content: document.querySelector("#mainContent"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});

// index.js

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

document.querySelector(".prev").addEventListener("click", () => {
  plusSlides(-1);
});

document.querySelector(".next").addEventListener("click", () => {
  plusSlides(1);
});
