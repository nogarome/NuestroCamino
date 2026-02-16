// js/components.js

function renderHeader(currentPage) {
  const header = document.querySelector('.cabecera');
  
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
      <a href="index.html">
        <img class="logoCamino" src="img/logoNC.png" alt="Logo de Nuestro Camino, volver al inicio" />
      </a>
    </div>

    <nav class="menuppal">
      <!-- BOTÓN HAMBURGUESA -->
      <button id="menu-toggle" class="menu-toggle" aria-label="Abrir menú">
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
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      mainMenu.classList.toggle('is-active');
    });
  }
}