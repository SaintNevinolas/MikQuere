
document.addEventListener("DOMContentLoaded", () => {

    // Animation d'apparition des éléments .reveal
    const revealElements = document.querySelectorAll(".reveal");
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
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // DIAGNOSTIC DES DÉBORDEMENTS HORIZONTAUX
    function detectOverflow() {
        const screenWidth = document.documentElement.clientWidth;

        document.querySelectorAll("body *").forEach(element => {
            const rect = element.getBoundingClientRect();

            if (rect.right > screenWidth + 1) {
                console.log("Élément qui dépasse :", element, {
                    gauche: rect.left,
                    droite: rect.right,
                    largeur: rect.width,
                    largeurEcran: screenWidth
                });
            }
        });
    }

    // Attendre la fin des animations de tous les éléments .reveal
    Promise.all(
        [...revealElements].map(element =>
            Promise.all(
                element.getAnimations().map(animation =>
                    animation.finished.catch(() => {})
                )
            )
        )
    ).then(() => {
        console.log(document.documentElement.clientWidth);
        detectOverflow();
    });

    const subject = document.getElementById('subject');
    const champ_destination = document.getElementById('champ_destination');
    const champ_enlevement = document.getElementById('champ_enlevement');
    const destination = document.getElementById('destination');
    const enlevement = document.getElementById('enlevement');
    subject.addEventListener('change',function(){
        console.log(this.value)
        if(this.value!="candidature"){
            Array.from(champ_destination.children).forEach(element=>{
                element.hidden = false;
            })
            Array.from(champ_enlevement.children).forEach(element=>{
                element.hidden = false;
            })
            enlevement.required = true;
            destination.required = true;
        }else{
            Array.from(champ_destination.children).forEach(element=>{
                element.hidden = true;
            })
            Array.from(champ_enlevement.children).forEach(element=>{
                element.hidden = true;
            })
            enlevement.required = false;
            destination.required = false;
        }
    });

    // Gestion de l'ouverture de mail du formulaire
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
    //Gestion du menu mobile
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    hamburger.addEventListener('click', function (event) {
        event.stopPropagation();
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    function closeMenu(){
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    };
    nav.querySelectorAll('a').forEach(link=>{
        link.addEventListener('click',closeMenu);
    });
    document.addEventListener('click',function(event){
        if(!nav.contains(event.target)&&!hamburger.contains(event.target)){
            closeMenu();
        }
    })
    window.addEventListener('scroll',closeMenu);
});
