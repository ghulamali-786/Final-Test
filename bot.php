<?php
// Get the incoming update data from Telegram
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Log the incoming update data for debugging
file_put_contents("update_log.txt", print_r($update, true), FILE_APPEND);

// Get the chat ID and message text from the update data
$chat_id = $update["message"]["chat"]["id"];
$message = $update["message"]["text"];

// Check if the first name is available
if (isset($update["message"]["from"]["first_name"])) {
    $first_name = $update["message"]["from"]["first_name"];
} else {
    $first_name = "User";  // Fallback in case the first name is missing
    file_put_contents("error_log.txt", "First name not found\n", FILE_APPEND);
}

// If the user sends the "/start" command
if ($message == "/start") {
    sendMessage($chat_id, "Hello dear $first_name, welcome to your new bot!");
}

// Function to send a message to the user
function sendMessage($chat_id, $message) {
    $apiToken = "7152403792:AAG4bIdcj0NFf3xAr5g2GFlk6JqmwQUxtBA";  // Replace with your actual bot token
    $url = "https://api.telegram.org/bot$apiToken/sendMessage?chat_id=$chat_id&text=" . urlencode($message);
    file_get_contents($url);
}
?>
