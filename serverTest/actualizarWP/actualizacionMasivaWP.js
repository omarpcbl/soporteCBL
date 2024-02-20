const { SKU } = require("../SKU");
const fs = require("fs").promises;
const nodeFetch = require("node-fetch");

const url = "https://littleparadise.com.ar/wp-json/wp/v2/contabilium/"; // Reemplaza con tu URL
const userId = "27029"; // Reemplaza con el ID de usuario o utiliza una variable que contenga el ID

const logDirectory = "logs"; // Directorio para los archivos de logs

async function fetchDataAndLog(element) {
  const currentDate = new Date();

  // Formatear la fecha y hora para incluir en el nombre del archivo
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const formattedTime = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;

  const logFileName = `${userId}_${formattedDate}_${formattedTime}_log.txt`;
  const logFilePath = `${logDirectory}/${logFileName}`;

  try {
    const response = await nodeFetch(url + element, { method: "GET" });
    const responseData = await response.json();

    // Formatear información de respuesta
    const logMessage = `URL: ${url + element}\nStatus Code: ${
      response.status
    }\nResponse: ${JSON.stringify(responseData)}\n\n`;

    // Escribir información en el archivo de logs de forma asíncrona
    await fs.writeFile(logFilePath, logMessage, { flag: "a" }); // 'a' para agregar al archivo si ya existe

    console.log("Datos recuperados con éxito:", responseData);
  } catch (error) {
    // Formatear información de error
    const logErrorMessage = `URL: ${url + element}\nError: ${
      error.message
    }\nStatus Code: ${error.response ? error.response.status : "N/A"}\n\n`;

    `URL: ${url}\nError: ${error.message}\nStatus Code: ${
      error.response ? error.response.status : "N/A"
    }\n\n`;

    // Escribir información de error en el archivo de logs de forma asíncrona
    await fs.writeFile(logFilePath, logErrorMessage, { flag: "a" }); // 'a' para agregar al archivo si ya existe

    console.error("Error al recuperar datos:", error.message);
  }
}

// Bucle para ejecutar fetchDataAndLog 10 veces (por ejemplo)

const sendPetitions = function () {
  for (let element of SKU) {
    fetchDataAndLog(element);
  }
};

module.exports = {
  sendPetitions,
  HolaMundo: () => console.log("Hola mundo"),
};
