'use strict';

// Navbar Transparent, Logo Reactive
const navbar = document.querySelector('#navbar');
const logo = document.querySelector('.navbar__img');
const homeHeight = home.getBoundingClientRect().height - 100;
window.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight) {
    navbar.classList.add('navbar--dark');
    logo.classList.add('reactive');
  } else {
    navbar.classList.remove('navbar--dark');
    logo.classList.remove('reactive');
  }
});

// 메뉴 선택시 해당 영역 이동
const menu = document.querySelector('.navbar__menu');
menu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  const scroll = document.querySelector(link);
  scroll.scrollIntoView({ behavior: 'smooth' });
});
