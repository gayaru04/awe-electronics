<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'] ?? '';

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit();
}

$cartFile = '../data/cart.json';
$cartData = file_exists($cartFile) ? json_decode(file_get_contents($cartFile), true) : [];

foreach ($cartData as $entry) {
    if ($entry['email'] === $email) {
        echo json_encode(['success' => true, 'items' => $entry['items']]);
        exit();
    }
}

echo json_encode(['success' => true, 'items' => []]);
?>
