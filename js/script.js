document.addEventListener('DOMContentLoaded', function() {
    // AOS lo carica solo chi ha qualcosa da far comparire scorrendo: il
    // questionario no, e senza questa guardia il ReferenceError fermerebbe
    // tutto il resto del file (anno nel footer, link dell'intervista).
    if (window.AOS) {
        AOS.init({
            duration: 700,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }

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

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Il pulsante dell'intervista punta dove dice js/config.js. Se il link e' ancora
    // il ripiego '#contact' lasciamo l'ancora del documento (scorre in fondo alla
    // home); se e' un URL vero lo apriamo in una scheda nuova, cosi' chi torna
    // indietro ritrova la pagina dov'era.
    const bookingUrl = (window.FIDAI_CONFIG && window.FIDAI_CONFIG.BOOKING_URL) || '';
    if (bookingUrl && bookingUrl.charAt(0) !== '#') {
        document.querySelectorAll('[data-booking-link]').forEach((link) => {
            link.setAttribute('href', bookingUrl);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');
        });
    }
});
