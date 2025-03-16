document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const jsonData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'inscription");
        }

        const result = await response.json();
        if (result.redirect) {
            window.location.href = result.redirect;  // Redirection après inscription
        }
    } catch (error) {
        alert(error.message);
    }
});

