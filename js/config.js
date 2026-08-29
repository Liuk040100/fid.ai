/* js/config.js — le due cose del sito che cambiano senza toccare il codice.
 *
 * Il sito è statico su GitHub Pages: non c'è un file di ambiente, non c'è una build.
 * Quindi le poche cose configurabili stanno qui, in chiaro, e si modificano con una
 * pull request di due righe. Niente segreti: qui dentro ci può stare solo roba che
 * un visitatore può leggere comunque guardando il sorgente della pagina.
 */
window.FIDAI_CONFIG = {
    /* Dove porta il pulsante «Prenota l'intervista».
     *
     * È un LINK ESTERNO (Cal.com, Calendly, Google Appointment Schedule…), non un
     * calendario scritto dentro il sito: un calendario vero vuole slot, fusi orari,
     * disdette e una sincronia con l'agenda di chi riceve — tutta roba che qui non
     * possiamo tenere aggiornata.
     *
     * Finché resta '#contact' il pulsante scende al blocco contatti in fondo alla
     * home, che è un ripiego onesto (si scrive una mail e si fissa l'orario a mano)
     * ma non è la versione buona: va sostituito con l'URL vero appena esiste. */
    BOOKING_URL: '#contact',

    /* Le due porte pubbliche sulla VPS (run 160):
     *   POST <API_BASE>/survey     le risposte del questionario
     *   POST <API_BASE>/waitlist   l'iscrizione alla lista d'attesa
     * Rispondono solo con LANDING_FORMS_ENABLED acceso: finché è spento
     * tornano 404 e i moduli mostrano il messaggio di errore. */
    API_BASE: 'https://api.fidai.it/public/landing',
};
