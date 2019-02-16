// navbar start
const menu = document.querySelector("svg");
const body = document.querySelector("body");

menu.addEventListener("click", morph);
body.addEventListener("click", hide_sidebar);

const wrapper = document.querySelector(".wrapper");

function morph(e) {
  e.stopPropagation();
  menu.classList.toggle("open");
  wrapper.classList.toggle("sidebar_open");
}

function hide_sidebar() {
  wrapper.classList.remove("sidebar_open");
  menu.classList.remove("open");
}
// navbar end


// heart button

$(function() {
  $('.button-like')
    .bind('click', function(event) {
      $(".button-like").toggleClass("liked");
    })
});
