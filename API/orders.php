<?php
require "database.php";
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
// Read JSON data from the request body
$json_data = file_get_contents('php://input');

// Decode JSON data into PHP associative arrays
$order_data = json_decode($json_data, true);

// Check if JSON decoding was successful
if ($order_data !== null) {
    // Extract data from the decoded JSON
    $cart = $order_data['cart'];
    $formData = $order_data['formData'];
    $grandTotal = $order_data['grandTotal'];

    // Insert into orders table
    $user_id = 1; // Assuming user_id is 1 for now
    $discount = 0; // You can retrieve this value from the JSON if available
    $comment = ''; // You can retrieve this value from the JSON if available
    $payment = $formData['paymentMethod'];
    $trxid = $formData['trxid'];
    $status = 'pending'; // Initial status
    $created_at = date('Y-m-d H:i:s'); // Current date and time

    $insert_order_query = "INSERT INTO orders (user_id, total, discount, comment, payment, trxid, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($insert_order_query);
    $stmt->bind_param("idssssss", $user_id, $grandTotal, $discount, $comment, $payment, $trxid, $status, $created_at);
    $stmt->execute();

    // Get the order ID of the newly inserted order
    $order_id = $conn->insert_id;

    // Insert into orderdetails table
    foreach ($cart as $item) {
        $product_id = $item['id'];
        $price = $item['price'];
        $quantity = $item['quantity'];
        $op = ''; // Assuming all items are added to the order

        $insert_order_detail_query = "INSERT INTO orderdetails (order_id, product_id, price, quantity, op, created_at) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($insert_order_detail_query);
        $stmt->bind_param("iiddss", $order_id, $product_id, $price, $quantity, $op, $created_at);
        $stmt->execute();
    }

    // Close statement
    $stmt->close();

    // Close connection
    $conn->close();
    // Return success response to React
    $response = array('status' => 'success');
    echo json_encode($response);
} else {
    // Return error response to React if JSON decoding failed
    $response = array('status' => 'error', 'message' => 'JSON decoding failed');
    echo json_encode($response);
}

}