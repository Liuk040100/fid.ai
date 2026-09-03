/* js/script.js — tutto il comportamento del sito, in JavaScript puro.
 *
 * Giro 23: la comparsa allo scorrimento prende il posto delle sezioni che si
 * attenuavano. Qui dentro: interruttore del tema, menu del telefono, ingresso
 * animato della home, comparsa progressiva di titoli/schermate/schede, la
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

    /* --------------------- Comparsa allo scorrimento ---------------------- */
    /* Ogni pezzo di pagina entra quando lo si raggiunge, una volta sola, e in
     * modo diverso a seconda di cosa e': i titoli riga per riga, le schermate
     * che «si posano», le schede a cascata, le etichette monospace che si
     * digitano, i fili che si disegnano da sinistra.
     *
     * Il vestito sta nel CSS (data-reveal + classe .is-in): qui si osserva e
     * basta. La classe «rv» sulla radice la mette lo script in testa alla
     * pagina — se non c'e' (niente JavaScript, niente IntersectionObserver,
     * oppure «meno movimento») nulla e' nascosto e questa funzione esce. */
    var PASSO_CASCATA_MAX = 8;   /* oltre l'ottava scheda il ritardo non cresce */

    /* I titoli si spezzano nelle righe che il browser ha gia' calcolato: si
     * avvolge parola per parola, si guarda a che altezza sta ogni parola e si
     * rimettono insieme i gruppi. Solo su titoli di solo testo. */
    function spezzaInRighe(el) {
        if (el.children.length) { return false; }
        var testo = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (!testo) { return false; }

        var parole = testo.split(' ');
        var segni = [];
        el.textContent = '';
        parole.forEach(function (parola, i) {
            var span = document.createElement('span');
            span.textContent = parola;
            el.appendChild(span);
            segni.push(span);
            if (i < parole.length - 1) { el.appendChild(document.createTextNode(' ')); }
        });

        var righe = [];
        var altezza = null;
        segni.forEach(function (span) {
            var t = span.offsetTop;
            if (altezza === null || Math.abs(t - altezza) > 2) { righe.push([]); altezza = t; }
            righe[righe.length - 1].push(span.textContent);
        });

        el.textContent = '';
        righe.forEach(function (gruppo, i) {
            var riga = document.createElement('span');
            riga.className = 'rv-line';
            riga.style.setProperty('--rv-i', i);
            riga.textContent = gruppo.join(' ');
            el.appendChild(riga);
        });
        return true;
    }

    /* Macchina da scrivere breve: al massimo ~600 ms in tutto, spazio gia'
     * riservato prima di svuotare il testo cosi' niente si sposta. */
    function digita(el) {
        var testo = el.textContent;
        if (!testo) { return; }
        var largo = el.getBoundingClientRect().width;
        if (largo) { el.style.minWidth = Math.ceil(largo) + 'px'; }
        var attesa = Math.min(70, Math.max(18, Math.round(600 / testo.length)));
        var i = 0;
        el.textContent = '';
        el.classList.add('is-typing');
        (function passo() {
            i += 1;
            el.textContent = testo.slice(0, i);
            if (i < testo.length) {
                setTimeout(passo, attesa);
            } else {
                el.classList.remove('is-typing');
                el.style.minWidth = '';
            }
        })();
    }

    function comparsa() {
        if (!document.documentElement.classList.contains('rv')) { return; }
        var elementi = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
        if (!elementi.length) { return; }

        elementi.forEach(function (el) {
            var tipo = el.getAttribute('data-reveal');
            if (tipo === 'lines') {
                if (!spezzaInRighe(el)) { el.setAttribute('data-reveal', 'up'); }
            } else if (tipo === 'cascade') {
                Array.prototype.forEach.call(el.children, function (figlio, i) {
                    figlio.style.setProperty('--rv-i', Math.min(i, PASSO_CASCATA_MAX));
                });
            }
        });

        var osservatore = new IntersectionObserver(function (voci) {
            voci.forEach(function (voce) {
                if (!voce.isIntersecting) { return; }
                var el = voce.target;
                osservatore.unobserve(el);
                if (el.getAttribute('data-reveal') === 'type') { digita(el); }
                el.classList.add('is-in');
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });

        elementi.forEach(function (el) { osservatore.observe(el); });
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
        comparsa();
        demoConversazione();
        if (document.querySelector('details.legal-section')) {
            apriArticoloDelBersaglio(true);
            window.addEventListener('hashchange', function () { apriArticoloDelBersaglio(true); });
        }
        annoCorrente();
        linkIntervista();
    });
})();
