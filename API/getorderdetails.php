<?php
/*
require "database.php";

$orderId = $_GET['orderId'];

$query = "SELECT * FROM orders WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$result = $stmt->get_result();
$orderDetails = $result->fetch_assoc();
$query = "SELECT * FROM orderdetails WHERE order_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$result = $stmt->get_result();
$products = array();
while($p = $result->fetch_assoc()) {
    array_push($products, $p);
}

$orderDetails['products'] = $products;

header('Content-Type: application/json');
echo json_encode($orderDetails);
*/
?><?php
require "database.php";

$orderId = $_GET['orderId'];

// Query to fetch order details with user name
$query = "SELECT o.*, u.username AS user_name
          FROM orders o
          JOIN users u ON o.user_id = u.id
          WHERE o.id = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$result = $stmt->get_result();
$orderDetails = $result->fetch_assoc();

// Query to fetch order products with product name
$query = "SELECT od.*, p.name AS product_name
          FROM orderdetails od
          JOIN products p ON od.product_id = p.id
          WHERE od.order_id = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$result = $stmt->get_result();
$products = array();

while ($p = $result->fetch_assoc()) {
    array_push($products, $p);
}

$orderDetails['products'] = $products;

header('Content-Type: application/json');
echo json_encode($orderDetails);