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
$password = $input['password'] ?? '';

// Load user data
$users = json_decode(file_get_contents('../data/users.json'), true);

foreach ($users as $user) {
    if ($user['email'] === $email && $user['password'] === $password) {
        echo json_encode([
            'success' => true,
            'role' => $user['role'] ?? 'user'
        ]);
        exit();
    }
}

echo json_encode(["success" => false, "message" => "Invalid credentials"]);

?>
