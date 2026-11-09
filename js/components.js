// js/components.js

function renderHeader(currentPage) {
  const header = document.querySelector('.cabecera');
  if (!header) return;
  
  const menuItems = [
    { href: 'index.html', text: 'Inicio' },
    { href: 'indexDias.html', text: 'Por días' },
    { href: 'indexTramos.html', text: 'Por tramos' },
    { href: 'indexCompleto.html', text: 'Camino completo' }
  ];

  // Genera los elementos de la lista, marcando el activo
  const listItems = menuItems.map(item => {
    const isActive = item.href === currentPage ? 'active' : '';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `<li><a href="${item.href}" class="${isActive}"${ariaCurrent}>${item.text}</a></li>`;
  }).join('');

  header.innerHTML = `
    <div class="logo">
      <a href="index.html" aria-label="Volver a la página de inicio">
        <img class="logoCamino" src="img/logoNC.png" alt="Logo de Nuestro Camino" />
      </a>
    </div>

    <nav class="menuppal" aria-label="Navegación principal">
      <!-- BOTÓN HAMBURGUESA -->
      <button id="menu-toggle" class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="main-menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
      
      <!-- MENÚ DESPLEGABLE -->
      <ul id="main-menu">
        ${listItems}
      </ul>
    </nav>
    
    <div class="logo2">
        <img src="img/logo2.png" alt="Logo del Xacobeo" />
    </div>
  `;

  // Añadir funcionalidad al menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');

  if (menuToggle && mainMenu) {
    function toggleMenu() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('is-active');
      mainMenu.classList.toggle('is-active');
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar al pulsar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainMenu.classList.contains('is-active')) {
        toggleMenu();
        menuToggle.focus();
      }
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (mainMenu.classList.contains('is-active') && !mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu();
      }
    });
  }
}

// Registro centralizado del Service Worker para todas las páginas
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then(() => console.log('Service Worker registrado correctamente'))
        .catch((err) => console.error('Error al registrar Service Worker:', err));
    });
  }
}

registerServiceWorker();
