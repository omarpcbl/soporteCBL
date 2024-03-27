require("dotenv").config();
let fs = require("node:fs").promises;

//DEFINIR
let bearer = process.env.TOKEN; //TOKEN = {"access_token": STRING,"token_type": STRING,"expires_in": INT}
let IDUsuario = 43686;
let base_url = "https://rest.contabilium.com"; //https://rest.contabilium.com.uy https://rest.contabilium.cl

const conceptos = {
  pages: 0,
  itemsFetched: 0,
  responseTimes: {},
};

async function searchConceptos() {
  let pages = 1;
  let totalResponseTime = 0;

  for (let i = 1; i <= pages; i++) {
    let url = `${base_url}/api/conceptos/search?` + "page=" + i;

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

      console.log(
        `Petición ${url} exitosa. Código de estado: ${response.status}`
      );

      const data = await response.json();

      if (i === 1) {
        pages = Math.ceil(data.TotalItems / data.TotalPage);
      }

      // Almacena el tiempo de respuesta asociado con el número de página
      conceptos.responseTimes[`pagina ${i}`] = duration;
      // Suma el tiempo de respuesta al total
      totalResponseTime += duration;
      conceptos[`pagina ${i}`] = data.Items;
      conceptos.pages++;
      conceptos.itemsFetched += data.Items.length;
    } catch (error) {
      console.error(error.message);
    }
  }

  // Agrega el total al objeto de tiempos de respuesta
  conceptos.responseTimes.total = totalResponseTime;

  try {
    await fs.writeFile(
      `searchConceptos_${IDUsuario}`,
      JSON.stringify(conceptos)
    );
    console.log("El archivo ha sido guardado correctamente.");
  } catch (error) {
    console.error("Error al escribir el archivo:", error.message);
  }
}

searchConceptos();
