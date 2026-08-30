document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('#mainNavbar .navbar-toggler');
    const navbarTogglerIcon = navbarToggler ? navbarToggler.querySelector('i') : null;
    const navbarCollapse = document.getElementById('navbarNavContent');
    let bsCollapseInstance = null;

    if (navbarCollapse && navbarToggler) {
        bsCollapseInstance = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });

        if (navbarTogglerIcon) {
            navbarCollapse.addEventListener('show.bs.collapse', function () {
                navbarTogglerIcon.classList.remove('fa-bars');
                navbarTogglerIcon.classList.add('fa-times');
            });
            navbarCollapse.addEventListener('hide.bs.collapse', function () {
                navbarTogglerIcon.classList.remove('fa-times');
                navbarTogglerIcon.classList.add('fa-bars');
            });
        }

        const navLinksAndItems = document.querySelectorAll('#navbarNavContent .nav-link, #navbarNavContent .dropdown-item');

        navLinksAndItems.forEach(link => {
            link.addEventListener('click', (event) => {
                if (
                    getComputedStyle(navbarToggler).display !== 'none' &&
                    navbarCollapse.classList.contains('show') &&
                    !link.classList.contains('dropdown-toggle')
                ) {
                    if (bsCollapseInstance) {
                        bsCollapseInstance.hide();
                    }
                }
            });
        });

        window.addEventListener('scroll', () => {
            if (
                getComputedStyle(navbarToggler).display !== 'none' &&
                navbarCollapse.classList.contains('show')
            ) {
                if (bsCollapseInstance) {
                    bsCollapseInstance.hide();
                }
            }
        });
    }

    // Documenti legali: gli articoli sono <details> chiusi, quindi un link a
    // un'ancora che sta dentro un articolo chiuso (per esempio
    // dpa.html#dpa-allegato1) non porterebbe da nessuna parte. Qui apriamo
    // l'articolo che contiene il bersaglio e ci portiamo sopra la pagina.
    // Se in pagina non ci sono <details>, non fa nulla.
    function apriArticoloDelBersaglio(scorri) {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (!id) { return; }
        let bersaglio = null;
        try { bersaglio = document.getElementById(id); } catch (e) { return; }
        if (!bersaglio) { return; }
        let risalita = bersaglio.closest('details');
        let apertoQualcosa = false;
        while (risalita) {
            if (!risalita.open) { risalita.open = true; apertoQualcosa = true; }
            risalita = risalita.parentElement ? risalita.parentElement.closest('details') : null;
        }
        if (apertoQualcosa && scorri) {
            bersaglio.scrollIntoView();
        }
    }

    if (document.querySelector('details.legal-section')) {
        apriArticoloDelBersaglio(true);
        window.addEventListener('hashchange', function () { apriArticoloDelBersaglio(true); });
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Il pulsante dell'intervista punta dove dice js/config.js. Se il link e' ancora
    // il ripiego '#contact' (sentinella, non c'e' piu' una sezione Contatti) lasciamo
    // l'href scritto nell'HTML (mailto:info@fidai.it); se e' un URL vero lo apriamo
    // in una scheda nuova, cosi' chi torna indietro ritrova la pagina dov'era.
    const bookingUrl = (window.FIDAI_CONFIG && window.FIDAI_CONFIG.BOOKING_URL) || '';
    if (bookingUrl && bookingUrl.charAt(0) !== '#') {
        document.querySelectorAll('[data-booking-link]').forEach((link) => {
            link.setAttribute('href', bookingUrl);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');
        });
    }
});
