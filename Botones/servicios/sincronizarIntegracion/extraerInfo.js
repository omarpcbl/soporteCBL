// Script corregido para la consola
let pageSize = 200;

async function array() {
  const items = [];
  let totalPage = 1; // Empezamos en 1
  
  console.log("Iniciando extracción...");

  for (let i = 1; i <= totalPage; i++) {
    const response = await filtrar(false, i);
    
    if (response && response.array) {
      if (i === 1) {
        // Calculamos el total de páginas real basado en la primera respuesta
        totalPage = Math.ceil(response.TotalItems / pageSize);
        console.log(`Total de ítems: ${response.TotalItems}. Páginas a procesar: ${totalPage}`);
      }
      
      items.push(...response.array);
      console.log(`Página ${i} procesada. Ítems acumulados: ${items.length}`);
    }
  }

  console.log("Resultado final:", items);
  // Opcional: copiar al portapapeles automáticamente
  // copy(JSON.stringify(items)); 
}

const filtrar = async function (dif, page) {
  if ($("#ddlCuenta").val() === "") {
    console.error("No hay cuenta seleccionada");
    return null;
  }

  // Obtenemos el valor de multiDeposito que falta
  let multideposito = $("#warningMultideposito").data('active') || false;
  var scrollId = $("#hdnMLScrollId").val() || "";

  // Construcción del objeto info respetando el nuevo parámetro
  var info = JSON.stringify({
    idIntegracion: $("#ddlCuenta").val(),
    titulo: $("#txtTitulo").val(),
    estado: $("#ddlEstado").val(),
    estadostock: $("#ddlEstadoStock").val(),
    estadosincronizacion: $("#ddlSinc").val(),
    estadoSku: $("#ddlEstadoSku").val(),
    tipoPublicacion: $("#ddlTipoPub").val(),
    tipoShipping: $("#ddlTipoShipping").val(),
    freeShipping: $("#ddlFreeShipping").val(),
    verDif: dif,
    page: page,
    pageSize: pageSize,
    multiDeposito: multideposito, // <--- EL PARÁMETRO QUE FALTABA
    scrollId: scrollId
  });

  const objectResponse = { array: [], TotalItems: 0 };

  try {
    await $.ajax({
      type: "POST",
      url: "/modulos/ventas/configuracionPublicacionesIntegraciones.aspx/ObtenerPublicacionesIntegracion",
      data: info,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        if (data && data.d) {
          objectResponse.array = data.d.Items;
          objectResponse.TotalItems = data.d.TotalItems;
        }
      },
      error: function (response) {
        var r = jQuery.parseJSON(response.responseText);
        console.error("Error en la llamada:", r.Message);
      }
    });
  } catch (err) {
    console.error("Error en la petición:", err);
  }

  return objectResponse;
};

array();
