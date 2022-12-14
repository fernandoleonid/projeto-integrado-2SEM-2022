const menu = document.querySelector(".menu-burger-container");
const menuList = document.querySelector(".header__buttons");
const body = document.querySelector("body");
const links = document.querySelectorAll(".header__buttons li");

links.forEach((link) => link.addEventListener("click", () => {
  open();
}))

menu.addEventListener("click", function (e) {
  open();
  if (menu.classList.contains("show")) {
    menu.classList.remove("animation");
  }
  if (!menu.classList.contains("show")) {
    menu.classList.add("animation");
    setTimeout((e) => {
      menu.classList.remove("animation");
    }, 900);
  }
});

function open() {
  menu.classList.toggle("show");
  menuList.classList.toggle("show");
  if (menu.classList.contains("show")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "visible";
  }
}
