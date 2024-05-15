<?php
require "database.php";
//return all orders and orderDetails in JSON format
/*
// Join orders and orderDetails tables
$sql = "SELECT o.id, o.user_id, o.total,o.discount, o.payment,o.trxid,o.status, o.created_at, od.product_id,od.price, od.quantity
        FROM orders o
        JOIN orderdetails od ON o.id = od.order_id";

// Get the results
$result = $conn->query($sql);

// Initialize an array to store the orders
$orders = array();

// Fetch each order and store it in the array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

// Return the orders as JSON
header('Content-Type: application/json');
echo json_encode($orders);

*/
// Query to fetch orders along with their orderdetails
$sql = "SELECT o.*, od.id AS orderdetail_id, od.product_id, od.price, od.quantity, od.op, od.created_at AS orderdetail_created_at
        FROM orders o
        LEFT JOIN orderdetails od ON o.id = od.order_id";

$result = $conn->query($sql);

$orders = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $order_id = $row['id'];
        $orderdetail = array(
            'id' => $row['orderdetail_id'],
            'product_id' => $row['product_id'],
            'price' => $row['price'],
            'quantity' => $row['quantity'],
            'op' => $row['op'],
            'created_at' => $row['orderdetail_created_at']
        );

        if (isset($orders[$order_id])) {
            $orders[$order_id]['orderdetails'][] = $orderdetail;
        } else {
            $orders[$order_id] = array(
                'id' => $row['id'],
                'user_id' => $row['user_id'],
                'total' => $row['total'],
                'discount' => $row['discount'],
                'comment' => $row['comment'],
                'payment' => $row['payment'],
                'trxid' => $row['trxid'],
                'status' => $row['status'],
                'created_at' => $row['created_at'],
                'orderdetails' => array($orderdetail)
            );
        }
    }
}

$conn->close();

// Set the appropriate headers for JSON response
header('Content-Type: application/json');

// Output the JSON response
echo json_encode($orders);
?>