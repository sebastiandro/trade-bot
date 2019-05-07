// -- HTTP Server settings
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// -- Websocket Server
const expressWs = require("express-ws")(app);

// -- Bots
const cfg = require("./config");
const CoinbaseBot = require("./libs/CoinbaseBot/CoinbaseBot");

const cbb = new CoinbaseBot(
  cfg.coinbase.key,
  cfg.coinbase.secret,
  cfg.coinbase.passphrase
);

// -- Endpoints
app.ws("/hey", function(ws, req) {
  ws.on("message", function(msg) {
    console.log(msg);
    ws.send("Howdy Mr Client!");
  });
});

app.ws("/coinbase-stream", function(ws, req) {
  cbb.ws.on("message", data => {
    ws.send(JSON.stringify(data));
  });
});

app.use("/", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
