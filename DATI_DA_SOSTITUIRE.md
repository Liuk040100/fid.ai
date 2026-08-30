# Dati da sostituire prima di pubblicare

I tre documenti legali di questo sito contengono **12 segnaposto** nella forma `[[COSÌ]]`: sono i dati
che oggi non ci sono, e che deve mettere chi si assume la responsabilità dei documenti. Finché restano
`[[…]]`, chi legge il sito vede che manca un dato — invece di leggere un dato inventato e crederlo vero
(fino al 29/08/2026 i documenti dicevano «fid.ai S.r.l.» e una partita IVA, `IT01234567890`, che non
esiste).

Accanto a ogni segnaposto, **nel codice della pagina**, c'è un commento `<!-- DA-SOSTITUIRE: ... -->` che
ripete cosa metterci. Il commento non si vede nella pagina pubblicata: si vede solo aprendo il file.
Quando sostituisci il valore, **cancella anche il commento**.

Elenco verificato e riallineato il 29/08/2026 (giro 05, `grep -n '\[\['`). Le righe si sono spostate
all'indietro perché in quel giro i fogli di stile ricopiati dentro le tre pagine legali sono stati
spostati una volta per tutte in `css/style.css`: il testo dei documenti non è cambiato di una virgola.
Il totale resta 12: nessun segnaposto è stato aggiunto o tolto. I numeri di riga valgono a oggi: se non
tornano più, cerca il testo fra le doppie parentesi quadre, non la riga.

## Come si sostituisce, dall'editor di GitHub

1. Apri il file su GitHub (per esempio `legal/informativa-privacy.html`) e clicca l'icona della matita in
   alto a destra, «Edit this file».
2. Cerca `[[` nel testo (Ctrl+F, o Cmd+F sul Mac). Sostituisci **tutto quello che sta fra `[[` e `]]`,
   parentesi comprese**, con il valore vero; poi cancella il commento `<!-- DA-SOSTITUIRE: ... -->` che
   segue subito dopo, spazio compreso.
3. Scorri in fondo alla pagina e premi il bottone verde «Commit changes». Il sito si aggiorna da solo in
   un paio di minuti; ricarica la pagina tenendo premuto Maiuscolo se vedi ancora la versione vecchia.

Lo stesso dato va sostituito **in tutti i punti in cui compare**: sono tre file. Finito il giro, la
ricerca di `[[` su GitHub non deve trovare più niente.

## I segnaposto, uno per uno

| # | File | Riga | Dove sta, nella pagina | Segnaposto (da sostituire per intero, parentesi comprese) | Cosa metterci |
|---|------|-----:|------------------------|-----------------------------------------------------------|---------------|
| 1 | `legal/dpa.html` | 96 | Intestazione del DPA: chi è il «responsabile del trattamento» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 2 | `legal/dpa.html` | 96 | Intestazione del DPA: chi è il «responsabile del trattamento» | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 3 | `legal/dpa.html` | 96 | Intestazione del DPA: chi è il «responsabile del trattamento» | `[[P.IVA O CODICE FISCALE — oggi IT01234567890, valore di prova]]` | La partita IVA vera, se c'è; altrimenti il codice fiscale della persona fisica. `IT01234567890` è un numero di prova: non esiste e non va lasciato. |
| 4 | `legal/informativa-privacy.html` | 137 | Informativa, § 1 «Introduzione» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 5 | `legal/informativa-privacy.html` | 149 | Informativa, § 2 «Titolare del trattamento» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 6 | `legal/informativa-privacy.html` | 150 | Informativa, § 2 «Titolare del trattamento» | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 7 | `legal/informativa-privacy.html` | 151 | Informativa, § 2 «Titolare del trattamento» | `[[P.IVA O CODICE FISCALE — oggi IT01234567890, valore di prova]]` | La partita IVA vera, se c'è; altrimenti il codice fiscale della persona fisica. `IT01234567890` è un numero di prova: non esiste e non va lasciato. |
| 8 | `legal/informativa-privacy.html` | 283 | Informativa, § 13 «Contatti» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 9 | `legal/informativa-privacy.html` | 284 | Informativa, § 13 «Contatti» | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 10 | `legal/termini-di-servizio.html` | 79 | Preambolo dei termini, sotto «Chi offre il servizio» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 11 | `legal/termini-di-servizio.html` | 79 | Preambolo dei termini, sotto «Chi offre il servizio» | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 12 | `legal/termini-di-servizio.html` | 79 | Preambolo dei termini, sotto «Chi offre il servizio» | `[[P.IVA O CODICE FISCALE — oggi IT01234567890, valore di prova]]` | La partita IVA vera, se c'è; altrimenti il codice fiscale della persona fisica. `IT01234567890` è un numero di prova: non esiste e non va lasciato. |

## Non sono segnaposto, ma vanno decisi lo stesso

Queste cose non hanno le doppie parentesi quadre perché oggi un valore ce l'hanno, ed è un valore che
funziona. Restano da confermare:

- **`info@fidai.it`** è l'indirizzo di contatto di tutti e tre i documenti (prima l'informativa privacy
  ne aveva un altro, `privacy@fid.ai`, su un dominio che non è nostro: la posta sarebbe rimbalzata). Se
  in futuro apri una casella dedicata alle richieste privacy, o una PEC, vanno aggiunte qui.
- **«Torino (Italia)»** è scritto accanto a ogni segnaposto di indirizzo e nel piè di pagina di tutte le
  pagine. Se la città cambia, va cambiata anche lì.
- **Informativa privacy e Termini di servizio sono indicizzabili** dal giro 05 del 29/08/2026: prima
  portavano `noindex, nofollow` e nessun motore poteva raggiungerli. Chi verifica l'app (Google, per
  l'accesso al Calendar) deve poter arrivare all'informativa da una ricerca, non solo dal link nel piè
  di pagina. Il DPA resta `noindex` perché è un allegato contrattuale, non una pagina da cercare.
- **I fornitori elencati** nell'informativa (§ 6) e nel DPA (Allegato 2) sono già allineati a quelli
  realmente in uso (OVH per l'hosting, OpenAI per i modelli linguistici, Google per il Calendar) dal
  giro 02 del 29/08/2026. I vecchi riferimenti a Twilio nei Termini di Servizio sono stati rimossi nel
  giro 04, stessa data (voce 2): non restano più menzioni di AWS/Twilio/SendGrid/Zendesk in nessuno dei
  tre documenti. Resta un punto da decidere: **Stripe**, il processore dei pagamenti, oggi compare solo
  nei Termini di Servizio (§ 6.2) e non nell'elenco dei sub-responsabili di informativa e DPA — verificare
  se vada aggiunto anche lì.

## I link legali, pagina per pagina

Ogni pagina del sito deve portare ai tre documenti: è il modo in cui un visitatore (e chi verifica
l'app, per esempio Google) li trova senza cercarli.

| Pagina | Termini | Privacy | DPA |
|--------|:-------:|:-------:|:---:|
| `index.html` | sì | sì | sì |
| `lista-attesa.html` | sì | sì | sì |
| `prezzi.html` | sì | sì | sì |
| `questionario.html` | sì | sì | sì |
| `thankyou.html` | **no** | **no** | **no** |
| `legal/informativa-privacy.html` | sì | sì | sì |
| `legal/termini-di-servizio.html` | sì | sì | sì |
| `legal/dpa.html` | sì | sì | sì |
| `resources/faq.html` | sì | sì | sì |
| `resources/partner.html` | sì | sì | sì |
| `resources/suggerimenti.html` | sì | sì | sì |

`thankyou.html` è la pagina di ringraziamento dopo l'invio di un modulo: non ha piè di pagina, quindi
non ha i tre link. Ci si arriva solo dopo aver spuntato il consenso, che rimanda all'informativa.
