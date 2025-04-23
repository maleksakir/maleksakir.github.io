// Theme toggle
const toggle = document.getElementById('toggle-theme');
const body = document.body;

// Apply saved theme
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light');
  toggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Smooth scroll is enabled via CSS 'scroll-behavior'

// Contact form handling
const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      alert('Thanks! Your message has been sent successfully.');
      form.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    alert('Sorry, there was a problem sending your message. Please try again later.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// Animate elements when they come into view
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.point-item, .experience-card, .expertise-list li').forEach(el => {
  observer.observe(el);
});

// Add hover effect to experience cards
document.querySelectorAll('.experience-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Resume Modal functionality
function showResume() {
  const modal = document.getElementById('resumeModal');
  const resumeFrame = document.getElementById('resumeFrame');
  resumeFrame.src = 'asset/Malek_Sakir_Resume.pdf';
  modal.style.display = 'block';

  // Close modal when clicking the close button
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }

  // Close modal when clicking outside
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

function redirectToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}