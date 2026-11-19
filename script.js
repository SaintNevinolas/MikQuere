document.addEventListener("DOMContentLoaded", () => {
    //Animation d'apparition des éléments .reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    document.querySelectorAll(".reveal").forEach(element => {
        observer.observe(element);
    });
    //Gestion de l'ouverture de mail du formulaire
    const form = document.getElementById("ContactForm");
    if (!form) {
        console.error("Formulaire ContactForm introuvable !");
        return;
    }
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        // Récupération des valeurs
        const name = document.getElementById("name").value;
        const company = document.getElementById("company").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        // Construction du contenu du mail
        const body = `
        Nom : ${name}
        Société : ${company}
        Email : ${email}
        Téléphone : ${phone}
        Adresse : ${address}
        Message :
        ${message}`;
        // Construction du lien mailto
        const mailto = `mailto:contact@test.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // Ouverture de l'application mail
        window.location.href = mailto;
    });
});