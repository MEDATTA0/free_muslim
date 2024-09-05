
document.addEventListener("DOMContentLoaded", () => {
    
    const url = `http://localhost:5000/posts/${id}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        
    })
    
});





const pray_btn = document.getElementById('pray-btn');

pray_btn.addEventListener("click", function () {
     
    console.log(FormattedDate);
});