// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {

    // 1. Inizializza AOS (Animate On Scroll)
    AOS.init({
        duration: 700,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
    });

    // 2. Chiude la navbar mobile dopo aver cliccato un link
    // Seleziona sia i link diretti che gli item dei dropdown dentro la navbar collassabile
    const navLinksAndItems = document.querySelectorAll('#navbarNavContent .nav-link, #navbarNavContent .dropdown-item');
    const navbarToggler = document.querySelector('#mainNavbar .navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNavContent');

    if (navbarCollapse && navbarToggler) {
        // Ottieni l'istanza Collapse di Bootstrap per controllare il menu programmaticamente
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false // Non apre/chiude all'inizializzazione
        });

        navLinksAndItems.forEach(link => {
            link.addEventListener('click', () => {
                // Controlla se il toggler è visibile (indica che siamo in visualizzazione mobile)
                // e se il menu è effettivamente aperto (ha la classe 'show')
                if (getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide(); // Chiude il menu usando il metodo di Bootstrap
                }
            });
        });
    }

    // 3. Aggiorna l'anno corrente nel footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // Fine DOMContentLoaded