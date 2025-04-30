// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {

    // 1. Inizializza AOS (Animate On Scroll)
    // ----------------------------------------
    AOS.init({
        duration: 700, // Durata animazione in ms
        once: true, // Anima solo una volta quando elemento entra in vista
        offset: 50, // Offset (in px) dall'original trigger point
        easing: 'ease-out-cubic', // Tipo di easing
    });


    // 2. Gestione simulata per il form di contatto RIMOSSA
    // ---------------------------------------------------
    // const contactFormApple = document.getElementById('contactFormApple');
    // if (contactFormApple) {
    //     contactFormApple.addEventListener('submit', function(event) {
    //         event.preventDefault(); // <-- RIMOSSO: Ora il form verrà inviato al PHP
    //         // ... logica alert rimossa ...
    //     });
    // }
    // Ora il form verrà gestito dal file specificato nell'attributo "action"


    // 3. Chiude la navbar mobile dopo aver cliccato un link (Apple Style)
    // --------------------------------------------------------------------
    const navLinksApple = document.querySelectorAll('#navbarNavApple .nav-link');
    const navbarTogglerApple = document.querySelector('#mainNavbar .navbar-toggler');
    const navbarCollapseApple = document.getElementById('navbarNavApple');

    if (navbarCollapseApple && navbarTogglerApple) { // Verifica esistenza
        const bsCollapseApple = new bootstrap.Collapse(navbarCollapseApple, {
            toggle: false
        });

        navLinksApple.forEach(link => {
            link.addEventListener('click', () => {
                // Controlla se il toggler è visibile (indica mobile) e se il menu è aperto
                if (getComputedStyle(navbarTogglerApple).display !== 'none' && navbarCollapseApple.classList.contains('show')) {
                    bsCollapseApple.hide();
                }
            });
        });
    }

}); // Fine DOMContentLoaded