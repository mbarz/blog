<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../../../config/database.php';
include_once '../product.php';
 
$database = new Database();
$db = $database->getConnection();
 
$product = new Product($db);
 
$product->id = isset($_GET['id']) ? $_GET['id'] : die();
 
$product->readOne();
 
// create array
$product_arr = array(
  "id" =>  $product->id,
  "name" => $product->name,
  "description" => $product->description,
  "price" => $product->price,
  "category_id" => $product->category_id,
  "category_name" => $product->category_name
);
 
// make it json format
if($product->id)
  print_r(json_encode($product_arr));
else {
  http_response_code(404);
  echo '{"message":"Not Found"}';
}
?>