<?php

require "database.php";

// SQL query to fetch products with categories and subcategories
$sql = "SELECT p.id, p.name, p.description, p.sku, p.images, p.price, p.quantity, p.discount, p.hot, c.name as category_name, sc.name as subcategory_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN subcategories sc ON p.subcategory_id = sc.id";
$result = $conn->query($sql);

// Initialize an array to store the products
$products = array();

// Fetch each product and store it in the array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['images'] = API.$row['images'];
        $products[] = $row;
    }
}

// Return the products as JSON
header('Content-Type: application/json');
echo json_encode($products);

// Close the database connection
$conn->close();