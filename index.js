import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var carName = "";

app.use(bodyParser.urlencoded({ extended: true }));

function carNameGenerator(req, res, next) {
  console.log(req.body);
  carName = req.body["brand"] + "-" + req.body["modal"];
  next();
}

app.use(carNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your favorite car  : </h1> <h2>${carName} 🚗</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
