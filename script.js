// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const toggleThemeBtn = document.getElementById('toggle-theme');
const scrollTopBtn = document.getElementById('scrollToTop');
const resumeModal = document.getElementById('resumeModal');
const projectModal = document.getElementById('projectModal');
const closeButtons = document.querySelectorAll('.close-btn');
const projectDetailButtons = document.querySelectorAll('.project-details-btn');
const projectDetailContent = document.getElementById('project-detail-content');
const contactForm = document.getElementById('contact-form');
const resumeFrame = document.getElementById('resumeFrame');

// Theme Toggle
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
  toggleThemeBtn.textContent = '☀️';
}

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    toggleThemeBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    toggleThemeBtn.textContent = '🌙';
  }
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
    mobileMenu.querySelectorAll('.bar').forEach((bar, index) => {
      if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
      if (index === 1) bar.style.opacity = '0';
      if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
    });
  } else {
    document.body.style.overflow = 'auto';
    mobileMenu.querySelectorAll('.bar').forEach(bar => {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    });
  }
});

// Close mobile menu when clicking on a menu item
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    mobileMenu.querySelectorAll('.bar').forEach(bar => {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    });
  });
});

// Scroll to top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
  
  // Activate animations when scrolling into view
  document.querySelectorAll('.reveal-animation').forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.85) {
      element.classList.add('active');
    }
  });
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Resume Modal
function showResume() {
  resumeModal.style.display = 'block';
  // Set the source of the resume
  resumeFrame.src = 'asset/Malek_Sakir_Resume.pdf';
  document.body.style.overflow = 'hidden';
}

// Close modal
closeButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear iframe source when closing resume modal
    if (modal === resumeModal) {
      resumeFrame.src = '';
    }
  });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === resumeModal) {
    resumeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resumeFrame.src = '';
  }
  
  if (event.target === projectModal) {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Project Details Modal
projectDetailButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const currentProject = projectCards[index];
    const projectTitle = currentProject.querySelector('h3').textContent;
    const projectTags = Array.from(currentProject.querySelectorAll('.tag')).map(tag => tag.textContent);
    const projectDesc = currentProject.querySelector('p').textContent;
    const projectDetails = currentProject.querySelectorAll('.project-details li');
    
    // Create project detail content
    let projectHTML = `
      <div class="project-detail-header">
        <h3>${projectTitle}</h3>
        <div class="project-detail-tags">
          ${projectTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="project-detail-content">
        <p class="project-detail-desc">${projectDesc}</p>
        <h4>Implementation Details:</h4>
        <ul class="project-detail-list">
          ${Array.from(projectDetails).map(item => `<li>${item.textContent}</li>`).join('')}
        </ul>
        <div class="project-detail-section">
          <h4>Technical Approach:</h4>
          <p>For this project, I focused on implementing industry best practices and ensuring high performance and security standards. The solution was built with scalability in mind, allowing for future enhancements.</p>
        </div>
        <div class="project-detail-section">
          <h4>Challenges & Solutions:</h4>
          <p>One of the main challenges was ensuring proper security integration while maintaining performance. This was addressed by implementing automated security scanning and remediation in the CI/CD pipeline.</p>
        </div>
        <div class="project-detail-section">
          <h4>Results & Impact:</h4>
          <p>The implementation resulted in significant improvements in deployment time and security posture. The automated processes reduced manual intervention by 85% and enhanced overall system reliability.</p>
        </div>
      </div>
    `;
    
    projectDetailContent.innerHTML = projectHTML;
    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// Redirect to contact section
function redirectToContact() {
  const contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
}

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    // You can add form validation here if needed
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Form submission is handled by Formspree, so no need to prevent default
    // The following is just for visual feedback
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
      }, 3000);
    }, 2000);
  });
}

// Typing animation
const typedText = document.getElementById('typed-output');
const textArray = [
  'DevOps Engineer',
  'Security Specialist',
  'Cloud Architect',
  'Automation Expert'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
  const currentText = textArray[textIndex];
  
  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 1000; // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
    typingDelay = 300; // Pause before typing next word
  } else {
    typingDelay = isDeleting ? 50 : 100;
  }
  
  setTimeout(typeText, typingDelay);
}

// Initialize typing effect
setTimeout(typeText, 1000);

// Particles.js configuration
document.addEventListener('DOMContentLoaded', function() {
  if (window.particlesJS) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 50,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#2563eb"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#2563eb",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
});

// Adjust dark theme particles color
function updateParticlesColor() {
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    const isDark = document.body.classList.contains('dark-theme');
    const particleColor = isDark ? "#3b82f6" : "#2563eb";
    const lineColor = isDark ? "#3b82f6" : "#2563eb";
    
    window.pJSDom[0].pJS.particles.color.value = particleColor;
    window.pJSDom[0].pJS.particles.line_linked.color = lineColor;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
}

// Update particles color when theme changes
toggleThemeBtn.addEventListener('click', updateParticlesColor);

// Handle keyboard events for modals
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (resumeModal.style.display === 'block') {
      resumeModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      resumeFrame.src = '';
    }
    
    if (projectModal.style.display === 'block') {
      projectModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
});

// Enhance navigation experience
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Offset for fixed header
      const headerHeight = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize all animations on page load
window.addEventListener('load', () => {
  // Trigger initial scroll event to activate animations above the fold
  window.dispatchEvent(new Event('scroll'));
});

// Add sticky header effect
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    header.classList.add('sticky');
    
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
  } else {
    header.classList.remove('sticky');
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});

// Additional CSS for sticky header
const style = document.createElement('style');
style.textContent = `
  header.sticky {
    background-color: var(--background-light);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }
  
  .dark-theme header.sticky {
    background-color: var(--background-dark);
  }
`;
document.head.appendChild(style);