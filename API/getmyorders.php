<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "database.php";

// Get user_id from POST request
$input = json_decode(file_get_contents('php://input'), true);
$user_id = $input['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

// Query to fetch orders for specific user along with their orderdetails
$sql = "SELECT o.*, od.id AS orderdetail_id, od.product_id, od.price, od.quantity, od.op, od.created_at AS orderdetail_created_at
        FROM orders o
        LEFT JOIN orderdetails od ON o.id = od.order_id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

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