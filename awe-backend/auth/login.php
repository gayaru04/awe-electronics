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
$users = json_decode(file_get_contents("../data/users.json"), true);

foreach ($users as $user) {
    if ($user['email'] === $data['email'] && $user['password'] === $data['password']) {
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "role" => $user["role"]
        ]);
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Invalid credentials"]);
