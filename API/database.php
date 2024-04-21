<?php
$conn = new mysqli("localhost", "root", "", "web1ecomm");
//error handling
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
