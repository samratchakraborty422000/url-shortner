const express = require("express");
const CryptoJS = require("crypto-js");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send("No data provided");
  }
  if(!url.startsWith("https://") && !url.startsWith("http://")){
    return res.status(400).send("Invalid URL format");
  }
  const ciphertext = CryptoJS.AES.encrypt(url, "secret key 123").toString();

  const data = ciphertext.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
  console.log(data);
  res.status(201).send(data);
});

app.get("/:hash", (req, res) => {
  const { hash } = req.params;
  if (!hash) {
    return res.status(400).send("No data provided");
  }

  const newHashUrl = hash.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');;
  var bytes = CryptoJS.AES.decrypt(newHashUrl, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);



  console.log(originalText); // 'my message
  res.status(301).redirect(originalText)
  
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
