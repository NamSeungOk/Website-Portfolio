'use strict';

// Navbar

// Navbar Transparent, Logo Reactive
const navbar = document.querySelector('#navbar');
const logo = document.querySelector('.logo__img');
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

// 로고 선택시 Navbar 영역으로 이동
const logoButton = document.querySelector('.navbar__logo');
logoButton.addEventListener('click', () => {
  const target = event.target;
  const link = target.dataset.link;
  scrollIntoView(link);
});

// ------------------------------------------------------------------------------------

// Home

// "Contact Me" 버튼 클릭시 Footer 영역으로 이동
const homeButton = document.querySelector('.home__contact');
homeButton.addEventListener('click', () => {
  scrollIntoView('#footer');
});

// 스크롤시 .home영역 점점 투명하게
const homeDiv = document.querySelector('.home');
const home_Height = homeDiv.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY <= home_Height) {
    homeDiv.style.opacity = 1 - window.scrollY / home_Height;
    homeButton.style.opacity = 1 - window.scrollY / home_Height;
  } else {
    homeDiv.style.opacity = 0.05;
    homeButton.style.opacity = 0.05;
  }
});

// "Contact Me" 버튼 클릭시 투명도 조절
homeButton.addEventListener('mouseenter', () => {
  homeButton.style.opacity = 1;
});

homeButton.addEventListener('mouseleave', () => {
  homeButton.style.opacity = 1 - window.scrollY / home_Height;
});

// ------------------------------------------------------------------------------------

// Work

// Category Filtering
const tabBtn = document.querySelector('.work__tab');
const work = document.querySelectorAll('.project');
const workContainer = document.querySelector('.work__project');
tabBtn.addEventListener('click', () => {
  const filter =
    event.target.dataset.filter ||
    event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  workContainer.classList.add('anim-out');
  workContainer.addEventListener('animationend', () => {
    work.forEach((project) => {
      if (filter === 'all' || project.dataset.type.includes(filter)) {
        project.classList.remove('visible');
      } else {
        project.classList.add('visible');
      }
    });
    workContainer.classList.remove('anim-out');
  });

  // ------------------------------------------------------------------------------------

  // 스크롤시 일정 영역부터 "topBtn" 버튼 보이게
  const topBtn = document.querySelector('.top__btn');
  const about = document.querySelector('#about');
  const aboutHeight = about.getBoundingClientRect().height;
  document.addEventListener('scroll', () => {
    if (window.scrollY > aboutHeight / 2) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  // "topBtn" 버튼 클릭하면 4초 뒤에 클릭 가능
  const btnSetTime = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    topBtn.removeEventListener('click', btnSetTime);
    setTimeout(() => {
      topBtn.addEventListener('click', btnSetTime);
    }, 4000);
  };

  // "topBtn" 버튼 클릭시 최상단 이동
  topBtn.addEventListener('click', btnSetTime);

  // Common Method
  function scrollIntoView(selector) {
    const scroll = document.querySelector(selector);
    scroll.scrollIntoView({ behavior: 'smooth' });
  }
});
