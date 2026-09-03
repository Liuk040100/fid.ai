/* js/script.js — tutto il comportamento del sito, in JavaScript puro.
 *
 * Giro 21: via Bootstrap. Qui dentro: interruttore del tema, menu del telefono,
 * ingresso animato della home, sezioni che si accendono allo scorrimento, la
 * conversazione WhatsApp che si scrive da sola, piu' le due cose di sempre
 * (articoli legali aperti dall'ancora, anno corrente, link dell'intervista).
 *
 * Regola di base: se qualcosa non c'e' in pagina, la funzione non fa nulla.
 * E se chi guarda ha chiesto meno movimento (prefers-reduced-motion), tutto
 * appare gia' al suo posto, senza animazione.
 */
(function () {
    'use strict';

    var MENO_MOVIMENTO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --------------------------- Tema chiaro/scuro ------------------------ */
    /* La decisione iniziale la prende lo script in testa a ogni pagina (prima
     * del disegno, per non vedere il lampo bianco). Qui c'e' solo il bottone. */
    function tema() {
        var bottone = document.getElementById('themeToggle');
        if (!bottone) { return; }
        bottone.addEventListener('click', function () {
            var attuale = document.documentElement.getAttribute('data-theme');
            var nuovo = attuale === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nuovo);
            try { localStorage.setItem('fidai:theme', nuovo); } catch (e) { /* niente */ }
            bottone.setAttribute('aria-label', nuovo === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro');
        });
    }

    /* ------------------------------ Menu ---------------------------------- */
    function menu() {
        var bottone = document.querySelector('#mainNavbar .navbar-toggler');
        var pannello = document.getElementById('navbarNavContent');
        if (!bottone || !pannello) { return; }

        function chiudi() {
            pannello.classList.remove('show');
            bottone.setAttribute('aria-expanded', 'false');
        }
        bottone.addEventListener('click', function () {
            var aperto = pannello.classList.toggle('show');
            bottone.setAttribute('aria-expanded', aperto ? 'true' : 'false');
        });
        pannello.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', chiudi);
        });
        window.addEventListener('scroll', function () {
            if (pannello.classList.contains('show')) { chiudi(); }
        }, { passive: true });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { chiudi(); }
        });
    }

    /* --------------------- Sezioni sincronizzate allo scorrimento --------- */
    /* La sezione al centro dello schermo resta piena, le altre si attenuano.
     * E' l'effetto di pi.dev, in versione leggera: solo opacita'. */
    function scrollSync() {
        var contenitore = document.querySelector('.has-scroll-sync');
        if (!contenitore || MENO_MOVIMENTO || !('IntersectionObserver' in window)) { return; }
        var sezioni = contenitore.querySelectorAll('section');
        if (!sezioni.length) { return; }
        var osservatore = new IntersectionObserver(function (voci) {
            voci.forEach(function (voce) {
                voce.target.classList.toggle('is-active', voce.isIntersecting);
            });
        }, { rootMargin: '-25% 0px -25% 0px', threshold: 0 });
        sezioni.forEach(function (s) { osservatore.observe(s); });
        sezioni[0].classList.add('is-active');
    }

    /* --------------- La conversazione WhatsApp che si scrive da sola ------- */
    /* I testi stanno nell'HTML (data-attributi sui messaggi gia' scritti): qui
     * si limita a scoprirli uno alla volta. Con meno movimento, sono gia' tutti
     * visibili e questa funzione esce subito. */
    function demoConversazione() {
        var demo = document.getElementById('heroDemo');
        if (!demo) { return; }
        var messaggi = Array.prototype.slice.call(demo.querySelectorAll('[data-demo-step]'));
        var stato = demo.querySelector('.demo-state');
        var scrivendo = demo.querySelector('.demo-typing-row');

        if (MENO_MOVIMENTO) {
            messaggi.forEach(function (m) { m.classList.add('is-in'); });
            if (scrivendo) { scrivendo.remove(); }
            if (stato) { stato.textContent = 'appuntamento fissato'; }
            return;
        }

        messaggi.forEach(function (m) { m.classList.remove('is-in'); });
        if (scrivendo) { scrivendo.style.display = 'none'; }

        var i = 0;
        function passo() {
            if (i >= messaggi.length) {
                if (stato) { stato.textContent = 'appuntamento fissato'; }
                return;
            }
            var msg = messaggi[i];
            var nostro = msg.classList.contains('from-us');
            var attesa = parseInt(msg.getAttribute('data-demo-wait') || '900', 10);

            function mostra() {
                if (scrivendo) { scrivendo.style.display = 'none'; }
                msg.classList.add('is-in');
                if (stato) { stato.textContent = nostro ? 'online' : 'nuovo messaggio'; }
                i += 1;
                setTimeout(passo, attesa);
            }

            if (nostro && scrivendo) {
                scrivendo.style.display = '';
                if (stato) { stato.textContent = 'sta scrivendo…'; }
                setTimeout(mostra, 1100);
            } else {
                mostra();
            }
        }
        setTimeout(passo, 1200);
    }

    /* ------------- Articoli legali: apri quello puntato dall'ancora -------- */
    function apriArticoloDelBersaglio(scorri) {
        var id = decodeURIComponent(window.location.hash.slice(1));
        if (!id) { return; }
        var bersaglio = null;
        try { bersaglio = document.getElementById(id); } catch (e) { return; }
        if (!bersaglio) { return; }
        var risalita = bersaglio.closest('details');
        var apertoQualcosa = false;
        while (risalita) {
            if (!risalita.open) { risalita.open = true; apertoQualcosa = true; }
            risalita = risalita.parentElement ? risalita.parentElement.closest('details') : null;
        }
        if (apertoQualcosa && scorri) { bersaglio.scrollIntoView(); }
    }

    /* ---------------------------- Cose minute ----------------------------- */
    function annoCorrente() {
        var span = document.getElementById('currentYear');
        if (span) { span.textContent = new Date().getFullYear(); }
    }

    /* Il pulsante dell'intervista punta dove dice js/config.js. Se il link e'
     * ancora il ripiego '#contact' (sentinella) resta l'href scritto nell'HTML. */
    function linkIntervista() {
        var url = (window.FIDAI_CONFIG && window.FIDAI_CONFIG.BOOKING_URL) || '';
        if (!url || url.charAt(0) === '#') { return; }
        document.querySelectorAll('[data-booking-link]').forEach(function (link) {
            link.setAttribute('href', url);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        tema();
        menu();
        scrollSync();
        demoConversazione();
        if (document.querySelector('details.legal-section')) {
            apriArticoloDelBersaglio(true);
            window.addEventListener('hashchange', function () { apriArticoloDelBersaglio(true); });
        }
        annoCorrente();
        linkIntervista();
    });
})();
