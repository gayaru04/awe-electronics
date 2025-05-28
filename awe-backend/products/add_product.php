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
$name = $input['name'] ?? '';
$price = $input['price'] ?? 0;

if (!$name || !$price) {
    echo json_encode(['success' => false, 'message' => 'Invalid product data']);
    exit();
}

$file = '../data/products.json';
$products = json_decode(file_get_contents($file), true);

$newProduct = [
    'id' => uniqid(),
    'name' => $name,
    'price' => $price
];

$products[] = $newProduct;

file_put_contents($file, json_encode($products, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'product' => $newProduct]);
?>
