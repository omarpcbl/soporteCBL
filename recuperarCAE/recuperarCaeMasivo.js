//import { cuit, facturas } from "./facturas.json";

async function rCae(facturas, cuit, checkedNC) {
  let detenerBucle = false; // Variable de bandera para detener el bucle

  for (const factura of facturas) {
    if (detenerBucle) {
      break; // Salir del bucle si la bandera está establecida
    }

    const [cuitUsuario, tipoComprobante, punto, nroComprobante, generarNC] =
      document.body.querySelectorAll(
        "#txtNroComprobante, #txtCuitUsuario, #txtPunto, #ddlTipoComprobante, #chkGenerarNC"
      );

    nroComprobante.value = factura.Numero;
    cuitUsuario.value = cuit;
    punto.value = factura.Punto;
    tipoComprobante.value = factura.Tipo;
    generarNC.checked = checkedNC;

    // Llamar a recuperarCAE() y pasar un callback para controlar el flujo
    await new Promise((resolve) => {
      recuperarCAE((resultado) => {
        if (resultado === false) {
          detenerBucle = true; // Establecer la bandera para detener el bucle
        }
        resolve();
      });
    });
  }
}

function recuperarCAE(callback) {
  $("#divError,#divOk").hide();
  if (
    $(
      "#txtNroComprobante,#txtCuitUsuario,#txtPunto,#ddlTipoComprobante"
    ).valid()
  ) {
    Common.mostrarProcesando("btnActualizar");
    $("#divError").hide();
    var info =
      "{ nroComprobante: '" +
      $("#txtNroComprobante").val() +
      "', cuitUsuario: '" +
      $("#txtCuitUsuario").val() +
      "', punto: " +
      $("#txtPunto").val() +
      ", tipoComprobante: '" +
      $("#ddlTipoComprobante").val() +
      "', generarNC: " +
      $("#chkGenerarNC").is(":checked") +
      " }";

    $.ajax({
      type: "POST",
      url: "/Soporte/RecuperarCae",
      data: info,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        Common.ocultarProcesando("btnActualizar", "Actualizar");
        if (data.TieneError) {
          $("#msgError").html(data.Mensaje);
          $("#divError").show();
          callback(false); // Llama al callback con 'false' para indicar un error
        } else {
          $("#divOk").show();
          callback(true); // Llama al callback con 'true' para indicar éxito
        }
      },
    });
  } else {
    callback(false); // Llama al callback con 'false' si los datos no son válidos
  }
}
