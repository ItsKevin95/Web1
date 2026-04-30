<?php
include "db.php";

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case "GET":
        $stmt = $dbh->query("SELECT * FROM film");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $dbh->prepare("
            INSERT INTO film (cim, ev, hossz)
            VALUES (:cim, :ev, :hossz)
        ");

        $stmt->execute([
            ":cim" => $data["cim"],
            ":ev" => $data["ev"],
            ":hossz" => $data["hossz"]
        ]);

        echo json_encode(["status" => "ok"]);
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $dbh->prepare("
            UPDATE film
            SET cim = :cim,
                ev = :ev,
                hossz = :hossz
            WHERE id = :id
        ");

        $stmt->execute([
            ":id" => $data["id"],
            ":cim" => $data["cim"],
            ":ev" => $data["ev"],
            ":hossz" => $data["hossz"]
        ]);

        echo json_encode(["status" => "ok"]);
        break;

    case "DELETE":
        $id = $_GET["id"];

        $stmt = $dbh->prepare("DELETE FROM film WHERE id = :id");
        $stmt->execute([":id" => $id]);

        echo json_encode(["status" => "ok"]);
        break;
}
?>