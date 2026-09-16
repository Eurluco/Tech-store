<?php
header('Content-Type: application/json; charset=utf-8');

// ==============================================================================
// CONFIGURATION : REMPLACEZ PAR VOTRE EMAIL DE DESTINATION
// ==============================================================================
$destination_email = "votre-email@exemple.com";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $client_name  = htmlspecialchars(strip_tags(trim($_POST['client_name'] ?? '')));
    $client_phone = htmlspecialchars(strip_tags(trim($_POST['client_phone'] ?? '')));
    $client_email = filter_var(trim($_POST['client_email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $address      = htmlspecialchars(strip_tags(trim($_POST['address'] ?? '')));
    $cart_raw     = $_POST['cart_data'] ?? '[]';
    
    $cart = json_decode($cart_raw, true);

    if (!empty($client_name) && !empty($client_phone) && !empty($cart)) {
        
        $headers  = "From: " . $client_name . " <" . ($client_email ?: "no-reply@votre-domaine.com") . ">\r\n";
        if (!empty($client_email)) {
            $headers .= "Reply-To: " . $client_email . "\r\n";
        }
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $subject = "[NOUVELLE COMMANDE BOUTIQUE] - " . $client_name;
        
        $body  = "==================================================\n";
        $body .= "          RÉCAPITULATIF DE LA COMMANDE\n";
        $body .= "==================================================\n\n";

        $total_general = 0;
        foreach ($cart as $item) {
            $subtotal = $item['price'] * $item['quantity'];
            $total_general += $subtotal;
            $body .= "- " . $item['name'] . " (" . $item['variant'] . ")\n";
            $body .= "  Qté : " . $item['quantity'] . " x $" . $item['price'] . " = $" . $subtotal . "\n\n";
        }

        $body .= "--------------------------------------------------\n";
        $body .= "TOTAL À PAYER : $" . number_format($total_general, 2) . "\n";
        $body .= "--------------------------------------------------\n\n";
        $body .= "INFORMATIONS DU CLIENT :\n";
        $body .= "Nom / Prénom : " . $client_name . "\n";
        $body .= "Téléphone    : " . $client_phone . "\n";
        $body .= "E-mail       : " . ($client_email ?: "Non renseigné") . "\n";
        $body .= "Adresse      : " . ($address ?: "Non renseigné") . "\n";

        if (mail($destination_email, $subject, $body, $headers)) {
            echo json_encode(["status" => "success", "message" => "Merci ! Votre commande a été enregistrée et envoyée."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erreur du serveur d'envoi. Veuillez contacter l'administrateur."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Veuillez remplir votre nom, téléphone et vérifier votre panier."]);
    }
}
?>