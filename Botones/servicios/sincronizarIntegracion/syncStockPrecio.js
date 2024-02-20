const fs = require("fs");
const data = require("./babay.json");

console.log(data[0]);

//DEFINIR
let userId = "20367";
const logDirectory = "logs";

let csvString = `"MLA";"TipoPublicacion";"Envío";"SKU Meli";"Precio Meli";"Precio Promocional Meli";"Stock Meli";"SKU CBL";"Precio CBL";"Aumento porcentaje";"Aumento monto";"Stock CBL";"Actualizar precio";"Actualizar stock"\n`;

for (let item of data) {
  csvString += `${item.IdProducto}; ${item.TipoPublicacion};${item.TipoShipping};${item.SKUActual};${item.Precio};${item.PrecioPromocional};${item.Stock};${item.ConceptoContabilium};${item.PrecioContabilium};${item.PorcentajeAumentoPrecio};${item.PrecioAdicional};${item.StockContabilium};${item.ActualizaPrecio};${item.ActualizaStock}\n`;
}

//Creaci[on del archivo
const currentDate = new Date();

// Formatear la fecha y hora para incluir en el nombre del archivo
const formattedDate = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;
const formattedTime = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;

const logFileName = `${userId}_${formattedDate}_${formattedTime}_log.txt`;
const logFilePath = `${logFileName}`;

fs.writeFile(logFilePath, csvString, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Archivo escrito exitosamente!");
});
