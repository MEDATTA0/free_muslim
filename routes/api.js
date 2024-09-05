const { error } = require('console');
const express = require('express');
const path = require('path');
const { route } = require('./coran');

const router = express.Router();

router.get('/', (req, res) =>{
    res.send('Veuillez rechercher une api.');
});

router.get('/location', (req, res) => {
    const apiKey = '2f1e7302ef8760';
    const apiURL = `https://ipinfo.io/json?token=${apiKey}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => {
            console.log("Erreur lors de la requête de localisation : ", error);
        });
});

router.get('/prayerTime/:city/:country', (req, res) => {
    const city = req.params.city;
    const country = req.params.country;
    const AlAdhan_apiURL = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=3`;
    fetch(AlAdhan_apiURL)
    .then(response => response.json())
    // On revoie directement la réponse de l'api sous forme json comme réponse à la requête 'prayerTime' 
    .then(data => res.json(data))
    .catch(error => {
        console.log("Erreur lors de la requête à l'api AlAdhan : ", error);
    });
});

router.get('/recitations/:reciter_id_for_api', (req, res) => {
    const reciter_id = req.params.reciter_id_for_api;
    const quran_com_apiURL = `https://api.quran.com/api/v4/chapter_recitations/${reciter_id}`;
    fetch(quran_com_apiURL)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => {
        console.log("Erreur : ", error);
    })
})

// On exporte le module
module.exports = router