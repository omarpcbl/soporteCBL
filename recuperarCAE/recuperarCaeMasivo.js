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
        if (resultado === true) {
          detenerBucle = true; // Establecer la bandera para detener el bucle. Borrar en caso de no querer detener el bucle
        }
        resolve();
      });
    });
  }
}

//Bloque con sintaxis JQuery ---ATENCION---
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
          console.error(
            `No recuperada:\n${$("#ddlTipoComprobante").val()} ${$(
              "#txtPunto"
            ).val()}-${$("#txtNroComprobante").val()}\nError: ${data.Mensaje}`
          );
          callback(true); // Cambiar a false en caso de no querer detener el proceso
        } else {
          $("#divOk").show();
          console.log(
            `Recuperada ${$("#ddlTipoComprobante").val()} ${$(
              "#txtPunto"
            ).val()}-${$("#txtNroComprobante").val()}`
          );
          callback(false); // Llama al callback con 'false' para indicar éxito
        }
      },
    });
  } else {
    callback(true); // Llama al callback con 'true' si los datos no son válidos
  }
}
