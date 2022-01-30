'use strict';
// 오류 사용시 오류메시지 출력

// Navbar Transparent, Logo Reactive
const navbar = document.querySelector('#navbar');
// navbar 요소 선택
const logo = document.querySelector('.navbar__img');
//navbar__img 요소 선택
const homeHeight = home.getBoundingClientRect().height;
// home의 padding과 border 포함한 height
window.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight) {
    navbar.classList.add('navbar--dark');
    logo.classList.add('reactive');
  } else {
    navbar.classList.remove('navbar--dark');
    logo.classList.remove('reactive');
  }
});
