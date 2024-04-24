<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
define("API", "http://localhost/ROUND57/reactJS/react-php-mysql-based-ecommerce/API/");
$conn = new mysqli("localhost", "root", "", "web1ecomm");
//error handling
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}