<?php include 'config.php'; ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json;");



$method = $_SERVER['REQUEST_METHOD'];

$con=crud::connect();
switch ($method) {
    case "GET":
    $group_id = $_GET['group_id']; //assuming group_id is passed as a query parameter

    $sql = "SELECT * FROM `users`
            INNER JOIN `posts` ON posts.user_id = users.id
            WHERE posts.group_id = :group_id
            ORDER BY posts.created_at DESC";
    
    $query = $con->prepare($sql);
    $query->bindValue(':group_id', $group_id);
    $query->execute();
    $posts = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($posts);
}