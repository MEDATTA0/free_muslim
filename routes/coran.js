const express = require("express");
const path = require("path");

// Importer le pool de connexion depuis db.js
const pool = require('./db');


const router = express.Router();

//Chemin vers le dossier public, pour faciliter la concatenation des chemins des différents fichiers
const public_Dir = path.resolve(__dirname, "..", "public")

router.get("/", (req, res) => {
    res.sendFile(path.join(public_Dir, 'coran', 'coran.html'));
});

// Le chemin pour get les données des reciteurs depuis la base de données
router.get('/reciter/:author_id', (req, res) => {
    const id = req.params.author_id;
    
    // On crée la requête
    const sql = `select * from biographies where id=${id}`;

    pool.query(sql)
    .then(rows => {
        // Les données renvoyées comme réponse sont un tableau de json (rows[].champdedonnees)
        res.json(rows);
    })   
    .catch(err => {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
        });
});


// Pour télécharger le coran
router.get("/:id/download", (req, res) => {
    const id = req.params.id;
    const file_path = path.join(public_Dir, "chemin/vers/le/fichier");
    res.download(file_path, "nomDuFichier", (err) => {
        if (err) {
            res.status(500).send("Erreur lors du téléchargement de fichier");
        }
    });
})

// On exporte le module
module.exports = router;