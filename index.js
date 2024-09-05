// Importer des modules 
const express = require("express");
const mariadb = require("mariadb");
const path = require("path");
//Pour les autorisations des origines(ip:port) des requêtes
const cors = require("cors");
// Port d'écoute
const port = 5000;


const app = express();

// On autorise toutes les origines des requêtes (temporairement pour le developpement)
app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// On définit les routes des différentes sections
const coranRoute = require("./routes/coran");
const islamRoute = require("./routes/islam");
const apiRoute = require("./routes/api");
const postRoute = require("./routes/posts");

//On redirige les routes des requêtes
app.use("/coran", coranRoute);
app.use("/islam", islamRoute);
app.use("/posts", postRoute);
app.use("/api", apiRoute);

// Le serveur écoute
app.listen(port, (err) => {
    if (err){
        console.log("Erreur serveur : ", err);
        return;
    }
    
    console.log("Server connected on port 5000 !");
});



