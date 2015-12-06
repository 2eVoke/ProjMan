<?php

 header("Access-Control-Allow-Origin: *");

try {
	$dbh = new PDO('mysql:host=localhost;dbname=ansc1097_projman', 'ansc1097_projman', 'pass');

	$sql = "SELECT * from projects";
	$stm = $dbh->prepare($sql);
	$stm->execute();

	$res = $stm->fetchAll(PDO::FETCH_OBJ);

	$dbh = null;
	echo ")]}',\n".json_encode($res);


}  //end try
catch (PDOException $e) {
	error_log( "Error!: " . $e->getMessage() . "<br/>");
	die();
} // end catch