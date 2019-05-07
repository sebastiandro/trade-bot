const CoinbasePro = require("coinbase-pro");

module.exports = class CoinbaseBot {
  constructor(key, secret, passphrase) {
    this.wssUrl = "wss://ws-feed-public.sandbox.pro.coinbase.com";
    this.ws = new CoinbasePro.WebsocketClient(["BTC-USD", "ETH-USD"]);
  }

  startWebsocket() {
    this.ws.on("message", data => {
      console.log(data);
    });
    this.ws.on("error", err => {
      console.error(err);
    });
    this.ws.on("close", () => {
      console.log("closed connection");
    });
  }
};
