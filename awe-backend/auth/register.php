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
if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$usersFile = "../data/users.json";
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

foreach ($users as $user) {
    if ($user['email'] === $data['email']) {
        echo json_encode(["success" => false, "message" => "User already exists"]);
        exit;
    }
}

$users[] = [
    "email" => $data['email'],
    "password" => $data['password'], 
    "role" => "customer"
];

file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

echo json_encode(["success" => true, "message" => "User registered successfully"]);
