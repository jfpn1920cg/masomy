//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const perfilIcono = document.getElementById('perfilIcono');
const menuPerfil = document.getElementById('menuPerfil');
perfilIcono.addEventListener('click', () => {
    menuPerfil.style.display = menuPerfil.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('click', function(event) {
    if (!perfilIcono.contains(event.target) && !menuPerfil.contains(event.target)) {
        menuPerfil.style.display = 'none';
    }
});
//---------------------------------------//
//--|funcionalidad_menu_de_hamburguesa|--//
//---------------------------------------//
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('menu-visible');
}