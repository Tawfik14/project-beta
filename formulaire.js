document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Récupération des valeurs
    let lastname = document.getElementById("lastname").value.trim();
    let firstname = document.getElementById("firstname").value.trim();
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let email = document.getElementById("email").value.trim();
    let pseudo = document.getElementById("pseudo").value.trim();
    let password = document.getElementById("password").value.trim();

    // Vérification des champs (exemple basique)
    if (lastname === "" || firstname === "" || dob === "" || email === "" || pseudo === "" || password === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Simulation d'envoi (ajout AJAX ou autre backend possible)
    alert("Inscription réussie ! Bienvenue " + pseudo + " !");
});

