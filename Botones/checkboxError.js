// Función para filtrar resultados
function mostrarErrores() {
  const resultsContainer = document.querySelector("#resultsContainer");
  const resultsTr = resultsContainer.querySelectorAll("tr:not(td tr)");
  // Recorrer los contenedores de tr y verificar si contienen span con style="background-color:red"
  //Variable para control de errores
  let erroresEncontrados = false;
  resultsTr.forEach((tr) => {
    const tdSpans = tr.querySelectorAll(
      'td span[style*="background-color: red"]'
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
    const mensaje = document.createElement("p");
    mensaje.classList.add("lead");
    mensaje.textContent = "No se han encontrado errores en esta página";
    resultsContainer.appendChild(mensaje);
  }
}

//--------------------
// // Crear un nuevo botón
// const botonMostrarErrores = document.createElement("button");
// botonMostrarErrores.textContent = "Mostrar errores"; // Agregar texto al botón
// botonMostrarErrores.setAttribute(
//   "title",
//   "Muestra los resultados con errores de esta página"
// );
// botonMostrarErrores.classList.add("btn", "btn-primary");

// botonMostrarErrores.addEventListener("click", () => {
//   mostrarErrores();
// });

// //Obtener contenedor de botón
// const contenedor = document.querySelector(".pull-left");
// contenedor.appendChild(botonMostrarErrores);
//-------------------

// Crear un nuevo checkbox
const checkboxMostrarErrores = document.createElement("input");
checkboxMostrarErrores.type = "checkbox";
checkboxMostrarErrores.id = "mostrarErrores";
checkboxMostrarErrores.style.transform = "scale(1.5)";
checkboxMostrarErrores.classList = "checkbox";
//checkboxMostrarErrores.classList.add("checkbox-inline");

// Crear una etiqueta (label) para el checkbox con el mismo estilo que un botón
const labelMostrarErrores = document.createElement("label");
labelMostrarErrores.textContent = "Mostrar errores";
labelMostrarErrores.setAttribute("for", "mostrarErrores");
labelMostrarErrores.title = "Muestra los resultados con errores de esta página";
labelMostrarErrores.classList = "control-label";
//labelMostrarErrores.classList.add("control-label");

// Crear un contenedor para el checkbox
const divMostrarErrores = document.createElement("div");
//divMostrarErrores.classList.add("from-group");

// Aplicar estilos CSS para espaciar y alinear los elementos
divMostrarErrores.style.display = "flex"; // Usar flexbox para alinear horizontalmente
divMostrarErrores.style.alignItems = "center"; // Alinear verticalmente al centro

labelMostrarErrores.style.marginLeft = "10px"; // Espaciado izquierdo entre el checkbox y la etiqueta

checkboxMostrarErrores.addEventListener("click", () => {
  // Alternar el estado del checkbox cuando se hace clic en la etiqueta
  //checkboxMostrarErrores.checked = !checkboxMostrarErrores.checked;
  document.getElementById("btnBuscar").click();
});

// Obtener contenedor de botón
const contenedor = document.querySelector(".pull-left");

// Agregar el checkbox y la etiqueta al contenedor

divMostrarErrores.appendChild(checkboxMostrarErrores);
divMostrarErrores.appendChild(labelMostrarErrores);
contenedor.appendChild(divMostrarErrores);

// MUTATIONOBSERVER
// Selecciona el elemento que deseas observar
const targetNode = document.getElementById("btnBuscar");

// Opciones para el observador (qué cambios observar)
const config = { attributes: true };

// Función de devolución de llamada (callback) para manejar los cambios
const callback = function (mutationsList, observer) {
  // Recorre la lista de mutaciones
  for (const mutation of mutationsList) {
    if (checkboxMostrarErrores.checked && mutation.target.disabled === false)
      mostrarErrores();
  }
};

// Crea una instancia del Mutation Observer con la función de devolución de llamada
const observer = new MutationObserver(callback);

// Inicia la observación del elemento y las opciones especificadas
observer.observe(targetNode, config);

// Para dejar de observar los cambios, puedes usar:
// observer.disconnect();
