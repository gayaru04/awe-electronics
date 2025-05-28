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
$role = $input['role'] ?? 'user';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Email and password required']);
    exit();
}

$usersFile = '../data/users.json';
$users = json_decode(file_get_contents($usersFile), true);

// Check if email already exists
foreach ($users as $user) {
    if ($user['email'] === $email) {
        echo json_encode(['success' => false, 'message' => 'User already exists']);
        exit();
    }
}

// Add new user
$users[] = [
    'email' => $email,
    'password' => $password,
    'role' => $role
];

file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
echo json_encode([
  'success' => true,
  'message' => 'User registered',
  'email' => $email,
  'role' => $role
]);
?>
