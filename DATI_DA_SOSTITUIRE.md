# Dati da sostituire prima di pubblicare

**Chiuso il 16/09/2026 (giro 25).** I tre documenti legali non contengono più nessun segnaposto
`[[…]]`: la ricerca di `[[` non trova più niente e i commenti `<!-- DA-SOSTITUIRE: … -->` sono stati
cancellati insieme ai valori. Fino al 29/08/2026 i documenti dicevano «fid.ai S.r.l.» e una partita IVA
che non esiste (`IT01234567890`): quella strada resta chiusa, nessun dato si inventa.

Cosa c'è scritto oggi, e cosa no — decisioni di Luca del 16/09/2026:

| Dato | Come compare nei documenti |
|---|---|
| Nome del titolare | **Luca Bertaggia**, in tutti e cinque i punti: informativa § 1, § 2 e § 13, DPA «Parti e data di efficacia», Termini «Chi offre il servizio». |
| Indirizzo postale | **Non pubblicato.** Non c'è una sede: l'attività non è aperta, e l'indirizzo personale non si pubblica. I documenti indicano «Torino (Italia)» e `info@fidai.it` come recapito. |
| Partita IVA / codice fiscale | **Non pubblicati**, non esistono ancora. Al loro posto i documenti dicono che il pilota è gratuito e che la partita IVA sarà indicata quando l'attività sarà avviata. |
| «ditta individuale» | Diventa «persona fisica» dove descrive fid.ai oggi: senza partita IVA la ditta non esiste. Resta dove parla del futuro (Termini, ciclo di fatturazione; pagina prezzi) e dove descrive il **cliente** (Termini, definizioni). |

**Da rivedere con l'avvocato (ottobre 2026):**

- Chi offre un servizio online deve rendere accessibile un indirizzo geografico (art. 7 del
  D.Lgs 70/2003, da confermare). Oggi c'è solo la città: va sistemato quando l'attività sarà aperta
  e ci sarà una sede.
- Il DPA (§ 3.4.d) promette ai clienti 14 giorni di preavviso a ogni cambio di fornitore. Il passaggio
  da OpenAI a OpenRouter è del 09/09/2026: va comunicato ai clienti del pilota.

Se in futuro tornano dei segnaposto, la regola resta: doppie parentesi quadre `[[COSÌ]]` più un commento
`<!-- DA-SOSTITUIRE: … -->` accanto, così chi legge il sito vede che manca un dato invece di leggerne uno
inventato e crederlo vero.

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
- **I fornitori elencati** nell'informativa (§ 6) e nel DPA (Allegato 2) sono allineati a quelli
  realmente in uso dal giro 24 del 15/09/2026: OVH per l'hosting, OpenRouter verso i modelli Google
  Gemini (riserva: Google diretto), Google anche per il Calendar e per la copia cifrata dei backup su
  Drive. È la stessa frase dell'informativa mostrata dentro l'app (`backend/assets/notices/`): se l'app
  cambia fornitore, cambiano anche la pagina Fornitori, le Domande frequenti, l'informativa (§ 6, 7, 8),
  il DPA (§ 3.4, 3.9, Allegato 2) e i Termini (§ 1, 2.5, 8.4). Fino al giro 23 c'era scritto OpenAI.
  I vecchi riferimenti a Twilio nei Termini di Servizio sono stati rimossi nel giro 04 del 29/08/2026 (voce 2): non restano più menzioni di AWS/Twilio/SendGrid/Zendesk in nessuno dei
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
| `404.html` (pagina «non trovata») | sì | sì | sì |
| `legal/informativa-privacy.html` | sì | sì | sì |
| `legal/termini-di-servizio.html` | sì | sì | sì |
| `legal/dpa.html` | sì | sì | sì |
| `resources/faq.html` | sì | sì | sì |
| `resources/partner.html` | sì | sì | sì |

`thankyou.html` è la pagina di ringraziamento dopo l'invio di un modulo: non ha piè di pagina, quindi
non ha i tre link. Ci si arriva solo dopo aver spuntato il consenso, che rimanda all'informativa.
