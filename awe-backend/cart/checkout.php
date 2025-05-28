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
$items = $input['items'] ?? [];

if (!$email || empty($items)) {
    echo json_encode(['success' => false, 'message' => 'Missing data']);
    exit();
}

// Paths
$cartFile = '../data/cart.json';
$orderFile = '../data/orders.json';

// 🟢 Step 1: Save to orders.json
$orders = file_exists($orderFile) ? json_decode(file_get_contents($orderFile), true) : [];
$orders[] = [
    'email' => $email,
    'timestamp' => date('Y-m-d H:i:s'),
    'items' => $items
];
file_put_contents($orderFile, json_encode($orders, JSON_PRETTY_PRINT));

// 🟢 Step 2: Clear user's cart in cart.json
$cartData = file_exists($cartFile) ? json_decode(file_get_contents($cartFile), true) : [];
foreach ($cartData as &$entry) {
    if ($entry['email'] === $email) {
        $entry['items'] = []; // empty cart
        break;
    }
}
file_put_contents($cartFile, json_encode($cartData, JSON_PRETTY_PRINT));

// ✅ Done
echo json_encode(['success' => true, 'message' => 'Checkout complete', 'orderId' => count($orders)]);
?>
