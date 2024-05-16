require("dotenv").config();
let fs = require("node:fs").promises;
const { comprobantes } = require("./comprobantes.json");

//DEFINIR
//let bearer = process.env.TOKEN; //TOKEN = {"access_token": STRING,"token_type": STRING,"expires_in": INT}
let bearer =
  "oeWXkynfTk1xr8imIzcsDcfIbaYHcrquNUQ_P5u2i6DwvA7zZdG7euaKBWybVrpIz5hhbahNHPlFHxLvJH9OCHrJXTrE6GVKBxH5odrRp08PiWUHS4PFXnXv11SC0Jblxu97yccoV9SL4Y3v2yapolRT_h5G3cvGajVl06psG1PSdmQOZzniWfwO8HUJGIsf1Xy2Zmfw0ZjOTZcqyTaX5U3CzcTiNxokg1DfFkpKdFkAbFK1ieZFW3Yq7pK-mCTcMezUPanz02PjdA0Ob8jRz1ZCJ-SOA4J1LHNGBt889gpoi21c8gIVDPjuN7FjYZmON7KWyJHVe6KiMDEYCvD-exCsgCmyw9CwYoCn0oiX3c5245NXNWRVJtJBLPHoYUIRc6g1ePXsZAiUdJG5qTAx50S8TuOrvz9014v3YCY7Mw00SSsuAue91WKJtX0TCFTFwLFY_vptiEAO4CRR1qbHM5HwuorJxKpoIRyC5jkcCo9ybwjjdEJz02pxumKtuP6yY6nkZhm7BtmSAbWsdQbLeVteQCM4EKAFX1JUmn7EdzMpoKjYOCltNUomeA5RZpkFN4NjGE6RLhe5ItPEBnABIXnAiKq09TxCzccjSrwF8M9Wv7BFFXclkAo3Cn8cil5g";
let IDUsuario = 11627;
let base_url = "https://rest.contabilium.com"; //https://rest.contabilium.com.uy https://rest.contabilium.cl

const getComprobantes = [];

async function searchcomprobante() {
  let totalResponseTime = 0;

  for (let comp of comprobantes) {
    let url = `${base_url}/api/comprobantes/?id=${comp}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error en la petición ${url}. Código de estado: ${response.status}`
        );
      }

      console.log(
        `Petición ${url} exitosa. Código de estado: ${response.status}`
      );

      const data = await response.json();

      getComprobantes.push(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  //   // Agrega el total al objeto de tiempos de respuesta
  //   comprobantes.responseTimes.total = totalResponseTime;

  try {
    await fs.writeFile(
      `getComprobantes_${IDUsuario}`,
      JSON.stringify(getComprobantes)
    );
    console.log("El archivo ha sido guardado correctamente.");
  } catch (error) {
    console.error("Error al escribir el archivo:", error.message);
  }
}

searchcomprobante();
