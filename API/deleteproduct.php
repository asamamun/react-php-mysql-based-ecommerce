<?php
require "database.php";

// Initialize response array
$response = array();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_POST = json_decode(file_get_contents("php://input"),true);
    // Check if the 'id' parameter is set in the POST data
    if (isset($_POST["id"])) {
        

        // Check connection
        if ($conn->connect_error) {
            $response['error'] = "Connection failed: " . $conn->connect_error;
        } else {
            // Prepare and bind SQL statement
            $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
            $stmt->bind_param("i", $id);

            // Set parameter from the POST data
            $id = $_POST["id"];
try {
    if ($stmt->execute()) {
        $response['status'] = true;
        $response['message'] = "Product deleted successfully.";
    } else {
        $response['status'] = false;
        $response['message'] = "Error deleting product: " . $stmt->error;
    }
} catch (\Throwable $th) {
    $response['status'] = false;
    $response['message'] = "Error deleting product: " . $th->getMessage();
}
            // Execute SQL statement
            

            // Close statement and database connection
            $stmt->close();
            $conn->close();
        }
    } else {
        $response['status'] = false;
        $response['message'] = "Product ID is not provided.";
    }
} else {
    $response['status'] = false;
    $response['message'] = "Invalid request method.";
}

// Output response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
