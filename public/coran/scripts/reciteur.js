
function displayBiography() {
    // Récupère le paramètre d'URL pour savoir quel réciteur a été choisi
    const params = new URLSearchParams(window.location.search);
    const reciter = params.get("reciter");
    return reciter;
}

document.addEventListener("DOMContentLoaded", function () {
    const reciter_id = displayBiography();
    const url = `http://localhost:5000/coran/reciter/${reciter_id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const title_Div = document.getElementById('title');
            // On ajoute un titre à la page chargée, le titre est le nom au complet du sheikh
            title_Div.innerHTML = `${data[0].first_name} ${data[0].last_name}`;


// ---------------------------------Chargement des informations sur le sheikh--------------------------
            const infobox_Div = document.getElementById('infobox');
            // On ajoute les informations récupérées depuis la base de données dans un tableau
            infobox_Div.innerHTML = `  
        <table>
            <thead>
                <!-- th pour faire une colonne d'en-tête
                    td pour faire une colonne classique
                    tr pour faire une ligne -->
                <tr>
                    <th colspan="2">${data[0].first_name} ${data[0].last_name}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="infobox-image" colspan="2">
                        <img src="${data[0].pictures_path}/${data[0].first_name}.jpeg" alt="${data[0].first_name} ${data[0].last_name}">

                    </td>
                </tr>
                <tr>
                    <td> Prénom : </td>
                    <td> ${data[0].first_name} </td>
                </tr>
                <tr>
                    <td> Nom : </td>
                    <td> ${data[0].last_name} </td>
                </tr>
                <tr>
                    <td> Born : </td>
                    <td><strong> ${data[0].date_of_birth} à ${data[0].place_of_birth} </strong></td>
                </tr>
                <tr>
                    <td> Death : </td>
                    <td><strong> ${data[0].date_of_death} à ${data[0].place_of_death} </strong></td>
                </tr>
                
                <tr>
                    <td> Nationalité: </td>
                    <td> ${data[0].nationality} </td>
                </tr>

                <tr>
                    <td> Profession : </td>
                    <td><strong> ${data[0].profession} </strong></td>
                </tr>
                <tr>
                    <td> 
                </tr>
            </tbody>
        </table>
            `;
        
            const biography_Div = document.getElementById("biography");
            biography_Div.innerHTML = `
            <h2> Biographie : </h2>
            <p> ${data[0].biography} </p>
            `;
        })
        .catch(error => {
            console.log("Erreur: ", error);
        });
// ---------------------------------------------------------------------------------------------

// -----------------------------Chargement des audios-------------------------------------------
        const params = new URLSearchParams(window.location.search);
        const reciter_id_for_api = params.get("reciter_id");
        audio_apiURL = `http://localhost:5000/api/recitations/${reciter_id_for_api}`;
        fetch(audio_apiURL)
            .then(response => response.json())
            .then(data => {
                    const main_balise = document.querySelector('main');
                    for (let index = 0; index < data.audio_files.length; index++) {
                        const element = data.audio_files[index];
                        const audioElement = document.createElement('audio');
                        const audioUrl = element.audio_url; // Assumant que le premier fichier audio est celui requis
                        audioElement.controls = true;
                        audioElement.src = audioUrl;
                        main_balise.appendChild(audioElement);
                        console.log(data.audio_files.length);
                    }
             })
            .catch(error => {
                console.log("Erreur : ", error);
            });
});


