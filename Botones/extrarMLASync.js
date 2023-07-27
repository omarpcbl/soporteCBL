// Función para extraer la información entre paréntesis
function extraerInformacionDelHref(href) {
  const regex = /\('([^']+)'\)/;
  const matches = href.match(regex);
  if (matches && matches.length === 2) {
    return matches[1];
  } else {
    return null;
  }
}

// Obtener todas las filas <tr> dentro del tbody con id "resultsContainer"
const filas = document.querySelectorAll("#resultsContainer tr");

// Crear una cadena CSV para los resultados
let csvString = "MLA\n";

// Iterar sobre cada fila y extraer el primer enlace y la información
filas.forEach((fila) => {
  const primerEnlace = fila.querySelector("td a");
  if (primerEnlace) {
    const informacionExtraida = extraerInformacionDelHref(primerEnlace.href);
    csvString += `${informacionExtraida}\n`;
  }
});

// Mostrar la cadena CSV en la consola
console.log(csvString);
