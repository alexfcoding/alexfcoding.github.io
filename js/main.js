const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");
const myImage = document.querySelector(".my-image");
let showMenu = false;
var direction = true;

menuBtn.addEventListener("click", toggleMenu);

// window.onload = function () {
//   var logo = document.getElementById("my-image");
//   logo.onload = animateImage(direction);
// };

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    navItems.forEach((item) => item.classList.add("show"));
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    navItems.forEach((item) => item.classList.remove("show"));
    showMenu = false;
  }
}

function animateImage() {
  var finalDrawing = document.getElementById("canvas");
  var conFinal = finalDrawing.getContext("2d");
  var drawing = document.getElementById("canvas2");
  var con = drawing.getContext("2d");
  var original = document.getElementById("my-image");

  cols = finalDrawing.offsetWidth;
  rows = finalDrawing.offsetHeight;

  con.drawImage(original, 0, 0);
  imgData = con.getImageData(
    0,
    0,
    finalDrawing.offsetWidth,
    finalDrawing.offsetHeight
  );

  var fontSize = 70;

  drawWithDelay();

  function drawWithDelay() {
    conFinal.clearRect(
      0,
      0,
      finalDrawing.offsetWidth,
      finalDrawing.offsetHeight
    );
    // conFinal.fillStyle = "black";
    // conFinal.fill();

    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        index = (col + row * imgData.width) * 4;

        r = imgData.data[index];
        g = imgData.data[index + 1];
        b = imgData.data[index + 2];
        a = imgData.data[index + 3];

        if (
          row % Math.floor(fontSize) == 0 &&
          col % Math.floor(fontSize) == 0
        ) {
          var randomSymbol = randomInt(0, 10);

          conFinal.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          conFinal.fillText(randomSymbol, col - 2, row + 5);
        }
      }
    }

    conFinal.font = fontSize + 5 + "px Arial";

    if (fontSize > 3) {
      fontSize = fontSize - 1;
    }

    if (fontSize <= 3) {
      conFinal.drawImage(original, 0, 0);
      direction = false;
    } else {
      setTimeout(drawWithDelay, 20);
    }
  }
}

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}
