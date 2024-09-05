const http = require("http");
const fs = require("fs")
const path = require("path");
const mariadb = require("mariadb");
const { response } = require("express");
const { url } = require("inspector");

const port = 5000


const httpServer = http.createServer();

httpServer.on('request', (request, response) => {
    if (request.url === "/"){

        response.statusCode = 200;
        //On spéficie que l'on retourne du HTML
        response.setHeader("Content-Type", "text/html");

        //On branche le flux du contenu de index.html à la réponse
        fs.createReadStream('../index.html').pipe(response);
        }
    
    else if (request.url === "/news") {
        response.statusCode = 200;
        //On spéficie que l'on retourne du HTML
        response.setHeader("Content-Type", "text/html");

        //On branche le flux du contenu de index.html à la réponse
        fs.createReadStream('../Islamic_News/news.html').pipe(response);
        }
    
    //Route pour le coran
    else if (request.url === "/coran") {
        response.statusCode = 200;
        //On spéficie que l'on retourne du HTML
        response.setHeader("Content-Type", "text/html");

        //On branche le flux du contenu de index.html à la réponse
        fs.createReadStream('../Rectiers/coran.html').pipe(response);
    }

    //Route pour le contact_us
    else if (request.url === "/contact_us"){
        response.statusCode = 200;
        //On spéficie que l'on retourne du HTML
        response.setHeader("Content-Type", "text/html");

        //On branche le flux du contenu de index.html à la réponse
        fs.createReadStream('../contact_us.html').pipe(response);
    }

    //Route pour Our_story
    else if (request.url === "/our_story"){
        response.statusCode = 200;
        //On spéficie que l'on retourne du HTML
        response.setHeader("Content-Type", "text/html");

        //On branche le flux du contenu de index.html à la réponse
        fs.createReadStream('../our_story.html').pipe(response);
        }
    
    //Dernier recours
    else {
        response.statusCode = 404;
        response.end("Not Found !")
    }
});

    

    
httpServer.listen(port, () => {
    console.log("Server connected and running at http://localhost:5000 ");
})