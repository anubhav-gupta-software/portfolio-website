// ===== Typing Animation =====
const commands = [
  'cat intro.txt',
  'whoami',
  'ls skills/'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeCommand() {
  const cmdEl = document.getElementById('typed-cmd');
  const cursorEl = document.getElementById('cursor');
  const currentCmd = commands[commandIndex];

  if (!cmdEl) return;

  if (isDeleting) {
    cmdEl.textContent = currentCmd.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    cmdEl.textContent = currentCmd.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = charIndex === currentCmd.length ? 2000 : 80;
  }

  if (!isDeleting && charIndex === currentCmd.length) {
    isDeleting = true;
    typingSpeed = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    commandIndex = (commandIndex + 1) % commands.length;
    typingSpeed = 500;
  }

  setTimeout(typeCommand, typingSpeed);
}

// Start typing after a short delay
setTimeout(typeCommand, 1000);

// ===== Matrix Rain Background =====
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initMatrix();
  }

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンｱｲｳｴｵｶｷｸｹｺ';
  const fontSize = 14;
  let columns = 0;
  let drops = [];

  function initMatrix() {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  function drawMatrix() {
    if (!ctx) return;

    ctx.fillStyle = 'rgba(10, 14, 20, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#39c5cf';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = `rgba(57, 197, 207, ${Math.random() * 0.5 + 0.3})`;
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  setInterval(drawMatrix, 50);
}

// ===== Scroll-triggered animations =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (navLinks && window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    }
  });
});
