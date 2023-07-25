// Creando nuevos inputs y botón para ingresar y actualizar monto y porcentaje
const nuevoPrecioSpan = document.createElement("span")
const nuevoPrecio = document.createElement("input");
const nuevoPorcentajeSpan = document.createElement("span")
const nuevoPorcentaje = document.createElement("input")
const nuevoBotonAplicar = document.createElement("button");

// Estilizando los elementos
nuevoPrecioSpan.setAttribute(
  "style",
  "font-weight: bold; float: left; margin-right: 5px; margin-top: 5px"
);
nuevoPorcentajeSpan.setAttribute(
  "style",
  "font-weight: bold; float: left; margin-right: 5px; margin-top: 5px"
);
nuevoPrecioSpan.textContent = "$"
nuevoPorcentajeSpan.textContent= "%"

nuevoPrecio.setAttribute(
  "style",
  "max-width: 60px; margin-top: 5px; margin-right: 5px"
);
nuevoPorcentaje.setAttribute(
  "style",
  "max-width: 60px; margin-top: 5px; margin-right: 5px"
);
nuevoPrecio.classList.add("allTxtNuevoPrecio","form-control","input-xs","numeric");
nuevoPorcentaje.classList.add("allTxtNuevoPorcentaje", "form-control", "input-xs", "numeric")

nuevoBotonAplicar.textContent = "Aplicar porcentaje y monto"; // Agregar texto al botón
nuevoBotonAplicar.classList.add("btn", "btn-primary");

// Función para manejar el evento clic del botón "Actualizar"
function actualizarValores() {
  // Obtener el valor del input
  const valorInputPrecio = document.querySelector(".allTxtNuevoPrecio").value;
  const valorInputPorcentaje = document.querySelector(".allTxtNuevoPorcentaje").value;
    
  // Actualizar el grupo de inputs con el valor del input
    const grupoInputsPrecio = document.querySelectorAll(".txtNuevoPrecio");
    const grupoInputsPorcentaje = document.querySelectorAll(
      ".txtNuevoPorcentajePrecio"
    );
  grupoInputsPrecio.forEach(input => {
    input.value = valorInputPrecio;
  });
    grupoInputsPorcentaje.forEach(input => {
       input.value = valorInputPorcentaje
    }) 
    

  // Simular el clic en el grupo de botones secuencialmente
  const grupoBotones = document.querySelectorAll(".btnGuardarPublicacion");
  grupoBotones.forEach((boton, index) => {
    setTimeout(() => {
      boton.click();
    }, 800 * index); // Clickear cada botón con un retraso de 0.800 segundo (800 ms)
  });
}

// Agregar el evento clic al botón "Actualizar"
nuevoBotonAplicar.addEventListener("click", actualizarValores);

// Obtener el contenedor donde se agregará el botón
const contenedor = document.querySelector(".pull-left");

// Agregar el botón al contenedor en el DOM
contenedor.appendChild(nuevoBotonAplicar);
contenedor.appendChild(nuevoPrecioSpan);
contenedor.appendChild(nuevoPrecio)
contenedor.appendChild(nuevoPorcentajeSpan);
contenedor.appendChild(nuevoPorcentaje)
