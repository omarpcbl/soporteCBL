require("dotenv").config();
let fs = require("node:fs").promises;

//DEFINIR
let bearer = process.env.TOKEN; //TOKEN = {"access_token": STRING,"token_type": STRING,"expires_in": INT}
let base_url = "https://rest.contabilium.com.uy"; //https://rest.contabilium.com.uy https://rest.contabilium.cl
let id_deposito = 32;

const inventarios = {
  pages: 0,
  itemsFetched: 0,
  responseTimes: {},
};

async function getStockByDeposito() {
  let pages = 1;
  let totalResponseTime = 0;

  for (let i = 1; i <= pages; i++) {
    let url =
      `${base_url}/api/inventarios/getStockByDeposito?id=${id_deposito}` +
      "&page=" +
      i;

    try {
      const startTime = performance.now();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // try {
      //   await fetch("https://209b-186-23-95-152.ngrok-free.app/", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       url: url,
      //       status: response.status,
      //     }),
      //   });
      // } catch (err) {
      //   console.log(err.message);
      // }

      if (!response.ok) {
        throw new Error(
          `Error en la petición ${url}. Código de estado: ${response.status}`
        );
      }

      const data = await response.json();

      if (i === 1) {
        pages = Math.ceil(data.TotalItems / data.TotalPage);
      }

      // Almacena el tiempo de respuesta asociado con el número de página
      inventarios.responseTimes[`pagina ${i}`] = duration;
      // Suma el tiempo de respuesta al total
      totalResponseTime += duration;
      inventarios[`pagina ${i}`] = data;
      inventarios.pages++;
      inventarios.itemsFetched += data.Items.length;
    } catch (error) {
      console.error(error.message);
    }
  }

  // Agrega el total al objeto de tiempos de respuesta
  inventarios.responseTimes.total = totalResponseTime;

  try {
    await fs.writeFile("archivo.json", JSON.stringify(inventarios));
    console.log("El archivo ha sido guardado correctamente.");
  } catch (error) {
    console.error("Error al escribir el archivo:", error.message);
  }
}

getStockByDeposito();
