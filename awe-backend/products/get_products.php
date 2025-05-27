<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


$products = [
  [
    "id" => 1,
    "name" => "Wireless Headphones",
    "description" => "Noise-cancelling over-ear headphones with Bluetooth",
    "price" => 149.99
  ],
  [
    "id" => 2,
    "name" => "Smartphone",
    "description" => "6.5-inch OLED display, 128GB storage",
    "price" => 899.00
  ],
  [
    "id" => 3,
    "name" => "Gaming Keyboard",
    "description" => "Mechanical RGB keyboard with custom macros",
    "price" => 119.49
  ]
];

echo json_encode($products);
?>
