<?php

require "database.php";

// Check if 'id' is set in the query parameters
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    // Prepare the SQL query to fetch product details
    $query = "SELECT * FROM products WHERE id = ?";

    // Prepare and bind the statement
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch the product details
    $product = $result->fetch_assoc();

    // Output the product details as JSON
    echo json_encode($product);
} else {
    // Handle the case where 'id' is not set in the query parameters
    echo json_encode(array("error" => "Product ID not provided"));
}

// Close the database connection
$conn->close();