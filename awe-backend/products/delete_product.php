<?php
// Set CORS and response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read input from JSON body
$input = json_decode(file_get_contents("php://input"), true);
$idToDelete = $input['id'] ?? null;

if (!$idToDelete) {
    echo json_encode(['success' => false, 'message' => 'Product ID is required']);
    exit();
}

// Path to JSON file
$productsFile = '../data/products.json';

// Load current product data
if (!file_exists($productsFile)) {
    echo json_encode(['success' => false, 'message' => 'Product file not found']);
    exit();
}

$products = json_decode(file_get_contents($productsFile), true);

// Filter out the product by comparing as string (for compatibility)
$filtered = array_filter($products, function ($product) use ($idToDelete) {
    return (string)$product['id'] !== (string)$idToDelete;
});

// If no change, the product wasn't found
if (count($filtered) === count($products)) {
    echo json_encode(['success' => false, 'message' => 'Product not found']);
    exit();
}

// Save updated product list
file_put_contents($productsFile, json_encode(array_values($filtered), JSON_PRETTY_PRINT));

// Respond to frontend
echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
?>
