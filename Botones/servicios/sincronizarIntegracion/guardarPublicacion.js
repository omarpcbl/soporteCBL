const guardarPublicacion = function (
  IdCombinado,
  idProducto,
  idVariante,
  syncSku
) {
  var syncStock = $("#chkActualizarStock_" + IdCombinado).is(":checked");
  var syncPrecio = $("#chkActualizarPrecio_" + IdCombinado).is(":checked");
  var porcentajeAumento = $("#txtNuevoPorcentajePrecio_" + IdCombinado).val();
  var precioAdicional = $("#txtPrecioAdicional_" + IdCombinado).val();
  //var nuevoConcepto = $("#ddlConcepto" + "_" + idProducto + "_" + idVariante + " :selected").text();
  var codigoProducto = $("#txtConcepto_" + IdCombinado).val();
  var idConfiguracion = $("#hdnConfiguracion_" + IdCombinado).val();
  var stockMinimo = $("#txtNuevoStockMinimo_" + IdCombinado).val();

  if (codigoProducto == "" || codigoProducto === "undefined") {
    console.log("Debe seleccionar el producto");
    return;
  }

  if (syncSku) {
    $("#btnSyncSku_" + IdCombinado).html(
      "<i class='fa fa-spinner fa-pulse fa-fw'></i>&nbsp;Procesando..."
    );
    $("#btnSyncSku_" + IdCombinado).attr("disabled", true);
  } else {
    $("#btnGuardar_" + IdCombinado).html(
      "<i class='fa fa-spinner fa-pulse fa-fw'></i>&nbsp;Procesando..."
    );
    $("#btnGuardar_" + IdCombinado).attr("disabled", true);
    console.log("Publicacion sin SKU");
    return;
  }
  //alert("#txtNuevoPorcentajePrecio_" + idProducto + "_" + idVariante);
  //alert(nuevoPrecio);
  var info =
    "{ idIntegracion: " +
    $("#hdnIntegracion").val() +
    ", idConfiguracion: '" +
    idConfiguracion +
    "', idProducto: '" +
    idProducto +
    "', idVariante: '" +
    idVariante +
    "', aumentoPrecioAdicional: '" +
    precioAdicional +
    "', porcentajePrecio: '" +
    porcentajeAumento +
    "', codigoProducto: '" +
    codigoProducto +
    "', syncStock: " +
    syncStock +
    ", syncPrecio: " +
    syncPrecio +
    ", syncSku: " +
    syncSku +
    ", stockMinimo: '" +
    stockMinimo +
    "'}";
  $.ajax({
    type: "POST",
    url: "/modulos/ventas/configuracionPublicacionesIntegraciones.aspx/guardarConfiguracion",
    data: info,
    async: true,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      //$("#hdnConcepto" + "_" + idProducto + "_" + idVariante).val(idConcepto);
      ////$("#lblNuevoPrecio" + "_" + idProducto + "_" + idVariante).text(nuevoPrecio);
      //$("#lblConcepto" + "_" + idProducto + "_" + idVariante).text("actualizado");

      //$("#lblNuevoPrecio" + "_" + idProducto + "_" + idVariante).show();
      //$("#lblConcepto" + "_" + idProducto + "_" + idVariante).show();
      //$("#btnEditar" + "_" + idProducto + "_" + idVariante).show();

      //$("#txtNuevoPrecio" + "_" + idProducto + "_" + idVariante).hide();
      //$("#ddlConcepto" + "_" + idProducto + "_" + idVariante).hide();
      //$("#btnGuardar" + "_" + idProducto + "_" + idVariante).hide();
      if (!syncSku) {
        window.setTimeout(function () {
          $("#btnGuardar_" + IdCombinado).html(
            '<i class="fa fa-check"></i>&nbsp;Actualizar'
          );
          $("#btnGuardar_" + IdCombinado).attr("disabled", false);
          configuracionPublicacionesIntegraciones.actualizarVistaPublicacion(
            data,
            IdCombinado,
            idProducto,
            idVariante
          );
        }, 1000);
      } else {
        configuracionPublicacionesIntegraciones.syncSku(
          IdCombinado,
          idProducto,
          idVariante
        );
      }

      configuracionPublicacionesIntegraciones.ejecutarSync(
        IdCombinado,
        idProducto,
        idVariante
      );
    },
    error: function (response) {
      var r = jQuery.parseJSON(response.responseText);
      console.log(r.Message);

      $("#btnGuardar_" + idProducto + "_" + idVariante).html(
        '<i class="fa fa-check"></i>&nbsp;Actualizar'
      );
      $("#btnGuardar_" + idProducto + "_" + idVariante).attr("disabled", false);
    },
  });
};

// Array para almacenar los argumentos de guardarPublicacion de cada botón
var argumentosGuardado = [];

// Obtener todos los botones con la clase btnGuardarPublicacion
var botones = document.getElementsByClassName("btnGuardarPublicacion");

// Recorrer cada botón
for (var i = 0; i < botones.length; i++) {
  // Obtener el ID del botón
  var idBoton = botones[i].id;

  // Obtener el valor del onclick atributo del botón
  var onclickValue = botones[i].getAttribute("onclick");

  // Extraer los argumentos de la función guardarPublicacion
  var argumentos = onclickValue.match(/\((.*?)\)/)[1].split(",");

  // Limpiar los argumentos de espacios y comillas
  for (var j = 0; j < argumentos.length; j++) {
    argumentos[j] = argumentos[j].trim().replace(/['"]/g, "");
  }

  // Agregar los argumentos al array argumentosGuardado
  argumentosGuardado.push({
    id: idBoton,
    argumentos: argumentos,
  });
}

// Mostrar el resultado en la consola
console.log(argumentosGuardado);
