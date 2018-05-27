<?php

$url = $_GET['url'];
$params = [];

header('Content-Type: application/json');

if ($url == 'index.php') {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        echo "Hello World";
        http_response_code(200);
    } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        echo "This was a post request";
        http_response_code(200);
    } else {
        http_response_code(405);
    }
} else if ($url == 'auth') {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        echo "Hello World";
        http_response_code(200);
    } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        // echo json_encode($_SERVER);
        if($_SERVER['CONTENT_TYPE'] == 'application/json') {
            $post_body = file_get_contents("php://input");
            $post_body = json_decode($post_body);
        } else {
            $post_body = $_POST;
        }
        
        // echo json_encode($post_body);
        // echo json_encode($post_body);
        $username = $post_body->username;
        $password = $post_body->password;
        if(username == 'hans' && password == 'wurst') {
            echo '{"valid": true}';
        } else {
            echo '{ "data":"'.$json_encode($post_body).'", "valid": false}';
        }
        http_response_code(200);
    } else {
        http_response_code(405);
    }
} else {
    echo 'Not Found';
    http_response_code(404);
}


?>