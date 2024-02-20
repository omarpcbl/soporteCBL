const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  let { sku } = req.query;
  console.log(`Recibido POST de ${sku}`);
  res.send(`Recibido POST de ${sku}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
