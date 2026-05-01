<?php

$dbh = new PDO(
    'mysql:host=localhost;dbname=webprognje',
    'webprognje',
    'WebProgNJE123',
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
);

?>