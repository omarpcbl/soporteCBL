// Función para simular el clic en cada botón de manera secuencial
function clickearBotonesSecuencialmente() {
  const botonesEjecutarSync = document.querySelectorAll(
    ".btn.btn-xs.btn-success.btnEjecutarSync"
  );
  const tiempoEntreClics = 800; // Tiempo en milisegundos entre cada clic (1 segundo en este ejemplo)
  // Iterar sobre los botones y simular el clic en cada uno de ellos en secuencia
  botonesEjecutarSync.forEach((boton, index) => {
    // Para funcionar con el filtro de errores
    if (boton.style.display !== "none") {
      setTimeout(() => {
        boton.click();
        //console.log(`Botón ${index + 1} clickeado.`);
        console.log(`Botón ${boton.id} clickeado`);

        //Mensaje de finalizado
        if (index === botonesEjecutarSync.length - 1) {
          alert("Finalizado");
        }
      }, index * tiempoEntreClics);
    }
  });
}

// Llamada a la función para clickear los botones secuencialmente

// Crear un nuevo botón
const nuevoBoton = document.createElement("button");
nuevoBoton.textContent = "Sincronizar ahora esta página"; // Agregar texto al botón

// Agregar una clase al botón (opcional)
nuevoBoton.classList.add("btn", "btn-primary");

// Agregar un event listener al botón (opcional)
nuevoBoton.addEventListener("click", () => {
  clickearBotonesSecuencialmente();
});

// Obtener el contenedor donde se agregará el botón
const contenedor = document.querySelector(".pull-left");

// Agregar el botón al contenedor en el DOM
contenedor.appendChild(nuevoBoton);
