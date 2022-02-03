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
  menu.classList.remove('open');
});

// 로고 선택시 Navbar 영역으로 이동
const logoButton = document.querySelector('.navbar__logo');
logoButton.addEventListener('click', () => {
  const target = event.target;
  const link = target.dataset.type;
  scrollIntoView(link);
});

// Navbar Toggle Button
const navbarToggle = document.querySelector('.navbar__toggle');
navbarToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
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
// Tab Filtering + Animation
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

  // 이전 Tab Active는 제거하고 클릭된 아이템에 Active 추가하기
  const active = document.querySelector('.tab__btn.active');
  active.classList.remove('active');
  const target =
    event.target.nodeName === 'BUTTON'
      ? event.target
      : event.target.parentNode;
  target.classList.add('active');

  // Tab Animation
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

// ------------------------------------------------------------------------------------

// 모든 Section 요소를 배열 형태로 sectionIds에 저장
const sectionIds = ['#home', '#about', '#skill', '#work', '#footer'];
// Section의 모든 요소들을 새로운 DOM으로 변환
const sections = sectionIds.map((id) => document.querySelector(id));
// Nav의 메뉴 아이템 모든 요소들을 새로운 DOM으로 변환
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

// selectedNavItem 변수에 navItems의 첫번째 요소 저장
let selectedNavItem = navItems[0];
let selectedNavIndex = 0;

// 함수 생성
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const scroll = document.querySelector(selector);
  scroll.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// IntersectionObserver Option
const observerOption = {
  root: null, // viewport 기준
  rootMargin: '0px', // 0px 기준
  threshold: 0.3, // 아이템이 얼만큼 보여질 때 콜백함수를 호출할지
};

// IntersectionObserver Callback Function
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.intersecting && entry.intersectionRatio > 0) {
      // 인덱스 생성
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 아이템이 윗 화면 밖으로 나가면 이후 인덱스 지정
      // 아이템이 아래 화면 밖으로 나가면 이전 인덱스 지정
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

// IntersectionObserver
const observer = new IntersectionObserver(
  observerCallback,
  observerOption
);

// Section 관찰
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  selectNavItem(navItems[selectedNavIndex]);
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// ------------------------------------------------------------------------------------
