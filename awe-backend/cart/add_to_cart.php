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
$item = $input['item'] ?? null;

if (!$email || !$item) {
    echo json_encode(['success' => false, 'message' => 'Email and item required']);
    exit();
}

$cartFile = '../data/cart.json';
$cartData = file_exists($cartFile) ? json_decode(file_get_contents($cartFile), true) : [];

// Find or add user cart
$found = false;
foreach ($cartData as &$entry) {
    if ($entry['email'] === $email) {
        $entry['items'][] = $item;
        $found = true;
        break;
    }
}
if (!$found) {
    $cartData[] = ['email' => $email, 'items' => [$item]];
}

file_put_contents($cartFile, json_encode($cartData, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'message' => 'Item added to cart']);
?>
