// Función para simular el clic en cada botón de manera secuencial
// Presiona un botón por MLA
function clickearBotonesSecuencialmente() {
  const botonesEjecutarSync = document.querySelectorAll(
    ".btn.btn-xs.btn-success.btnEjecutarSync"
  );

  // se usa un tiempo estimado. No modifica la funcionalidad del botón y por eso no se trabaja con la respuesta de la request
  const tiempoEntreClics = 800; // Tiempo en milisegundos entre cada clic (1 segundo en este ejemplo)
  const arrayMla = [];
  const botonesEjecutarSyncFiltrados = [];

  botonesEjecutarSync.forEach((boton) => {
    const arrayMlaExtraido = boton.id.match(/_(.*?)_/);

    if (!arrayMla.includes(arrayMlaExtraido[1])) {
      arrayMla.push(arrayMlaExtraido[1]);
      botonesEjecutarSyncFiltrados.push(boton);
    }
  });

  // Iterar sobre los botones y simular el clic en cada uno de ellos en secuencia

  botonesEjecutarSyncFiltrados.forEach((boton, index) => {
    const setTimer = new Promise((resolve) => {
      setTimeout(() => {
        boton.click();
        //console.log(`Botón ${index + 1} clickeado.`);
        console.log(`Botón ${boton.id} clickeado`);
        resolve();
      }, index * tiempoEntreClics);
    });

    setTimer.then((data) => {
      //Mensaje de finalizado
      if (index === botonesEjecutarSyncFiltrados.length - 1) {
        alert("Finalizado");
      }
    });
  });
}

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
