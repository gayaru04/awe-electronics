<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$users = json_decode(file_get_contents("../data/users.json"), true);
foreach ($users as $user) {
    if ($user['email'] === $data['email']) {
        echo json_encode(["success" => false, "message" => "User already exists"]);
        exit;
    }
}

$users[] = [
    "email" => $data['email'],
    "password" => $data['password'], // ❗ You can hash this if needed
    "role" => "customer"
];

file_put_contents("../data/users.json", json_encode($users, JSON_PRETTY_PRINT));
echo json_encode(["success" => true, "message" => "User registered successfully"]);
