var cron = require("node-cron");
const { sendPetitions } = require("./actualizacionMasivaWP");

cron.schedule("*/1 * * * * *", () => {
  console.log("actualizar");
});
