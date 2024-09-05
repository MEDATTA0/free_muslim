const express = require("express");
const path = require("path");

const router = express.Router();

//Chemin vers le dossier public, pour faciliter la concatenation des chemins des différents fichiers
const public_Dir = path.resolve(__dirname, "..", "public")

router.get("/", (req, res) => {
    res.sendFile(path.join(public_Dir, 'islam', 'islam.html'));
});

// -------------------------------------Piliers--------------------------------------------------
// --------La page principale des piliers
router.get("/piliers", (req, res) => {
    res.sendFile(path.join(public_Dir, 'islam/piliers', 'piliers.html'));
});

// --------La page pilier_info
router.get("/piliers/:id", (req, res) =>{
    const id_pilier = req.params.id;
    switch (id_pilier) {
        case 1:
            res.sendFile(public_Dir, 'islam/piliers/articles/', 'priere.html')
            break;
    
        default:
            console.log("exit, bad option");
            break;
    }
});

// -------------------------------------Fatwa----------------------------------------------------
router.get("/fatwa", (req, res) => {
    res.sendFile(path.join(public_Dir, 'islam/fatwa', 'fatwa.html'));
});

// On exporte le module
module.exports = router;

