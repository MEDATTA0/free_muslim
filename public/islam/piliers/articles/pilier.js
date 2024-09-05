// Ici on envoie 1 requête pour récupérer les données selon l'id, depuis la table "posts"
//  de la base de données "free_muslim"

document.addEventListener("DOMContentLoaded", () => {
    const params = URLSearchParams(window.location.search)
    // L'id_pilier est l'id du post dans la base de données
    // On le nomme id_pilier pour plus de clarification
    const id_pilier = params.get('post_id')
    const post_url = `http://localhost:5000/post/${id_pilier}`;
    fetch(post_url)
    .then(response => response.json())
    .then(data => {
        const post_Div = document.getElementById("post");
        post_Div.innerHTML = `
        <h1> ${data[0].title} </h1>
        <p> ${data[0].content} </p>
        <h3> Created at : ${data[0].created_at} </h3>
        <h3> Updated at : ${data[0].updated_at} </h3>
        `;
    })
    .catch(error => {
        console.log("Erreur : ", error);
    })

    // Si id_pilier=1 donc, on ajoute un boutton pour afficher les horaires de prières
    // au cas où l'utilisateur clique sur le boutton 
    if (id_pilier == 1) {
        pray_btn = document.createElement('button');
        pray_btn.addEventListener("click", displayPray_time())
    }

});

function displayPray_time() {
    // Obtenir la date au format DD-MM-YYYY      
    const today = new Date;
    let day = String(today.getDate()).padStart(2, '0'); //Ajoute un '0' si le jour est à un chiffre
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajouter +1
    let year = today.getFullYear();
    // On formate la date sous format DD-MM-YYYY pour l'envoyer à l'api de AlAdhan
    let FormattedDate = day + '-' + month + '-' + year;
    
    const Location_apiURL = `http://localhost:5000/api/location`;
    fetch(Location_apiURL)
        .then(response => response.json())
        .then(Location_response => {
            
            // On récupère la ville et le pays
            const city = Location_response.city;
            const country = Location_response.country;

            // On les insère dans la prochaine requête pour les horaires de prière
            const apiURL = `http://localhost:5000/api/prayerTime/${city}/${country}`;
            fetch(apiURL)
            .then(response => response.json())  // Convertir la réponse en JSON
            .then(prayerData => {
                // Afficher les horaires de prière
                const prayBox_Div = document.getElementById('pray-box');
                prayBox_Div.innerHTML = `
                <h2>
                    <table>
                        <tr>
                            <td> Ville : </td>
                            <td> ${city} </td>
                        </tr>
                        <tr>
                            <td> Pays : </td>
                            <td> ${country} </td>
                        </td>
                        <tr>
                    </table>

                    <table>
                        <th>
                            <tr>
                                <td> Prières </td>
                                <td> Horaires </td> 
                            </tr>
                        <tr>
                            <td> Fajr : </td>
                            <td> ${prayerData.data.timings.Fajr} </td>
                        </tr>
                        <tr>
                            <td> Dhuhr : </td>
                            <td> ${prayerData.data.timings.Dhuhr} </td>
                        </td>
                        <tr>
                            <td> Asr : </td>
                            <td> ${prayerData.data.timings.Asr} </td>
                        </tr>
                        <tr>
                            <td> Maghrib : </td>
                            <td> ${prayerData.data.timings.Maghrib}</td>
                        </tr>
                        <tr>
                            <td> Ishaa : </td>
                            <td> ${prayerData.data.timings.Isha} </td>
                        </tr>
            `;
            })
            .catch(error => {
            console.error("Erreur lors de la requête :", error);
        });
    })
    .catch(error => {
        console.log("Erreur lors de la requête de localisation : ", error);
    });

    console.log(FormattedDate);
}