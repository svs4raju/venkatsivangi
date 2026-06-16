

document.addEventListener('DOMContentLoaded', () => {
  // Initialize current year in footer
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear().toString();
  }

  /* ==========================================================================
     LIGHT / DARK THEME TOGGLE
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleIcon = themeToggle ? themeToggle.querySelector('i') : null;

  // Function to set theme
  const setTheme = (isLight) => {
    if (isLight) {
      document.body.classList.add('light-theme');
      if (themeToggleIcon) {
        themeToggleIcon.className = 'fa-solid fa-sun';
      }
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      if (themeToggleIcon) {
        themeToggleIcon.className = 'fa-solid fa-moon';
      }
      localStorage.setItem('theme', 'dark');
    }
  };

  // Determine initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme === 'light');
  } else {
    // Check system preference, default to dark if not light
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight);
  }

  // Toggle button event handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('light-theme');
      setTheme(!isCurrentlyLight);
    });
  }

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     HEADER SCROLL CLASS
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page starts scrolled

  /* ==========================================================================
     DYNAMIC TYPING ANIMATION
     ========================================================================== */
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = [
    'scalable web applications.',
    'interactive user interfaces.',
    'robust backend APIs.',
    'pixel-perfect web designs.'
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between full words
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (!typedTextSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  // Start typing animation
  if (typedTextSpan) {
    // Clear initial content before starting
    typedTextSpan.textContent = '';
    setTimeout(type, 1000);
  }

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.15, // 15% visibility
    rootMargin: '0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* ==========================================================================
     SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.35 // Trigger when 35% of the section is visible
  });

  sections.forEach(section => {
    spyObserver.observe(section);
  });

  /* ==========================================================================
     CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formSuccess && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values for validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
      }

      // Visual feedback: disable button, show loading spinner text
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      // Mock AJAX submission
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Reset form
        contactForm.reset();

        // Slide success message down
        formSuccess.classList.add('active');
      }, 1500); // 1.5 second loading latency simulation
    });

    if (closeSuccessBtn) {
      closeSuccessBtn.addEventListener('click', () => {
        formSuccess.classList.remove('active');
      });
    }
  }
});


/* ==========================================================================
     Temparature API
     ========================================================================== */

const api = "https://api.openweathermap.org/data/2.5/weather?q=hyderabad,IN&appid=7a6135fcc4838380a6391e479c674890&units=metric";

const tempEl = document.querySelector('.temp');
const cityEl = document.querySelector('.city');

const responseWhether = async function(){
    const data = await fetch(api);
    const result = await data.json();  
    console.log(result);

    const icon = document.createElement('i');

    if (result.weather[0].main == "Clouds") {
      icon.className = 'fa-solid fa-cloud';
    } else if (result.weather[0].main === "Clear") {
      icon.className = 'fa-solid fa-sun';
    } else if (result.weather[0].main === "Rain") {
      icon.className = 'fa-solid fa-rain';
    } else if (result.weather[0].main === "Snow") {
      icon.className = 'fa-solid fa-snowflake';
    } else {
      icon.className = 'fa-solid fa-meteor';
    }

    tempEl.innerHTML = `${result.main.temp} &deg;C `;
    tempEl.appendChild(icon);
    cityEl.innerHTML = `${result.name}`;
}

responseWhether();