
<?php

header('Content-Type: text/html');

session_start();

$loggedin = false;
if(isset($_SESSION['userid'])) {
    $loggedin = true;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>muxe/blog login</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
        body {
            background: #eee;
            font-family: sans-serif;
        }
        .main {
            display: flex;
            flex-direction: column;
            min-height: 100%;
            align-items: center;
            justify-content: center;
            padding-bottom: 30px;
        }
        input {
            margin-bottom: 10px;
            margin-top: 5px;
        }
        form {
            padding: 20px 10px;
            background: white;
        }
        form, input {
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
<div class="main">
<?php
if($loggedin){
    echo '<div class="message">You are already logged in</div><br /><a href="./logout">logout</a>';
} else {
    echo '<form action="login" method="post">'
        . 'Email:<br />'
        . '<input type="email" size="40" name="email"><br />'
        . 'Password:<br />'
        . '<input type="password" size="40" name="password"><br />'
        . '<input type="submit" value="Login">'
        . '</form>';
}
?>
</div>
</body>
</html>