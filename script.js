// ===== CONFIGURACIÓN INICIAL =====
// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portafolio de Mauricio Rozo cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initContactForm();
    initScrollEffects();
    initProjectButtons();
});

// ===== NAVEGACIÓN RESPONSIVE =====
function initNavigation() {
    // Obtener elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para alternar el menú móvil
    function toggleMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    // Obtener el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Event listener para el envío del formulario
        contactForm.addEventListener('submit', function(e) {
            // Prevenir el comportamiento por defecto del formulario
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(contactForm);
            const mensaje = formData.get('mensaje');
            
            // Validar que el mensaje no esté vacío
            if (mensaje.trim() === '') {
                showNotification('Por favor, escribe un mensaje antes de enviar.', 'error');
                return;
            }
            
            // Simular envío del formulario
            showNotification('Enviando mensaje...', 'info');
            
            // Simular delay de envío
            setTimeout(() => {
                // Mostrar mensaje de éxito en consola
                console.log('Formulario enviado correctamente');
                
                // Mostrar notificación de éxito
                showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                
                // Limpiar el formulario
                contactForm.reset();
                
                // Restaurar valores por defecto
                document.getElementById('nombre').value = 'Mauricio Rozo';
                document.getElementById('email').value = 'mrosso981@gmail.com';
                document.getElementById('profesion').value = 'Tecnólogo Electromecánico';
                
            }, 1500);
        });
    }
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    // Función para mostrar elementos cuando entran en el viewport
    function handleScroll() {
        const elements = document.querySelectorAll('.experiencia-card, .habilidad-card, .proyecto-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Aplicar estilos iniciales a las tarjetas
    const cards = document.querySelectorAll('.experiencia-card, .habilidad-card, .proyecto-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Ejecutar una vez al cargar la página
    handleScroll();
}

// ===== BOTONES DE PROYECTOS =====
function initProjectButtons() {
    // Obtener todos los botones de proyectos
    const projectButtons = document.querySelectorAll('.proyecto-btn');
    
    projectButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Obtener el título del proyecto
            const projectTitle = this.closest('.proyecto-card').querySelector('h3').textContent;
            
            // Mostrar información del proyecto
            showProjectDetails(projectTitle, index);
        });
    });
}

// ===== FUNCIONES AUXILIARES =====

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Colores según el tipo
    const colors = {
        success: 'linear-gradient(135deg, #4CAF50, #45a049)',
        error: 'linear-gradient(135deg, #f44336, #da190b)',
        info: 'linear-gradient(135deg, #4D7085, #3a5a6b)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Función para mostrar detalles del proyecto
function showProjectDetails(projectTitle, projectIndex) {
    // Información detallada de cada proyecto
    const projectDetails = {
        0: {
            title: 'Sistema de Seguridad de Energías Peligrosas',
            company: 'Mac Pollo',
            description: 'Implementación completa de sistema de seguridad para el mantenimiento industrial, incluyendo protocolos de bloqueo/etiquetado (LOTO), capacitación del personal y documentación de procedimientos de seguridad.',
            technologies: ['Sistemas de Seguridad', 'Protocolos LOTO', 'Capacitación Industrial'],
            duration: '6 meses',
            impact: 'Reducción del 100% en accidentes relacionados con energías peligrosas'
        },
        1: {
            title: 'Planes de Mejora en Mantenimiento',
            company: 'Talma',
            description: 'Desarrollo e implementación de planes de mejora continua en procesos de mantenimiento, optimizando la eficiencia operacional y reduciendo significativamente los tiempos de inactividad.',
            technologies: ['Lean Manufacturing', 'Mantenimiento Predictivo', 'Análisis de Datos'],
            duration: '8 meses',
            impact: 'Mejora del 35% en eficiencia operacional'
        },
        2: {
            title: 'Inteligencia Artificial en Mantenimiento',
            company: 'Talentotech',
            description: 'Implementación de soluciones de IA para predicción de fallas y optimización de procesos de mantenimiento preventivo en sistemas electromecánicos complejos.',
            technologies: ['Machine Learning', 'IoT', 'Análisis Predictivo', 'Python'],
            duration: '12 meses',
            impact: 'Reducción del 40% en fallas no planificadas'
        }
    };
    
    const project = projectDetails[projectIndex];
    
    // Crear modal con detalles del proyecto
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${project.title}</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="project-info">
                    <p><strong>Empresa:</strong> ${project.company}</p>
                    <p><strong>Duración:</strong> ${project.duration}</p>
                    <p><strong>Impacto:</strong> ${project.impact}</p>
                </div>
                <div class="project-description">
                    <h3>Descripción del Proyecto</h3>
                    <p>${project.description}</p>
                </div>
                <div class="project-technologies">
                    <h3>Tecnologías Utilizadas</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Estilos del contenido del modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: #525557;
        padding: 2rem;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        border: 2px solid #4D7085;
    `;
    
    // Estilos del header del modal
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #4D7085;
    `;
    
    modalHeader.querySelector('h2').style.cssText = `
        color: #f97316;
        margin: 0;
        font-size: 1.5rem;
    `;
    
    // Estilos del botón de cerrar
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 2rem;
        color: #EDF5FA;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Estilos del cuerpo del modal
    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.cssText = `
        color: #EDF5FA;
    `;
    
    // Estilos de la información del proyecto
    const projectInfo = modal.querySelector('.project-info');
    projectInfo.style.cssText = `
        background: rgba(77, 112, 133, 0.1);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    `;
    
    projectInfo.querySelectorAll('p').forEach(p => {
        p.style.cssText = `
            margin: 0.5rem 0;
            color: #EDF5FA;
        `;
    });
    
    // Estilos de la descripción
    const description = modal.querySelector('.project-description');
    description.style.cssText = `
        margin-bottom: 1.5rem;
    `;
    
    description.querySelector('h3').style.cssText = `
        color: #f97316;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    `;
    
    // Estilos de las tecnologías
    const technologies = modal.querySelector('.project-technologies');
    technologies.style.cssText = `
        margin-bottom: 1rem;
    `;
    
    technologies.querySelector('h3').style.cssText = `
        color: #f97316;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    `;
    
    const techTags = modal.querySelector('.tech-tags');
    techTags.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    `;
    
    const techTagElements = modal.querySelectorAll('.tech-tag');
    techTagElements.forEach(tag => {
        tag.style.cssText = `
            background: linear-gradient(135deg, #4D7085, #f97316);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: 500;
        `;
    });
    
    // Agregar al DOM
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
    
    // Event listeners para cerrar el modal
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    });
    
    // Cerrar con tecla Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
}

// ===== EFECTOS ADICIONALES =====

// Función para agregar efecto de parallax suave al scroll (DESHABILITADO)
function initParallaxEffect() {
    // Efecto parallax deshabilitado para evitar problemas de superposición
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const parallaxElements = document.querySelectorAll('.hero');
    //     
    //     parallaxElements.forEach(element => {
    //         const speed = 0.5;
    //         element.style.transform = `translateY(${scrolled * speed}px)`;
    //     });
    // });
}

// Función para agregar efecto de typing en el título
function initTypingEffect() {
    const title = document.querySelector('.hero-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar efecto después de un pequeño delay
        setTimeout(typeWriter, 1000);
    }
}

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    // initTypingEffect(); // Descomentar si se desea el efecto de typing
});

// ===== FUNCIONES DE UTILIDAD =====

// Función para hacer scroll suave a una sección
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para formatear texto
function formatText(text, maxLength = 100) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

// ===== CONSOLA DE DESARROLLO =====
// Mensaje de bienvenida en la consola
console.log('%c🚀 Portafolio de Mauricio Rozo', 'color: #f97316; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado con HTML5, CSS3 y JavaScript vanilla', 'color: #4D7085; font-size: 14px;');
console.log('%cTecnólogo en Operación y Mantenimiento Electromecánico', 'color: #EDF5FA; font-size: 12px;');
