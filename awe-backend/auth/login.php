<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

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
