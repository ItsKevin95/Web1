<?php

$dbh = new PDO(
    'mysql:host=localhost;dbname=adatb;charset=utf8mb4',
    'adatbf',
    'JELSZO_HELYE',
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
);

?>