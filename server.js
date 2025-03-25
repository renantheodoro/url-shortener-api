const functions = require("firebase-functions");
const express = require("express");
const shortid = require("shortid");

const app = express();
const port = 5001;

// Usando um objeto simples para armazenar as URLs
let urlDatabase = {};

// Middleware para fazer o parsing do corpo da requisição
app.use(express.json());

// Rota para encurtar a URL
app.post("/api/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = shortid.generate();
  const shortUrl = `https://<your-project-id>.web.app/api/${shortCode}`; // Atualize a URL para o Firebase Hosting
  const alias = shortCode;

  // Armazenando a URL curta no banco de dados em memória
  urlDatabase[shortCode] = url;

  return res.json({
    alias: alias,
    _links: {
      self: `https://<your-project-id>.web.app/api/${shortCode}`,
      short: shortUrl,
    },
  });
});

// Rota para redirecionar a URL curta para a original
app.get("/api/:shortCode", (req, res) => {
  const { shortCode } = req.params;
  const originalUrl = urlDatabase[shortCode];

  if (!originalUrl) {
    return res.status(404).json({ error: "Shortened URL not found" });
  }

  return res.redirect(originalUrl);
});

// Exporte a função para o Firebase
exports.app = functions.https.onRequest(app);
