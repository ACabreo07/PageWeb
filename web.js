document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTIÓN DEL MENÚ MÓVIL (HAMBURGUESA)
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. GESTIÓN DE LAS TARJETAS DESPLEGABLES
    const enlacesConInfo = document.querySelectorAll('a[data-info]');

    enlacesConInfo.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            // Evitamos que el enlace intente navegar a otra página o recargue
            e.preventDefault();

            const infoExistente = this.querySelector('.info-desplegada');
            const boton = this.querySelector('.btn-interactivo');

            // Si la información ya está abierta en ESTA tarjeta, la cerramos
            if (infoExistente) {
                infoExistente.remove();
                if (boton) boton.innerText = "SABER MÁS +";
            } 
            else {
                // Paso Opcional: Cerrar cualquier otra tarjeta que esté abierta en la página
                document.querySelectorAll('.info-desplegada').forEach(el => el.remove());
                document.querySelectorAll('.btn-interactivo').forEach(btn => btn.innerText = "SABER MÁS +");

                // Extraemos el texto del atributo data-info
                const textoInformacion = this.getAttribute('data-info');

                // Creamos el contenedor de la nueva información
                const divInfo = document.createElement('div');
                divInfo.className = 'info-desplegada';
                divInfo.innerHTML = `<p>${textoInformacion}</p>`;

                // Insertamos la información al final de la tarjeta (dentro del <a>)
                this.appendChild(divInfo);

                // Cambiamos el texto del botón para feedback del usuario
                if (boton) boton.innerText = "CERRAR -";
            }
        });
    });

    // 3. CERRAR MENÚ AL HACER CLICK EN UN ENLACE (Para móviles)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});