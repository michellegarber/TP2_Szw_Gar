var ListaTareas = [];

const tareaInput = document.getElementById("tarea");
const lista = document.getElementById('tareaElemento')
const listaTareasElement = document.getElementById("listaTareas");
const formularioTareas = document.getElementById('formularioTareas');  
const butonEnviar = document.getElementById('agregar')

formularioTareas.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const input = tareaInput.value;

    const agregarLI = document.createElement('li');
    agregarLI.innerHTML = input;
    
    lista.appendChild(agregarLI);
    
    console.log(input); 
    tareaInput.value = '';  
});



function ActualizarListaTareas() {
    listaTareasElement.innerHTML = "";

    for (let i = 0; i < ListaTareas.length; i++) {
        let tareaElemento = document.createElement("li");
        tareaElemento.textContent = ListaTareas[i];
        listaTareasElement.appendChild(tareaElemento);
    }
}
