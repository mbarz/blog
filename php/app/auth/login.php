<?php

error_reporting(E_ALL);

session_start();

if(isset($_SESSION['userid'])) {
    die('{"success":true, "message": "already logged in"');
}


if(isset($_POST['email'])) {
    
    $email = $_POST['email'];
    $password = $_POST['password'];

    if($email == 'me@muxe.de' && $password == 'letmein') {
        $_SESSION['userid'] = $email;
        die('{"success":true, "message": "logged in successfully"');
    } else {
        $errorMessage = 'E-Mail or Password invalid.';
        die('{"success":true, "message": "'.$errorMessage.'"');
    }
}

?>
