document.getElementById("registration-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    let lastname = document.getElementById("lastname").value.trim();
    let firstname = document.getElementById("firstname").value.trim();
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let email = document.getElementById("email").value.trim();
    let pseudo = document.getElementById("pseudo").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();

    // Vérification des mots de passe
    if (password !== confirmPassword) {
        document.getElementById("error-message").style.display = "block";
        return;
    }

    // Envoi des données au serveur
    try {
        let response = await fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lastname,
                firstname,
                dob,
                gender,
                email,
                pseudo,
                password
            })
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'inscription.");
        }

        let data = await response.json();
        alert("Inscription réussie !");

        // ✅ Redirection vers la page de confirmation
        window.location.href = "confirmation.html";
    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de l'inscription.");
    }
});

