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
//--------------------------------------------//
//--|funcionalidad_crear_menu_de_navegacion|--//
//--------------------------------------------//
function guardarEliminado(nombre) {
    let eliminados = localStorage.getItem('menusEliminados');
    eliminados = eliminados ? JSON.parse(eliminados) : [];
    eliminados.push(nombre);
    localStorage.setItem('menusEliminados', JSON.stringify(eliminados));
}
document.addEventListener('DOMContentLoaded', function () {
    const botonAgregar = document.querySelector('.btn-agregar2');
    const cuerpoTabla = document.querySelector('tbody');
    let contador = 1;
    function guardarMenusEnLocalStorage(menus) {
        localStorage.setItem('menusNavegacion', JSON.stringify(menus));
    }
    function obtenerMenusDeLocalStorage() {
        const datos = localStorage.getItem('menusNavegacion');
        return datos ? JSON.parse(datos) : [];
    }
    let menusPrevios = obtenerMenusDeLocalStorage();
    menusPrevios.forEach(nombre => {
        const fila = document.createElement('tr');
        const celdaNumero = document.createElement('td');
        celdaNumero.classList.add('numero');
        celdaNumero.textContent = contador;
        const celdaNombre = document.createElement('td');
        celdaNombre.classList.add('nombre');
        celdaNombre.textContent = nombre;
        const celdaAprobar = document.createElement('td');
        celdaAprobar.innerHTML = `<button class="btn-aprobar" title="Aprobar">✅</button>`;
        celdaAprobar.querySelector("button").onclick = function () {
            alert(`Menú "${nombre}" aprobado`);
        };
        const celdaBorrar = document.createElement('td');
        celdaBorrar.innerHTML = `<button class="btn-borrar" title="Borrar">🗑️</button>`;
        celdaBorrar.querySelector("button").onclick = function () {
            guardarEliminado(nombre);
            cuerpoTabla.removeChild(fila);
            let menusActualizados = obtenerMenusDeLocalStorage().filter(m => m !== nombre);
            guardarMenusEnLocalStorage(menusActualizados);
        };
        fila.appendChild(celdaNumero);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaAprobar);
        fila.appendChild(celdaBorrar);
        cuerpoTabla.appendChild(fila);
        contador++;
    });
    botonAgregar.addEventListener('click', function () {
        const fila = document.createElement('tr');
        const celdaNumero = document.createElement('td');
        celdaNumero.classList.add('numero');
        celdaNumero.textContent = contador;
        const celdaNombre = document.createElement('td');
        celdaNombre.classList.add('nombre');
        celdaNombre.innerHTML = `
            <div style="display: flex; align-items: center; gap: 5px;">
                <input type="text" placeholder="Nombre del menú" style="flex: 1; padding: 4px; border-radius: 4px; border: none;">
                <button class="btn-guardar" title="Guardar">💾</button>
            </div>
        `;
        const celdaAprobar = document.createElement('td');
        const celdaBorrar = document.createElement('td');
        fila.appendChild(celdaNumero);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaAprobar);
        fila.appendChild(celdaBorrar);
        cuerpoTabla.appendChild(fila);
        const btnGuardar = celdaNombre.querySelector('.btn-guardar');
        btnGuardar.addEventListener('click', () => {
            const input = celdaNombre.querySelector('input');
            const valor = input.value.trim();
            if (valor !== '') {
                celdaNombre.textContent = valor;
                let menusGuardados = obtenerMenusDeLocalStorage();
                menusGuardados.push(valor);
                guardarMenusEnLocalStorage(menusGuardados);
                celdaAprobar.innerHTML = `<button class="btn-aprobar" title="Aprobar">✅</button>`;
                celdaAprobar.querySelector("button").onclick = function () {
                    alert(`Menú "${valor}" aprobado`);
                };
                celdaBorrar.innerHTML = `<button class="btn-borrar" title="Borrar">🗑️</button>`;
                celdaBorrar.querySelector("button").onclick = function () {
                    guardarEliminado(valor);
                    cuerpoTabla.removeChild(fila);
                    let menusActualizados = obtenerMenusDeLocalStorage().filter(m => m !== valor);
                    guardarMenusEnLocalStorage(menusActualizados);
                };
                contador++;
            } else {
                alert('Por favor escribe un nombre válido.');
            }
        });
    });
});
//------------------------------------//
//--|funcionalidad_creando_opciones|--//
//------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
    const btnIcono = document.querySelector('.btn-icono3');
    const inputIcono = document.querySelector('.input-icono');
    const previewIcono = document.getElementById('preview-icono');
    btnIcono.addEventListener('click', () => {
        inputIcono.click();
    });
    inputIcono.addEventListener('change', () => {
        const file = inputIcono.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = e => {
                previewIcono.src = e.target.result;
                previewIcono.style.display = 'block';
                btnIcono.innerHTML = '';
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '30px';
                btnIcono.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else {
            previewIcono.src = '';
            previewIcono.style.display = 'none';
        }
    });
    const btnGuardar = document.querySelector('.btn-guardar-opciones');
    btnGuardar.addEventListener('click', () => {
        const nombreEmpresa = document.querySelector('.input-nombre-empresa2').value.trim();
        const icono = previewIcono.src || '';
        const opciones = Array.from(document.querySelectorAll('.input-opcion2'))
            .map(input => input.value.trim())
            .filter(val => val !== '');
        const enlaces = Array.from(document.querySelectorAll('.input-enlace'))
            .map(input => input.value.trim())
            .filter(val => val !== '');
        const datosGuardados = {
            icono,
            nombreEmpresa,
            opciones,
            enlaces
        };
        console.log(datosGuardados);
        localStorage.setItem('menuNavegacion', JSON.stringify(datosGuardados));
        alert('Opciones guardadas correctamente.');
    });
});
//-------------------------------------------------//
//--|funcionalidad_menu_de_navegacion_eliminados|--//
//-------------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const cuerpoTabla = document.getElementById('cuerpoTablaEliminados'); // ID del <tbody>
    function obtenerEliminados() {
        const datos = localStorage.getItem('menusEliminados');
        return datos ? JSON.parse(datos) : [];
    }
    function guardarEliminados(lista) {
        localStorage.setItem('menusEliminados', JSON.stringify(lista));
    }
    function restablecerMenu(nombre) {
        let menusActivos = localStorage.getItem('menusNavegacion');
        menusActivos = menusActivos ? JSON.parse(menusActivos) : [];
        if (!menusActivos.includes(nombre)) {
            menusActivos.push(nombre);
            localStorage.setItem('menusNavegacion', JSON.stringify(menusActivos));
        }
        let eliminados = obtenerEliminados();
        eliminados = eliminados.filter(m => m !== nombre);
        guardarEliminados(eliminados);
        location.reload();
    }
    function eliminarDefinitivo(nombre) {
        let eliminados = obtenerEliminados();
        eliminados = eliminados.filter(m => m !== nombre);
        guardarEliminados(eliminados);
        location.reload();
    }
    const menus = obtenerEliminados();
    menus.forEach((nombre, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${nombre}</td>
            <td><button class="icono-btn btn-restablecer" title="Restablecer">🔄</button></td>
            <td><button class="icono-btn btn-eliminar" title="Eliminar">❌</button></td>
        `;
        tr.querySelector('.btn-restablecer').onclick = () => restablecerMenu(nombre);
        tr.querySelector('.btn-eliminar').onclick = () => eliminarDefinitivo(nombre);
        cuerpoTabla.appendChild(tr);
    });
});
//------------------------------------//
//--|funcionalidad_opciones_submenu|--//
//------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.btn-toggle-submenu9');
    toggleButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            const currentRow = btn.closest('tr');
            const submenuRow = currentRow.nextElementSibling;
            if (submenuRow && submenuRow.classList.contains('fila-submenu9')) {
                submenuRow.style.display = submenuRow.style.display === 'table-row' ? 'none' : 'table-row';
            }
        });
    });
});
//-------------------------------------------------//
//--|funcionalidad_despliegue_menu_de_navegacion|--//
//-------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = localStorage.getItem('menuNavegacion');
    const tbody = document.getElementById('contenido-menu');
    const tabla = document.querySelector('.menu-navegacion');
    if (!datosGuardados) {
        console.warn('No se encontraron datos guardados en localStorage.');
        return;
    }
    const datos = JSON.parse(datosGuardados);
    tbody.innerHTML = '';
    const fila = document.createElement('tr');
    const tdIcono = document.createElement('td');
    if (datos.icono) {
        const img = document.createElement('img');
        img.src = datos.icono;
        img.style.maxWidth = '30px';
        img.alt = 'Icono';
        tdIcono.appendChild(img);
    } else {
        const spanIcono = document.createElement('span');
        spanIcono.classList.add('icono');
        spanIcono.textContent = '+';
        tdIcono.appendChild(spanIcono);
    }
    fila.appendChild(tdIcono);
    const tdNombre = document.createElement('td');
    const spanNombre = document.createElement('span');
    spanNombre.classList.add('nombre-empresa');
    spanNombre.textContent = datos.nombreEmpresa;
    tdNombre.appendChild(spanNombre);
    fila.appendChild(tdNombre);
    const tdOpciones = document.createElement('td');
    datos.opciones.forEach((opcion, i) => {
        const btn = document.createElement('button');
        btn.classList.add('btn-opcion');
        btn.textContent = opcion;
        btn.addEventListener('click', () => {
            if (datos.enlaces[i]) {
                window.open(datos.enlaces[i], '_blank');
            } else {
                alert('No se encontró un enlace válido para esta opción.');
            }
        });
        tdOpciones.appendChild(btn);
    });
    fila.appendChild(tdOpciones);
    tbody.appendChild(fila);
    const btnEliminar = document.querySelector('.eliminarmenudespegable');
    if (btnEliminar) {
        btnEliminar.addEventListener('click', () => {
            if (confirm('¿Deseas eliminar el contenido del menú de navegación?')) {
                localStorage.removeItem('menuNavegacion');
                tbody.innerHTML = '';
            }
        });
    }
});