<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object file
include_once '../../../config/database.php';
include_once '../product.php';
 
$database = new Database();
$db = $database->getConnection();
 
$product = new Product($db);
$product->id = isset($_GET['id']) ? $_GET['id'] : die();
 
if($product->delete()){
  echo '{';
  echo '  "message": "Product with id ' . $product->id . ' was deleted."';
  echo '}';
}
 
// if unable to delete the product
else{
  echo '{';
  echo '  "message": "Unable to delete object."';
  echo '}';
}
?>