// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 60, 114, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe benefit cards and process steps
document.querySelectorAll('.benefit-card, .process-step, .case-card, .kit-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========== MENÚ MÓVIL ==========

// Función para abrir/cerrar menú móvil
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Función para cerrar menú móvil al hacer clic en un enlace
function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (navLinks && menuBtn && nav) {
        if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Cerrar menú al cambiar tamaño de pantalla
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navLinks = document.getElementById('navLinks');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && menuBtn) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Prevenir que los clics dentro del menú lo cierren
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.addEventListener('click', function(event) {
            // Solo cerrar si se hace clic en un enlace, no en el contenedor
            if (event.target.tagName === 'A') {
                closeMobileMenu();
            }
        });
    }
});

// ========== EFECTOS ADICIONALES ==========

// Efecto parallax suave en el hero
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroContent.style.transform = 'translateY(' + rate + 'px)';
    }
});

// Contador animado para números (opcional - para futuras mejoras)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Detectar cuando el usuario está cerca del final de la página
window.addEventListener('scroll', function() {
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= pageHeight - 100) {
        // El usuario está cerca del final - podrías mostrar un CTA adicional aquí
        console.log('Usuario cerca del final de la página');
    }
});

// Mejorar accesibilidad: permitir cerrar menú con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Log para debug (puedes removerlo en producción)
console.log('✅ Sun Tech - Scripts cargados correctamente');
console.log('📱 Funciones del menú móvil: OK');
console.log('🎨 Animaciones: OK');
console.log('📜 Smooth scroll: OK');