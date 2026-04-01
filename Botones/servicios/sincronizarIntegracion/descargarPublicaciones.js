// Script para extraer publicaciones y descargar CSV automáticamente
let pageSize = 200;
let userId = "13027"; // Tu ID definido

async function iniciarProceso() {
    const items = [];
    let totalPage = 1;
    
    console.log("%c🚀 Iniciando extracción de datos...", "color: #007bff; font-weight: bold;");

    for (let i = 1; i <= totalPage; i++) {
        const response = await filtrar(false, i);
        
        if (response && response.array) {
            if (i === 1) {
                totalPage = Math.ceil(response.TotalItems / pageSize);
                console.log(`📊 Total de ítems: ${response.TotalItems}. Páginas: ${totalPage}`);
            }
            items.push(...response.array);
            console.log(`✅ Página ${i}/${totalPage} obtenida.`);
        }
    }

    if (items.length > 0) {
        generarYDescargarCSV(items);
    } else {
        console.error("❌ No se obtuvieron datos para exportar.");
    }
}

const filtrar = async function (dif, page) {
    let multideposito = $("#warningMultideposito").data('active') || false;
    let info = JSON.stringify({
        idIntegracion: $("#ddlCuenta").val(),
        titulo: $("#txtTitulo").val() || "",
        estado: $("#ddlEstado").val() || "",
        estadostock: $("#ddlEstadoStock").val() || "",
        estadosincronizacion: $("#ddlSinc").val() || "",
        estadoSku: $("#ddlEstadoSku").val() || "",
        tipoPublicacion: $("#ddlTipoPub").val() || "",
        tipoShipping: $("#ddlTipoShipping").val() || "",
        freeShipping: $("#ddlFreeShipping").val() || "",
        verDif: dif,
        page: page,
        pageSize: pageSize,
        multiDeposito: multideposito,
        scrollId: $("#hdnMLScrollId").val() || ""
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
                if (data?.d) {
                    objectResponse.array = data.d.Items;
                    objectResponse.TotalItems = data.d.TotalItems;
                }
            }
        });
    } catch (err) { console.error("Error en página " + page, err); }
    return objectResponse;
};

function generarYDescargarCSV(data) {
    console.log("📝 Generando archivo CSV con fórmulas...");
    
    // Encabezados
    let csvString = `MLA;idVariante;"TipoPublicacion";"Envío";"SKU Meli";"Precio Meli";"Precio Promocional Meli";"Stock Meli";"SKU CBL";"Precio CBL";"Aumento porcentaje";"Aumento monto";"Stock CBL";"Actualizar precio";"Actualizar stock";"¿Está habilitada la sincronización?";"¿Coincide precio?";"¿Coincide stock?"\n`;

    // El conteo de filas en Excel empieza en 2 (la 1 es el encabezado)
    let fila = 2;

    for (let item of data) {
        // FORMULAS DINÁMICAS:
        // Comparar Precio Meli (Columna E) con Precio CBL (Columna I)
        let formuPrecio = `=IF(E${fila}=I${fila};"OK";"ERROR")`;
        
        // Comparar Stock Meli (Columna G) con Stock CBL (Columna L)
        let formuStock = `=IF(G${fila}=L${fila};"OK";"ERROR")`;

        csvString += `${item.IdProducto};"${item.idVariante}";"${item.TipoPublicacion}";"${item.TipoShipping}";"${item.SKUActual}";${item.Precio};${item.PrecioPromocional};${item.Stock};"${item.ConceptoContabilium}";${item.PrecioContabilium};${item.PorcentajeAumentoPrecio};${item.PrecioAdicional};${item.StockContabilium};${item.ActualizaPrecio};${item.ActualizaStock};${item.IdConceptoConfiguracionPublicacion !== null};${formuPrecio};${formuStock}\n`;
        
        fila++;
    }

    // Proceso de descarga
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const now = new Date();
    const fileName = `${userId}_${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}_log.csv`;

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`%c✨ ¡Archivo con fórmulas generado! (Fila final: ${fila - 1})`, "color: #28a745; font-weight: bold;");
}

iniciarProceso();
