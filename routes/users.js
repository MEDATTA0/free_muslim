const express = require("express");
const mariadb = require("mariadb");
const fs = require("fs");

const router = express.Router();


router.get("/", (req, res) => {
    res.status(200).json({
    message: "Tous les utilisateurs"
    })
});

router.get("/new_user", (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        id: id,
    })
})


router.get("/:id/:status", (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    res.status(200).json({
        id: id,
        status: status
    })
})


// Exporter le module pour qu'il soit réutilisable dans un autre fichier
module.exports = router;