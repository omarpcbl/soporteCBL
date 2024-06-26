//Para ejecutar en la consola y copiar la info que se imprime como resultado

//Definir tamano de pagina
let pageSize = 200;

async function array() {
  const items = [];
  let totalPage = 1.5;
  for (let i = 1; i <= totalPage; i++) {
    const { array, TotalItems } = await filtrar(false, i);
    // Se espera a que la promesa se resuelva antes de ejecutar el push

    if (i === 1) {
      totalPage = Math.ceil(TotalItems / pageSize);
    }
    //pageSize que tambien esta denro de filtrar
    items.push(...array);
  }

  console.log(items);
}

const filtrar = async function (dif, page) {
  const items = [];

  $("#divError").hide();
  $("#resultsContainer").html("");

  if ($("#ddlCuenta").val() != "") {
    //alert($("#ddlTipoShipping").val());
    var currentPage = parseInt($("#hdnPage").val());
    var scrollId = $("#hdnMLScrollId").val();

    var info =
      "{ idIntegracion: " +
      $("#ddlCuenta").val() +
      ",titulo:'" +
      $("#txtTitulo").val() +
      "',estado:'" +
      $("#ddlEstado").val() +
      "',estadostock:'" +
      $("#ddlEstadoStock").val() +
      "',estadosincronizacion:'" +
      $("#ddlSinc").val() +
      "',estadoSku:'" +
      $("#ddlEstadoSku").val() +
      "',tipoPublicacion:'" +
      $("#ddlTipoPub").val() +
      "',tipoShipping:'" +
      $("#ddlTipoShipping").val() +
      "',freeShipping:'" +
      $("#ddlFreeShipping").val() +
      "',verDif: " +
      dif +
      ",page: " +
      page +
      ", pageSize: " +
      pageSize +
      ",scrollId:'" +
      scrollId +
      "'}";

    const objectResponse = {
      array: [],
    };
    await $.ajax({
      type: "POST",
      url: "/modulos/ventas/configuracionPublicacionesIntegraciones.aspx/ObtenerPublicacionesIntegracion",
      data: info,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data, text) {
        objectResponse.array.push(...data.d.Items);
        objectResponse.TotalItems = data.d.TotalItems;
      },
      error: function (response) {
        var r = jQuery.parseJSON(response.responseText);
        alert(r.Message);
      },
    });

    return objectResponse;
  } else {
  }
};

array();
