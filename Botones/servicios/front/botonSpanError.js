// Función para filtrar resultados
function mostrarErrores() {
   const resultsContainer = document.querySelector("#resultsContainer");
   const resultsTr = resultsContainer.querySelectorAll("tr:not(td tr)");
  // Recorrer los contenedores de tr y verificar si contienen span con style="background-color:red"
    //Variable para control de errores
    let erroresEncontrados = false  
  resultsTr.forEach((tr) => {
    const tdSpans = tr.querySelectorAll(
      'td span[style*="background-color:red"]'
    );
    if (tdSpans.length > 0) {
        tr.style.display = "block";
        erroresEncontrados = true;
    } else {
        tr.style.display = "none"; // Ocultar los contenedores nivel 2 que no cumplan la condición
    }
  });
    
      // Mostrar mensaje "No se han encontrado errores en esta página" si no hay errores
    if (!erroresEncontrados) {
        const mensaje = document.createElement('p');
        mensaje.classList.add("lead")
        mensaje.textContent = 'No se han encontrado errores en esta página';
        resultsContainer.appendChild(mensaje);
    } 
    

}

// Crear un nuevo botón
const botonMostrarErrores = document.createElement("button");
botonMostrarErrores.textContent = "Mostrar errores"; // Agregar texto al botón
botonMostrarErrores.setAttribute("title","Muestra los resultados con errores de esta página")
botonMostrarErrores.classList.add("btn", "btn-primary");

botonMostrarErrores.addEventListener('click', () => {
    mostrarErrores()
})

//Obtener contenedor de botón
const contenedor = document.querySelector(".pull-left");
contenedor.appendChild(botonMostrarErrores)
