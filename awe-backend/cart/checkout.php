<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !is_array($data)) {
    echo json_encode(["success" => false, "message" => "Invalid cart data"]);
    exit;
}

$orderFile = "../data/orders.json";
$orders = file_exists($orderFile) ? json_decode(file_get_contents($orderFile), true) : [];

$orders[] = [
    "timestamp" => date("Y-m-d H:i:s"),
    "items" => $data
];

file_put_contents($orderFile, json_encode($orders, JSON_PRETTY_PRINT));

echo json_encode(["success" => true, "message" => "Checkout complete"]);
?>
