<?php
require "database.php";
// Query to fetch categories
$query = "SELECT id, name FROM categories";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Fetch categories
    $categories = array();
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    // Encode categories as JSON and output
    echo json_encode($categories);
} else {
    echo "No categories found";
}

// Close connection
$conn->close();