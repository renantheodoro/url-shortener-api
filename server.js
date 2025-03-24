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
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = shortid.generate();
  const shortUrl = `http://localhost:${port}/api/${shortCode}`;

  // Armazenando a URL curta no banco de dados em memória
  urlDatabase[shortCode] = originalUrl;

  return res.json({ shortUrl });
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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
