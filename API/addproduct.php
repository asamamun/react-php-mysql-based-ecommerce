<?php
require "database.php";
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Prepare and bind SQL statement
    $stmt = $conn->prepare("INSERT INTO products (category_id, subcategory_id, name, description, sku, images, price, quantity, discount, hot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iissssdiis", $category_id, $subcategory_id, $name, $description, $sku, $images, $price, $quantity, $discount, $hot);

    // Set parameters from the POST data
    $category_id = $_POST["category_id"];
    $subcategory_id = $_POST["subcategory_id"];
    $name = $_POST["name"];
    $description = $_POST["description"];
    $sku = $_POST["sku"];
    $price = $_POST["price"];
    $quantity = $_POST["quantity"];
    $discount = $_POST["discount"];
    $hot = $_POST["hot"];

    // Handle file upload
    $targetDir = "productimages/"; // Directory where you want to store uploaded images
    $targetFile = $targetDir . basename($_FILES["images"]["name"]);
    if (move_uploaded_file($_FILES["images"]["tmp_name"], $targetFile)) {
        $images = $targetFile;
    } else {
        echo "Failed to upload image.";
        exit();
    }

    // Execute SQL statement
    if ($stmt->execute()) {
        echo json_encode(["status" => true, "message" => "Product added successfully."]);
        
    } else {
        echo json_encode(["status" => false, "message" => "Error: " . $stmt->error]);
        // echo "Error: " . $stmt->error;
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // Invalid request method
    http_response_code(405);
    // echo "Invalid request method.";
}
?>
