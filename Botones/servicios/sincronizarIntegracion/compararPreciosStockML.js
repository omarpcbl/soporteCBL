const fs = require("fs");
const data = require("./babay.json");

//DEFINIR
let userId = "3ENLINEA";
const logDirectory = "logs";

let csvString = `"MLA";"TipoPublicacion";"Envío";"SKU Meli";"Precio Meli";"Precio Promocional Meli";"Stock Meli";"SKU CBL";"Precio CBL";"Aumento porcentaje";"Aumento monto";"Stock CBL";"Actualizar precio";"Actualizar stock";"¿Está habilitada la sincronización?";"¿Coincide precio?";"¿Coincide stock?"\n`;

//DEFINIR FORMULA EXCEL PARA EVALUAR COINCIDENCIA DE PRECIOS Y STOCK
let formuPrecio = "INSERTE FORMULA";
let formuStock = "INSERTE FORMULA";

for (let item of data) {
  csvString += `${item.IdProducto}; ${item.TipoPublicacion};${
    item.TipoShipping
  };${item.SKUActual};${item.Precio};${item.PrecioPromocional};${item.Stock};${
    item.ConceptoContabilium
  };${item.PrecioContabilium};${item.PorcentajeAumentoPrecio};${
    item.PrecioAdicional
  };${item.StockContabilium};${item.ActualizaPrecio};${item.ActualizaStock};${
    item.IdConceptoConfiguracionPublicacion === null ? false : true
  };${formuPrecio};${formuStock}\n`;
}

//Creaci[on del archivo
const currentDate = new Date();

// Formatear la fecha y hora para incluir en el nombre del archivo
const formattedDate = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;
const formattedTime = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;

const logFileName = `${userId}_${formattedDate}_${formattedTime}_log.csv`;
const logFilePath = `${logDirectory}/${logFileName}`;

fs.writeFile(logFilePath, csvString, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Archivo escrito exitosamente!");
});
