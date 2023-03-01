<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json;");


include 'config.php';


$user = file_get_contents('php://input'); // to read the data from react(witch is in Json)
// we can see it in inspect -- Network -- Payload and Preview

$method = $_SERVER['REQUEST_METHOD']; // there is a case of GEt when we want to bring data , and case of POSt when we want to send data

switch($method){
    case 'POST':
        $user = json_decode(file_get_contents('php://input'));
        // print_r($user);

        // Recieve data from database
    case "GET":
        $con=crud::connect();
        // echo $_SERVER['REQUEST_URI']; exit;
        
        $user = json_decode(file_get_contents('php://input'));
        print_r($user);
        // $sql="SELECT * FROM users WHERE id =:id";
        //     $db = $con->prepare($sql);
        //     $db->bindValue(':id' , $id);
        //     $db->execute();
        //     $data= $db->fetch(PDO::FETCH_ASSOC);

    // echo json_encode($data);
    break;

        // Send data to database
 
}
