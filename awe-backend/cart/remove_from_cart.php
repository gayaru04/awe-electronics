<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Preflight response
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get POST data
$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'] ?? '';
$index = $input['index'] ?? null;

if (!$email || $index === null) {
    echo json_encode([
        'success' => false,
        'message' => 'Email and item index required'
    ]);
    exit();
}

// Load current cart data
$cartFile = '../data/cart.json';
$cartData = file_exists($cartFile) ? json_decode(file_get_contents($cartFile), true) : [];

$found = false;

foreach ($cartData as &$entry) {
    if ($entry['email'] === $email) {
        if (isset($entry['items'][$index])) {
            array_splice($entry['items'], $index, 1);
            $found = true;
        }
        break;
    }
}

if ($found) {
    file_put_contents($cartFile, json_encode($cartData, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'message' => 'Item removed successfully']);
} else {
    echo json_encode([
        'success' => false,
        'message' => "Item not found for user: $email at index: $index"
    ]);
}
?>
