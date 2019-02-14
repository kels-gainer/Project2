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

// img modal

var modal = document.getElementById("myModal")

var img = document.getElementById("myImg");
var modalImg = document.getElementById("test1");
var captionText = document.getElementById("caption");
img.onclick = function() {
  modal.style.display = "block";
  modalIMag.src = this.src;
  captionText.innerHTML = this.lastChild;
}

var span = document.getElementByIdByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

