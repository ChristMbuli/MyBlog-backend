// Import des modules nécessaires
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGO_URL, PORT } = process.env;
const { AddPost, AllPost, ViewPost } = require("./routes/PostRoute");
const multerMiddleware = require("./utils/Multer");

// Création d'une instance d'Express
const app = express();

//Middleware pour gérer la politique CORS
app.use(
  cors({
    origin: "https://incomparable-snickerdoodle-ae92c4.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    httpOnly: false,
    credentials: true,
  })
);

// Middleware pour parser le corps des requêtes au format JSON
app.use(express.json());

// Connexion à MongoDB et démarrage du serveur Express
mongoose
  .connect(MONGO_URL) // Connexion à MongoDB
  .then(() => {
    // En cas de succès
    app.listen(PORT, () => {
      // Affichage d'un message de succès
      console.log("Connection successfully !");
    });
    // Affichage d'un message indiquant que la connexion à MongoDB a réussi
    console.log("MongoDB Connected !");
  })
  .catch((error) => {
    // En cas d'erreur
    // Affichage de l'erreur de connexion à MongoDB
    console.log("Error connecting to MongoDB:", error);
  });

//----------------------------
//Router
app.post("/server/add", multerMiddleware, AddPost);
app.get("/server/all", AllPost);
app.get("/server/view/:id", ViewPost);
