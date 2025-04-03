const listaTareas = document.getElementById('listaTareas');
const tareaIngresada = document.getElementById('tareaIngresada');
const lista = document.getElementById('lista');
const botonBorrar = document.getElementById('eliminarLista');
const botonVerMasRapida = document.getElementById('verMasRapida');
const tareaMasRapidaElemento = document.getElementById('tareaMasRapida');

let listas = JSON.parse(localStorage.getItem('listas')) || [];

const saveToLocalStorage = () => localStorage.setItem('listas', JSON.stringify(listas));

const listaMostrar = () => {
    lista.innerHTML = '';
    listas.forEach((item, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const span = document.createElement('span');
        const eliminar = document.createElement('button');
        const tiempoCompletado = document.createElement('span'); 
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        eliminar.style.display = item.completed ? 'inline' : 'none';
        eliminar.textContent = 'Borrar';
        eliminar.classList.add('botoncito');

        span.textContent = item.text;

        if (item.completed && item.completedAt) {
            const timeSpent = ((new Date(item.completedAt) - new Date(item.createdAt)) / 1000).toFixed(2);
            tiempoCompletado.textContent = ` Completado en ${timeSpent} segundos`;
        }

        checkbox.addEventListener('change', () => {
            item.completed = checkbox.checked;
            if (checkbox.checked && !item.completedAt) {
                item.completedAt = new Date().toISOString();
            }
            eliminar.style.display = checkbox.checked ? 'inline' : 'none';
            saveToLocalStorage();
            listaMostrar();
        });

        eliminar.addEventListener('click', () => {
            listas.splice(index, 1);
            saveToLocalStorage();
            listaMostrar();
        });

        li.append(checkbox, span, eliminar, tiempoCompletado);
        lista.appendChild(li);
    });
};

listaTareas.addEventListener('submit', (event) => {
    event.preventDefault();
    const listaIngresar = tareaIngresada.value.trim();
    
    if (!listaIngresar) return;

    listas.push({ text: listaIngresar, completed: false, createdAt: new Date().toISOString() });
    saveToLocalStorage();
    listaMostrar();
    tareaIngresada.value = '';
});

botonBorrar.addEventListener('click', () => {
    listas = listas.filter(item => !item.completed);
    saveToLocalStorage();
    listaMostrar();
});

const calcularTareaMasRapida = () => {
    let tareaMasRapida = null;
    let tiempoMasRápido = Infinity;

    listas.forEach(item => {
        if (item.completedAt) {
            const tiempoDeCompletado = (new Date(item.completedAt) - new Date(item.createdAt)) / 1000;
            if (tiempoDeCompletado < tiempoMasRápido) {
                tiempoMasRápido = tiempoDeCompletado;
                tareaMasRapida = item;
            }
        }
    });

    if (tareaMasRapida) {
        tareaMasRapidaElemento.textContent = `Tarea más rápida: "${tareaMasRapida.text}" en ${tiempoMasRápido.toFixed(2)} segundos.`;
    } else {
        tareaMasRapidaElemento.textContent = 'No hay tareas completadas';
    }
};

botonVerMasRapida.addEventListener('click', calcularTareaMasRapida);

listaMostrar();