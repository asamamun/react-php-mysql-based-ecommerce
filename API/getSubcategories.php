<?php
require "database.php";
// Get category_id from the request
$category_id = $_GET['category_id'];

// Query to fetch subcategories based on category_id
$query = "SELECT id, name FROM subcategories WHERE category_id = ?";

// Prepare and bind the statement
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $category_id);

// Execute the statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch subcategories
    $subcategories = array();
    while ($row = $result->fetch_assoc()) {
        $subcategories[] = $row;
    }
    // Encode subcategories as JSON and output
    echo json_encode($subcategories);
} else {
    echo "No subcategories found for the selected category.";
}

// Close statement and connection
$stmt->close();
$conn->close();