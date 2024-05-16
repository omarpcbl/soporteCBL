const fs = require("fs").promises;
const claimsArray = require("./logs");

const baseUrlClaims = "https://api.mercadolibre.com/post-purchase/v1/claims/"; //POSIBLEMENTE CAMBIE
let CSVString = `UserID;Claim;ClaimType;Return Status;Return Substatus;Return Status Date\n`;

//CLAIM
async function fetchData() {
  try {
    for (const { IDClaim, token } of claimsArray) {
      const url = `${baseUrlClaims}${IDClaim}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error en la solicitud para claims ${IDClaim}, StatusCode: ${response.status}`
        );
      }

      const data = await response.json();

      const returns = [];

      if (data.type === "returns") {
        const auxReturns = await fetchReturn(IDClaim, token);
        returns.push(...auxReturns);
      }

      for (let ret of returns) {
        CSVString += `;${IDClaim};${data.type};${ret.status};${ret.substatus};${ret.date}\n`;
      }

      console.log(`Datos para claims ${IDClaim} registrados.`);
    }

    await writeToFile(`searchClaims_${logFileName()}`, CSVString);
  } catch (error) {
    console.error(error.message);
  }
}

//RETURN
async function fetchReturn(IDClaim, token) {
  try {
    const url = `https://api.mercadolibre.com/post-purchase/v2/claims/${IDClaim}/returns`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud para claims ${IDClaim}`);
    }

    const data = await response.json();

    const returns = data.shipping.status_history;

    return returns;
  } catch (error) {
    console.error(error.message);
  }
}

//NOMBRE DEL ARCHIVO
function logFileName() {
  const currentDate = new Date();

  // Formatear la fecha y hora para incluir en el nombre del archivo
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const formattedTime = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;

  return `_${formattedDate}_${formattedTime}_log.csv`;
}

//CREAR ARCHIVO
async function writeToFile(fileName, data) {
  try {
    await fs.writeFile(fileName, data);
    console.log(`Todas las respuestas guardadas en el archivo ${fileName}.`);
  } catch (error) {
    console.error(
      `Error al escribir en el archivo ${fileName}: ${error.message}`
    );
  }
}

fetchData();
