<?php
$post = (!empty($_POST)) ? true : false;
if($post) {
	$email = $_POST['email'];
	$name = $_POST['firstname'];
	$text = $_POST['text'];
	$error = '';
	if(!$name) {$error .= 'please fill name ';}
	if(!$email) {$error .= 'please fill email ';}
	if(!$text || strlen($text) < 1) {$error .= 'please fill message ';}
	if(!$error) {
		$address = "admin@event-camp.org";
		$mes = "Имя: ".$name."\n\nСообщение: ".$message."\n\n";
		$send = mail ($address,$message,"Content-type:text/plain; charset = UTF-8\r\nFrom:$email");
		if($send) {echo 'OK';}
	}
	else {echo '<div class="err">'.$error.'</div>';}
}
?>