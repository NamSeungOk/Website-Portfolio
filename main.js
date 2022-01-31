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
menu.addEventListener('click', () => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

// Home "Contact Me" 버튼 클릭시 Contact 영역으로 이동
const contactButton = document.querySelector('.home__contact');
contactButton.addEventListener('click', () => {
  scrollIntoView('#footer');
});

// 공통부분 메서드 추출
function scrollIntoView(selector) {
  const scroll = document.querySelector(selector);
  scroll.scrollIntoView({ behavior: 'smooth' });
}
