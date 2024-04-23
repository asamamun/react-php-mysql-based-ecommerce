<?php
require "database.php";
// Get the product ID from the URL parameter
$productId = isset($_GET['id']) ? $_GET['id'] : null;

// Fetch product details from the database
$sql = "SELECT * FROM products WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $productId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $productData = [
        'id' => $row['id'],
        'name' => $row['name'],
        'description' => $row['description'],
        'sku' => $row['sku'],
        'images' => explode(',', $row['images']),
        'price' => $row['price'],
        'quantity' => $row['quantity'],
        'discount' => $row['discount'],
        'hot' => $row['hot'] == '1',
        'createdAt' => $row['created_at']
    ];
} else {
    $productData = null;
}

$stmt->close();
$conn->close();

// Return the product data as JSON
header('Content-Type: application/json');
echo json_encode($productData);
?>