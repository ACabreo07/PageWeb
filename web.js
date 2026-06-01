document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== 1. GESTIÓN DEL MENÚ MÓVIL ====================
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ==================== 2. TARJETAS DESPLEGABLES ====================
    const enlacesConInfo = document.querySelectorAll('a[data-info]');

    enlacesConInfo.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const infoExistente = this.querySelector('.info-desplegada');
            const boton = this.querySelector('.btn-interactivo');

            if (infoExistente) {
                infoExistente.remove();
                if (boton) boton.innerText = "SABER MÁS +";
            } 
            else {
                document.querySelectorAll('.info-desplegada').forEach(el => el.remove());
                document.querySelectorAll('.btn-interactivo').forEach(btn => btn.innerText = "SABER MÁS +");

                const textoInformacion = this.getAttribute('data-info');
                const divInfo = document.createElement('div');
                divInfo.className = 'info-desplegada';
                divInfo.innerHTML = `<p>${textoInformacion}</p>`;

                this.appendChild(divInfo);
                if (boton) boton.innerText = "CERRAR -";
            }
        });
    });

    // ==================== 3. SISTEMA DE LOGIN / LOGOUT ====================
    const authBtn = document.getElementById('authBtn');
    const userStatus = document.getElementById('userStatus');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    function actualizarEstadoAutenticacion() {
        const usuarioGuardado = localStorage.getItem('orcaUser');
        if (usuarioGuardado) {
            authBtn.innerText = "Cerrar Sesión";
            userStatus.innerText = `Hola, ${usuarioGuardado}`;
        } else {
            authBtn.innerText = "Iniciar Sesión";
            userStatus.innerText = "";
        }
    }

    authBtn.addEventListener('click', () => {
        const usuarioGuardado = localStorage.getItem('orcaUser');
        if (usuarioGuardado) {
            localStorage.removeItem('orcaUser');
            actualizarEstadoAutenticacion();
        } else {
            loginModal.style.display = 'flex';
            loginError.innerText = "";
        }
    });

    closeModal.addEventListener('click', () => { loginModal.style.display = 'none'; });
    window.addEventListener('click', (e) => { if (e.target === loginModal) loginModal.style.display = 'none'; });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInp = document.getElementById('username').value.trim();
        const passInp = document.getElementById('password').value;

        if (userInp.toLowerCase() === 'admin' && passInp === '1234') {
            localStorage.setItem('orcaUser', userInp);
            actualizarEstadoAutenticacion();
            loginForm.reset();
            loginModal.style.display = 'none';
        } else {
            loginError.innerText = "Usuario o contraseña incorrectos (Prueba: admin / 1234).";
        }
    });

    actualizarEstadoAutenticacion();

    // ==================== 4. FORMULARIO DE CONTACTO ====================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('contactName').value;
            formFeedback.innerText = `¡Gracias ${nombre}! Tu reporte ha sido enviado con éxito de forma dinámica.`;
            contactForm.reset();
            setTimeout(() => { formFeedback.innerText = ""; }, 5000);
        });
    }
});