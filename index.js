const express = require("express");
const bwipjs = require("bwip-js");
const config = require("config");
const fs = require("fs");
const app = express();
const https = require('https');
const logger = require('./logger').logger;


app.get("/barcode", (req, res) => {

  const barcodetype = req.query.type;
  const text = req.query.text;

  logger.info(barcodetype + " type barcode is requested for " + text);

  // Generate the Aztec code
  bwipjs.toBuffer(
    {
      bcid: barcodetype, // Barcode type for Aztec code
      text: text, // Input text
      scale: config.get('barcode.scale'), // Scale factor for the image (adjust as needed)
      height: config.get('barcode.height'), // Height of the barcode (adjust as needed)
    },
    function (err, png) {
      if (err) {
        // Handle error if barcode generation fails
        res.status(500).send("Error generating Aztec code");
      } else {
        // Set the Content-Type header to "image/png"
        res.setHeader("Content-Type", "image/png");
        // Send the image buffer as the API response
        res.send(png);
      }
    }
  );
});

const port = config.get("port")
const options = {
  pfx: fs.readFileSync(config.get("ssl.pfx")),
  passphrase: config.get("ssl.passphrase")
};

var server = https.createServer(options, app).listen(port, function () {
  console.log("Express server listening on port " + port);
});
