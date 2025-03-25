const functions = require("firebase-functions");
const express = require("express");
const shortid = require("shortid");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.post("/api/shorten", async (req, res) => {
  try {
    const {url} = req.body;

    if (!url) {
      return res.status(400).json({error: "URL is required"});
    }

    const shortCode = shortid.generate();
    const shortUrl = `https://url-shortener-api-c5488.web.app/${shortCode}`;

    await db.collection("shortenedUrls").doc(shortCode).set({
      originalUrl: url,
      shortCode,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      message: "URL shortened successfully",
      originalUrl: url,
      shortCode,
      shortUrl,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

app.get("/:shortCode", async (req, res) => {
  try {
    const {shortCode} = req.params;

    // Buscar no Firestore
    const doc = await db.collection("shortenedUrls").doc(shortCode).get();

    if (!doc.exists) {
      return res.status(404).json({error: "Shortened URL not found"});
    }

    const originalUrl = doc.data().originalUrl;
    return res.redirect(originalUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

exports.app = functions.https.onRequest(app);
