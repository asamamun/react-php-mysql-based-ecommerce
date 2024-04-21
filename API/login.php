<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
// Get the request data
$requestData = json_decode(file_get_contents('php://input'), true);

// Access the email and password values
$email = $requestData['email'];
$password = $requestData['password'];

// Perform your login logic here
// e.g., query the database, authenticate the user, etc.
require "database.php";
$q = "select * from users where email = '$email' limit 1";
$result = $conn->query($q);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if(password_verify($password, $row['password'])) {
// Return a JSON response
$response = [
    'status' => true,
    'message' => 'Login successful',
    'user' => [
        'id' => $row['id'],
        'username' => $row['username'],
        'email' => $row['email'],
        'role' => $row['role'],
        // Include any other user data you want to return
    ],
];

header('Content-Type: application/json');
echo json_encode($response);
}
else{
    $response = [
        'status' => false,
        'message' => 'Login failed',
        'user' => null,
    ];
    
    header('Content-Type: application/json');
    echo json_encode($response);
}

}

