<?php
// Imposta l'encoding per sicurezza
mb_internal_encoding('UTF-8');

// Solo procedi se il form è stato inviato con metodo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- 1. Recupera e Sanifica i Dati ---
    // Usa filter_input per sicurezza contro XSS etc.
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
    $email_mittente = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $messaggio = filter_input(INPUT_POST, 'messaggio', FILTER_SANITIZE_SPECIAL_CHARS);

    // Rimuovi spazi bianchi extra
    $nome = trim($nome);
    $email_mittente = trim($email_mittente);
    $messaggio = trim($messaggio);

    // --- 2. Validazione Base ---
    $errors = [];
    if (empty($nome)) {
        $errors[] = "Il nome è obbligatorio.";
    }
    if (empty($email_mittente)) {
        $errors[] = "L'email è obbligatoria.";
    } elseif (!filter_var($email_mittente, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "L'indirizzo email non è valido.";
    }
    // Il messaggio è opzionale, quindi non lo validiamo se vuoto

    // --- 3. Se ci sono errori, fermati e mostrali (o reindirizza a pagina errore) ---
    if (!empty($errors)) {
        // Potresti reindirizzare a una pagina di errore passando i messaggi
        // header("Location: error.php?errors=" . urlencode(implode('<br>', $errors)));
        // Per semplicità, li mostriamo qui (non ideale per la produzione)
        echo "<h1>Errore nell'invio</h1>";
        echo "<p>Si sono verificati i seguenti errori:</p><ul>";
        foreach ($errors as $error) {
            echo "<li>" . htmlspecialchars($error, ENT_QUOTES, 'UTF-8') . "</li>";
        }
        echo "</ul>";
        echo '<p><a href="index.html#contact">Torna al modulo</a></p>';
        exit; // Interrompe lo script
    }

    // --- 4. Prepara l'Email ---

    $destinatario = "info@fidai.it";

    $oggetto = "Nuova Richiesta Accesso Anticipato Fid.ai da " . $nome;

    // Costruisci il corpo dell'email
    $corpo_email = "Hai ricevuto una nuova richiesta dal form di contatto Fid.ai:\n\n";
    $corpo_email .= "Nome: " . $nome . "\n";
    $corpo_email .= "Email: " . $email_mittente . "\n\n";
    if (!empty($messaggio)) {
        $corpo_email .= "Messaggio:\n--------------------\n" . $messaggio . "\n--------------------\n";
    } else {
        $corpo_email .= "Messaggio: (Nessuno)\n";
    }
    $corpo_email .= "\n---\nInviato tramite il form su fidai.it"; // <<<=== Aggiorna con il tuo dominio

    // Intestazioni Email (Headers) - IMPORTANTI!
    // Usa un indirizzo "From" del tuo dominio (es. noreply@) per migliorare la recapitabilità
    // <<<=== Aggiorna 'webmaster@...' con un indirizzo valido sul tuo dominio ===>>>
    $headers = "From: Fid.ai Notifiche <noreply@" . $_SERVER['SERVER_NAME'] . ">\r\n";
    $headers .= "Reply-To: " . $nome . " <" . $email_mittente . ">\r\n"; // Così puoi rispondere direttamente all'utente
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // --- 5. Invia l'Email ---
    if (mail($destinatario, $oggetto, $corpo_email, $headers)) {
        // Successo: Reindirizza a una pagina di ringraziamento
        header("Location: thankyou.html");
        exit;
    } else {
        // Errore nell'invio: Mostra un messaggio generico
        // (In produzione, dovresti loggare l'errore invece di mostrarlo all'utente)
        error_log("Errore invio email da form contatto per: " . $email_mittente . " da IP: " . $_SERVER['REMOTE_ADDR']);
        echo "<h1>Errore Server</h1>";
        echo "<p>Siamo spiacenti, si è verificato un problema tecnico e non è stato possibile inviare la tua richiesta. Riprova più tardi o contattaci direttamente all'indirizzo email indicato nel footer.</p>";
        echo '<p><a href="index.html#contact">Torna al modulo</a></p>';
        exit;
    }

} else {
    // Se qualcuno tenta di accedere direttamente a questo file PHP
    // Reindirizza alla homepage o mostra un errore
    header("Location: index.html");
    exit;
}
?>