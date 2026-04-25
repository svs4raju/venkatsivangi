// SELECT ELEMENTS
const slides = document.querySelectorAll('.carousel-item');
const clickers = document.querySelectorAll('.carousel-icon');

// MAIN FUNCTION (Reusable)
function updateCarousel(index) {
  clickers.forEach(c => c.classList.remove('active'));
  clickers[index].classList.add('active');
  slides.forEach(s => s.classList.remove('active', 'active-fade'));
  slides[index].classList.add('active');
  for (let i = 0; i < index; i++) {
    slides[i].classList.add('active-fade');
  }
}

// CLICK FUNCTIONALITY
clickers.forEach((ele, index) => {
  ele.addEventListener('click', () => {
    updateCarousel(index);
  });
});

// ── SCROLL + SWIPE (added below, nothing above changed) ──────────────────────

const carouselSection = document.querySelector('.carousel');
let currentIndex = 0;
let isHovered = false;
let scrollAcc = 0;
const SCROLL_THRESHOLD = 400;

function goTo(index) {
  currentIndex = (index + slides.length) % slides.length;
  updateCarousel(currentIndex);  // reuses your existing function
}

// Track mouse inside the section
carouselSection.addEventListener('mouseenter', () => {
  isHovered = true;
  scrollAcc = 0;
});
carouselSection.addEventListener('mouseleave', () => {
  isHovered = false;
  scrollAcc = 0;
});

// Scroll hijack only when hovered
window.addEventListener('wheel', (e) => {
  if (!isHovered) return;
  e.preventDefault();
  scrollAcc += e.deltaY;
  if (scrollAcc > SCROLL_THRESHOLD) {
    scrollAcc = 0;
    goTo(currentIndex + 1);
  } else if (scrollAcc < -SCROLL_THRESHOLD) {
    scrollAcc = 0;
    goTo(currentIndex - 1);
  }
}, { passive: false });

// Touch swipe (mobile)
let touchStartY = 0;
let touchLocked = false;

carouselSection.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  touchLocked = false;
}, { passive: true });

carouselSection.addEventListener('touchmove', (e) => {
  if (touchLocked) return;
  const dy = e.touches[0].clientY - touchStartY;
  if (Math.abs(dy) > 30) {
    e.preventDefault();
    goTo(dy < 0 ? currentIndex + 1 : currentIndex - 1);
    touchLocked = true;  // one swipe = one slide
  }
}, { passive: false });

carouselSection.addEventListener('touchend', () => {
  touchLocked = false;
});

// Email functionality
function sendMail() {
  let params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    msg: document.getElementById('msg').value,
  }
  emailjs.send("service_u0svbfv", "template_bs3le37", params)
    .then(alert('Thanks for your Email, I will be back with you within No time'));
}


//IMAGE MOVER

const scene = document.querySelector('.hero');
const card  = document.querySelector('.tilt-image');

scene.addEventListener('mousemove', (e) => {
  const rect = scene.getBoundingClientRect();
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;

  const rotateY =  ((e.clientX - cx) / (rect.width  / 2)) * 5;
  const rotateX = -((e.clientY - cy) / (rect.height / 2)) * 5;

  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// scene.addEventListener('mouseleave', () => {
//   card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
// });