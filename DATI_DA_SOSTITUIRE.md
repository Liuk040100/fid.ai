# Dati da sostituire prima di pubblicare

I tre documenti legali di questo sito contengono **12 segnaposto** nella forma `[[COSÌ]]`: sono i dati
che oggi non ci sono, e che deve mettere chi si assume la responsabilità dei documenti. Finché restano
`[[…]]`, chi legge il sito vede che manca un dato — invece di leggere un dato inventato e crederlo vero
(fino al 29/08/2026 i documenti dicevano «fid.ai S.r.l.» e una partita IVA, `IT01234567890`, che non
esiste).

Accanto a ogni segnaposto, **nel codice della pagina**, c'è un commento `<!-- DA-SOSTITUIRE: ... -->` che
ripete cosa metterci. Il commento non si vede nella pagina pubblicata: si vede solo aprendo il file.
Quando sostituisci il valore, **cancella anche il commento**.

Elenco ricavato leggendo i file il 29/08/2026 (`grep -n '\[\['`). I numeri di riga valgono a quella data:
se non tornano più, cerca il testo fra le doppie parentesi quadre, non la riga.

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
| 1 | `legal/dpa.html` | 124 | Intestazione del DPA: chi è il «responsabile del trattamento» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 2 | `legal/dpa.html` | 124 | Intestazione del DPA: chi è il «responsabile del trattamento» | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 3 | `legal/dpa.html` | 124 | Intestazione del DPA: chi è il «responsabile del trattamento» | `[[P.IVA O CODICE FISCALE — oggi IT01234567890, valore di prova]]` | La partita IVA vera, se c'è; altrimenti il codice fiscale della persona fisica. `IT01234567890` è un numero di prova: non esiste e non va lasciato. |
| 4 | `legal/informativa-privacy.html` | 142 | Informativa, § 1 «Introduzione» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 5 | `legal/informativa-privacy.html` | 154 | Informativa, § 2 «Titolare del trattamento» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 6 | `legal/informativa-privacy.html` | 155 | Informativa, § 2 «Titolare del trattamento» | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 7 | `legal/informativa-privacy.html` | 156 | Informativa, § 2 «Titolare del trattamento» | `[[P.IVA O CODICE FISCALE — oggi IT01234567890, valore di prova]]` | La partita IVA vera, se c'è; altrimenti il codice fiscale della persona fisica. `IT01234567890` è un numero di prova: non esiste e non va lasciato. |
| 8 | `legal/informativa-privacy.html` | 301 | Informativa, § 13 «Contatti» | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 9 | `legal/informativa-privacy.html` | 302 | Informativa, § 13 «Contatti» | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 10 | `legal/termini-di-servizio.html` | 188 | Preambolo dei termini: chi offre il servizio | `[[NOME E COGNOME DEL TITOLARE]]` | Il nome e il cognome della persona fisica che risponde del progetto. Esempio: `Mario Rossi`. |
| 11 | `legal/termini-di-servizio.html` | 188 | Preambolo dei termini: chi offre il servizio | `[[INDIRIZZO COMPLETO — via e numero civico, CAP]]` | Via, numero civico e CAP dell'indirizzo a cui si possono mandare comunicazioni formali. La città (Torino, Italia) è già scritta accanto e non va ripetuta. Esempio: `Via Roma 1, 10121`. |
| 12 | `legal/termini-di-servizio.html` | 188 | Preambolo dei termini: chi offre il servizio | `[[P.IVA O CODICE FISCALE — oggi IT01234567890, valore di prova]]` | La partita IVA vera, se c'è; altrimenti il codice fiscale della persona fisica. `IT01234567890` è un numero di prova: non esiste e non va lasciato. |

## Non sono segnaposto, ma vanno decisi lo stesso

Queste cose non hanno le doppie parentesi quadre perché oggi un valore ce l'hanno, ed è un valore che
funziona. Restano da confermare:

- **`info@fidai.it`** è l'indirizzo di contatto di tutti e tre i documenti (prima l'informativa privacy
  ne aveva un altro, `privacy@fid.ai`, su un dominio che non è nostro: la posta sarebbe rimbalzata). Se
  in futuro apri una casella dedicata alle richieste privacy, o una PEC, vanno aggiunte qui.
- **«Torino (Italia)»** è scritto accanto a ogni segnaposto di indirizzo e nel piè di pagina di tutte le
  pagine. Se la città cambia, va cambiata anche lì.
- **I fornitori elencati** nell'informativa (§ 6) e nel DPA (Allegato 2) — AWS, Twilio, Stripe, SendGrid,
  Zendesk — sono quelli previsti dal progetto, non tutti quelli in uso oggi: l'applicazione gira su un
  server OVH in Francia. Vanno riallineati prima di firmare un contratto con un cliente vero.

## I link legali, pagina per pagina

Ogni pagina del sito deve portare ai tre documenti: è il modo in cui un visitatore (e chi verifica
l'app, per esempio Google) li trova senza cercarli.

| Pagina | Termini | Privacy | DPA |
|--------|:-------:|:-------:|:---:|
| `index.html` | sì | sì | sì |
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
