// Obtener todos los nodos <tr> dentro del contenedor
const nodosTR = document.querySelectorAll("#resultsContainer > tr");

// Mostrar encabezados en la consola
let csvString =
  '"MLA","SKU Meli","Stock Meli","Precio Meli","Descuento Meli","SKU CBL","Stock CBL","Precio CBL"\n';

// Iterar sobre cada nodo <tr>
nodosTR.forEach((nodoTR) => {
  // Obtener información del primer nodo <td>
  const primerNodo = nodoTR.querySelector("td:first-child");
  const mlaPrimerNodo = obtenerIdMLA(primerNodo);

  if (mlaPrimerNodo) {
    const stockPrimerNodo = obtenerDatoPorId(primerNodo, "txtStockNuevo");
    const precioPrimerNodo = obtenerDatoPorId(primerNodo, "txtPrecioNuevo");

    const skuPrimerNodo = obtenerSKUPorSelector(primerNodo, "SKU:", "Stock:");

    // Obtener información del segundo nodo <td>
    const idContieneMLA = `[id*="_MLA${mlaPrimerNodo}"]`;
    const stockSegundoNodo = obtenerDatoPorSelector(
      nodoTR,
      `span[id*="txtStockActualNuevo_"]`,
      "Stock:"
    );
    const precioSegundoNodo = obtenerDatoPorSelector(
      nodoTR,
      `span[id*="txtPrecioActualNuevo_"]`,
      "Precio:"
    );
    const skuTercerNodo = nodoTR.querySelector(
      "input[id*='txtConcepto_']"
    ).value;

    // Mostrar la información en la consola en formato CSV
    csvString += `"${mlaPrimerNodo}","${skuPrimerNodo},"${stockPrimerNodo}","${precioPrimerNodo}","${skuTercerNodo}","${stockSegundoNodo}","${precioSegundoNodo}"\n`;
  }
});

console.log(csvString);

// Función para obtener el ID MLA desde el nodo <td>
function obtenerIdMLA(tdNode) {
  const enlace = tdNode.querySelector("a");
  if (enlace) {
    const href = enlace.getAttribute("href");
    const match = href.match(/MLA-(\d+)/);
    return match ? match[1] : null;
  }
  return null;
}

// Función para obtener el valor de un elemento por su ID
function obtenerDatoPorId(tdNode, id) {
  const elemento = tdNode.querySelector(`[id^="${id}"]`);

  if (id === "txtPrecioNuevo") {
    if (elemento.style["text-decoration-line"])
      return elemento
        ? `${elemento.textContent.trim()},'Tiene descuento'`
        : null;
    return elemento
      ? `${elemento.textContent.trim()},'No tiene descuento'`
      : null;
  }

  return elemento ? `${elemento.textContent.trim()}` : null;
}

// Función para obtener el valor de un elemento por un selector que contiene el ID MLA
function obtenerDatoPorSelector(tdNode, selector, textoContenido) {
  // Selecciona el elemento dentro del nodo <td> usando el selector proporcionado
  const elemento = tdNode.querySelector(`${selector}`);

  if (elemento) {
    // Obtiene el contenido del elemento como texto y lo limpia de espacios al principio y al final
    const dato = elemento.innerText.trim();

    // Busca el textoContenido dentro del dato
    const inicioTexto = dato.indexOf(textoContenido);

    // Si encuentra el texto, extrae la parte del valor después del textoContenido
    if (inicioTexto !== -1) {
      const valorBruto = dato
        .substring(inicioTexto + textoContenido.length)
        .trim();

      // Elimina etiquetas HTML y otros caracteres no deseados
      const valorLimpio = valorBruto
        .replace(/<[^>]*>/g, "")
        .replace(/[^0-9.,]/g, "");

      return valorLimpio;
    }
  }

  return null;
}

function obtenerSKUPorSelector(tdNode, textoContenidoSku, textoContenidoSig) {
  // Selecciona el elemento dentro del nodo <td> usando el selector proporcionado
  const elemento = tdNode.querySelector("div");

  if (elemento) {
    // Obtiene el contenido del elemento como texto y lo limpia de espacios al principio y al final
    const dato = elemento.innerText.trim();

    // Busca el textoContenidoSku dentro del dato
    const inicioSku = dato.indexOf(textoContenidoSku);

    // Busca el textoContenidoSig dentro del dato
    const finSku = dato.indexOf(textoContenidoSig);

    // Si encuentra los textos, extrae la parte del valor entre ellos
    if (inicioSku !== -1 && finSku !== -1 && finSku > inicioSku) {
      const valorBruto = dato
        .substring(inicioSku + textoContenidoSku.length, finSku)
        .trim();

      // Elimina etiquetas HTML y otros caracteres no deseados
      const valorLimpio = valorBruto.replace(/<[^>]*>/g, "").trim();

      return valorLimpio;
    }
  }
}
