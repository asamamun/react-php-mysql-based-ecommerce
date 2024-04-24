<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

$requestData = json_decode(file_get_contents('php://input'), true);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get form data
    $usernameInput = $requestData['username'];
    $emailInput = $requestData['email'];
    $passwordInput = $requestData['password'];
    $roleInput = $requestData['role'];
    
    // Hash the password (use a better hashing method in production)
    $hashedPassword = password_hash($passwordInput, PASSWORD_DEFAULT);

    // Your database connection and insert query
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "web1ecomm";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind SQL statement
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $usernameInput, $emailInput, $hashedPassword, $roleInput);

    // Execute SQL statement
    if ($stmt->execute() === TRUE) {
        $response = array('message' => 'Registration successfully !!!');
        echo json_encode($response);
    } else {
        $response = array('error' => 'Error registering user');
        echo json_encode($response);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
