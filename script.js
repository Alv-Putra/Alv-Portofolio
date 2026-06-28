// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    pre.style.opacity = '0';
    pre.style.visibility = 'hidden';
  }, 1500);
});

// Typed.js
new Typed('#typed-name', {
  strings: ['Alvazri Zulian Saputra'],
  typeSpeed: 60,
  showCursor: false,
});
new Typed('#typed-role', {
  strings: ['Web Developer', 'NextJs Developer', 'ExpressJs Developer'],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
  startDelay: 1000,
});

// Scroll animations
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars
      const bar = e.target.querySelector('.skill-bar-fill');
      if (bar) {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      }
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// Skill bars for cards not yet triggered
document.querySelectorAll('.skill-card').forEach(card => {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target.querySelector('.skill-bar-fill');
        if (bar) setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
      }
    });
  }, { threshold: 0.3 });
  cardObserver.observe(card);
});

// Back to top
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobile() { mobileMenu.classList.remove('open'); }

// Contact form AJAX
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.reset();
      successMsg.style.display = 'block';
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      setTimeout(() => {
        successMsg.style.display = 'none';
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Failed');
    }
  } catch {
    submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error - Try Again';
    submitBtn.style.background = '#ef4444';
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  }
});

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
    a.style.background = a.getAttribute('href') === '#' + cur ? 'rgba(124,106,247,0.1)' : '';
  });
});
