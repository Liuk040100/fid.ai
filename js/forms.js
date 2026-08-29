/* js/forms.js — i due moduli del sito che scrivono sulla VPS.
 *
 * Il sito è statico su GitHub Pages: non ha un backend suo. Fino a oggi il modulo
 * di contatto postava a uno script server che lì non esiste — nessun contatto è
 * mai arrivato. Adesso i dati vanno alle due rotte pubbliche del backend fid.ai
 * (run 160), via fetch, in JSON:
 *
 *     POST <API_BASE>/survey     le risposte del questionario di validazione
 *     POST <API_BASE>/waitlist   l'iscrizione alla lista d'attesa del pilota
 *
 * Una regola sopra tutte: LA PAGINA NON SI RICARICA MAI. Chi ha appena risposto a
 * sedici domande e vede la pagina ricaricarsi ha perso tre minuti di lavoro e non
 * ricomincia. Per questo i moduli non hanno `action`, il submit è sempre bloccato
 * con preventDefault, e ogni errore — di rete, del server o di compilazione —
 * finisce in un riquadro accanto al pulsante, con le risposte ancora al loro posto.
 */
(function () {
    'use strict';

    var CONFIG = window.FIDAI_CONFIG || {};
    var API_BASE = CONFIG.API_BASE || '';

    var MSG = {
        rete: 'Non siamo riusciti a raggiungere il server. Controlla la connessione e riprova: '
            + 'le tue risposte sono ancora qui, non le hai perse.',
        server: 'Qualcosa non ha funzionato dalla nostra parte. Riprova fra qualche minuto, oppure '
            + 'scrivici a info@fidai.it: ci dispiace.',
        troppi: 'Abbiamo già ricevuto diversi invii da questo collegamento. Riprova fra un\'ora.',
        invio: 'Invio in corso…',
    };

    /* ------------------------------ il riquadro ------------------------------ */

    function mostra(box, testo, tipo) {
        if (!box) return;
        box.textContent = testo;
        box.className = 'form-feedback is-visible ' + (tipo === 'ok' ? 'is-ok' : 'is-error');
    }

    function nascondi(box) {
        if (!box) return;
        box.textContent = '';
        box.className = 'form-feedback';
    }

    /* -------------------------------- l'invio -------------------------------- */

    /* Un solo posto in cui si parla col server, per tutti e due i moduli.
     * 201 e 204 sono entrambi «è andata»: il 204 è la risposta muta all'esca dei
     * bot, e un bot non deve capire di essere stato riconosciuto. */
    function invia(percorso, payload, bottone, box) {
        if (!API_BASE) {
            mostra(box, MSG.server, 'errore');
            return;
        }
        var etichetta = bottone ? bottone.textContent : '';
        if (bottone) {
            bottone.disabled = true;
            bottone.textContent = MSG.invio;
        }
        nascondi(box);

        function sblocca() {
            if (bottone) {
                bottone.disabled = false;
                bottone.textContent = etichetta;
            }
        }

        fetch(API_BASE + percorso, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(function (res) {
            if (res.status === 201 || res.status === 204) {
                window.location.assign('thankyou.html');
                return null;
            }
            if (res.status === 429) {
                sblocca();
                mostra(box, MSG.troppi, 'errore');
                return null;
            }
            if (res.status === 400) {
                return res.json().then(function (corpo) {
                    sblocca();
                    /* Il backend risponde { success, error, issues: [{path, message}] }.
                     * Il messaggio utile è quello della prima issue — è già in italiano,
                     * scritto per essere letto da chi compila: «Indirizzo e-mail non
                     * valido», «Per inviare il modulo devi accettare l'informativa». */
                    var testo = (corpo && corpo.issues && corpo.issues[0] && corpo.issues[0].message)
                        || (corpo && corpo.error) || MSG.server;
                    mostra(box, testo, 'errore');
                }).catch(function () {
                    sblocca();
                    mostra(box, MSG.server, 'errore');
                });
            }
            sblocca();
            mostra(box, MSG.server, 'errore');
            return null;
        }).catch(function () {
            /* Rete assente, DNS, CORS, server spento: da qui non si distinguono, e
             * per chi compila sono la stessa cosa. Le risposte restano nel modulo. */
            sblocca();
            mostra(box, MSG.rete, 'errore');
        });
    }

    function valore(form, nome) {
        var campo = form.elements[nome];
        return campo && typeof campo.value === 'string' ? campo.value.trim() : '';
    }

    /* Lo stesso controllo che fa il server, fatto prima: un errore di battitura non
     * merita un giro sulla rete. Non sostituisce quello del server, lo anticipa. */
    function emailPlausibile(valore) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valore);
    }

    /* --------------------- 1. Il modulo della lista d'attesa ------------------ */

    function collegaListaAttesa() {
        var form = document.getElementById('waitlistForm');
        if (!form) return;
        var box = document.getElementById('waitlistFeedback');
        var bottone = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', function (evento) {
            evento.preventDefault();

            var nome = valore(form, 'name');
            var email = valore(form, 'email');
            var telefono = valore(form, 'phone');
            var categoria = valore(form, 'category');
            var consenso = form.elements.consent && form.elements.consent.checked;

            if (nome.length < 2) return mostra(box, 'Scrivi il tuo nome.', 'errore');
            if (!emailPlausibile(email)) return mostra(box, 'Controlla l\'indirizzo email: non sembra valido.', 'errore');
            if (!categoria) return mostra(box, 'Scegli il tipo di attività che gestisci.', 'errore');
            if (!consenso) {
                return mostra(box, 'Per inviare il modulo devi accettare l\'informativa sulla privacy.', 'errore');
            }

            var payload = {
                name: nome,
                email: email,
                category: categoria,
                consent: true,
                source: 'index.html#lista-attesa',
                website: valore(form, 'website'),
            };
            if (telefono) payload.phone = telefono;

            invia('/waitlist', payload, bottone, box);
        });
    }

    /* ------------------------ 2. Il questionario a passi ---------------------- */

    /* Le domande non sono scritte qui: stanno nell'HTML, ognuna in un `.q-item`
     * che dichiara il proprio numero (`data-question`). Così cambiare una domanda
     * è una modifica a `questionario.html` e basta, e il numero che finisce nella
     * colonna JSONB del database resta quello del questionario originale. */

    function rispostaDi(item) {
        var numero = item.getAttribute('data-question');
        var caselle = item.querySelectorAll('input[type="checkbox"]');
        var scelte = item.querySelectorAll('input[type="radio"]');
        var libero = item.querySelector('textarea, input[type="text"].q-free');

        function conAltro(input) {
            /* «Altro: ____» è una scelta più un testo. Se il testo c'è lo attacchiamo
             * alla scelta, così nel database resta leggibile senza una join mentale. */
            var valoreScelta = input.value;
            if (input.hasAttribute('data-other')) {
                var testo = item.querySelector('.q-other-text');
                var scritto = testo ? testo.value.trim() : '';
                if (scritto) return valoreScelta + ': ' + scritto;
            }
            return valoreScelta;
        }

        if (caselle.length) {
            var elenco = [];
            Array.prototype.forEach.call(caselle, function (c) {
                if (c.checked) elenco.push(conAltro(c));
            });
            return { numero: numero, valore: elenco.length ? elenco : null };
        }
        if (scelte.length) {
            var scelta = null;
            Array.prototype.forEach.call(scelte, function (r) {
                if (r.checked) scelta = conAltro(r);
            });
            return { numero: numero, valore: scelta };
        }
        if (libero) {
            var testoLibero = libero.value.trim();
            return { numero: numero, valore: testoLibero || null };
        }
        return { numero: numero, valore: null };
    }

    function segnalaDomanda(item, testo) {
        var errore = item.querySelector('.q-error');
        if (!errore) return;
        errore.textContent = testo;
        errore.classList.add('is-visible');
    }

    function pulisciDomanda(item) {
        var errore = item.querySelector('.q-error');
        if (!errore) return;
        errore.textContent = '';
        errore.classList.remove('is-visible');
    }

    function convalidaPasso(passo) {
        var primoErrore = null;
        var items = passo.querySelectorAll('.q-item');
        Array.prototype.forEach.call(items, function (item) {
            pulisciDomanda(item);
            if (item.getAttribute('data-required') !== 'true') return;
            var risposta = rispostaDi(item);
            var massimo = parseInt(item.getAttribute('data-max') || '0', 10);
            if (!risposta.valore) {
                segnalaDomanda(item, 'Rispondi a questa domanda per andare avanti.');
                if (!primoErrore) primoErrore = item;
            } else if (massimo && Array.isArray(risposta.valore) && risposta.valore.length > massimo) {
                segnalaDomanda(item, 'Puoi selezionare al massimo ' + massimo + ' risposte.');
                if (!primoErrore) primoErrore = item;
            }
        });
        if (primoErrore) {
            primoErrore.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
        return true;
    }

    function collegaQuestionario() {
        var form = document.getElementById('questionarioForm');
        if (!form) return;

        var box = document.getElementById('questionarioFeedback');
        var bottone = form.querySelector('button[type="submit"]');
        var passi = form.querySelectorAll('.q-step');
        var barra = document.getElementById('qProgressBar');
        var etichetta = document.getElementById('qProgressLabel');
        var totale = passi.length;
        var corrente = 0;

        function disegna() {
            Array.prototype.forEach.call(passi, function (passo, indice) {
                passo.hidden = indice !== corrente;
            });
            if (barra) {
                var percentuale = Math.round(((corrente + 1) / totale) * 100);
                barra.style.width = percentuale + '%';
                barra.setAttribute('aria-valuenow', String(percentuale));
            }
            if (etichetta) etichetta.textContent = 'Sezione ' + (corrente + 1) + ' di ' + totale;
            nascondi(box);
        }

        function vaiA(indice) {
            corrente = Math.max(0, Math.min(totale - 1, indice));
            disegna();
            var testa = document.getElementById('questionarioTop');
            if (testa) testa.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        form.addEventListener('click', function (evento) {
            var avanti = evento.target.closest('[data-step-next]');
            if (avanti) {
                evento.preventDefault();
                if (convalidaPasso(passi[corrente])) vaiA(corrente + 1);
                return;
            }
            var indietro = evento.target.closest('[data-step-prev]');
            if (indietro) {
                evento.preventDefault();
                vaiA(corrente - 1);
            }
        });

        /* Selezionare «Altro» accende il campo di testo che gli sta accanto, e
         * sceglierne un'altra lo spegne: un campo attivo ma irrilevante confonde. */
        form.addEventListener('change', function (evento) {
            var item = evento.target.closest('.q-item');
            if (!item) return;
            var testo = item.querySelector('.q-other-text');
            if (!testo) return;
            var altro = item.querySelector('[data-other]');
            var acceso = altro && altro.checked;
            testo.disabled = !acceso;
            if (!acceso) testo.value = '';
        });

        form.addEventListener('submit', function (evento) {
            evento.preventDefault();
            if (!convalidaPasso(passi[corrente])) return;

            var risposte = {};
            Array.prototype.forEach.call(form.querySelectorAll('.q-item'), function (item) {
                var r = rispostaDi(item);
                if (r.valore) risposte[r.numero] = r.valore;
            });

            if (!Object.keys(risposte).length) {
                mostra(box, 'Il questionario è vuoto: rispondi ad almeno una domanda.', 'errore');
                return;
            }
            if (!(form.elements.consent && form.elements.consent.checked)) {
                mostra(box, 'Per inviare il questionario devi accettare l\'informativa sulla privacy.', 'errore');
                return;
            }
            var email = valore(form, 'email');
            if (email && !emailPlausibile(email)) {
                mostra(box, 'Controlla l\'indirizzo email, oppure lascialo vuoto: è facoltativo.', 'errore');
                return;
            }

            var payload = {
                answers: risposte,
                consent: true,
                source: 'questionario.html',
                website: valore(form, 'website'),
            };
            if (email) payload.email = email;

            invia('/survey', payload, bottone, box);
        });

        disegna();
    }

    document.addEventListener('DOMContentLoaded', function () {
        collegaListaAttesa();
        collegaQuestionario();
    });
}());
