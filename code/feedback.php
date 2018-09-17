<?php
/*
	Thomas Wible interview site
	
	this code was sourced from a how-to on creating a form that sends an email using PHP many years ago, and then modified by me throughout the years
*/

// pull the data from the form
$name = $_POST["name"];
$email = $_POST["email"];
$feedback = $_POST["feedback"];

$to = "ithor6@gmail.com"; //set where the email will be sent

$subject = "Feedback"; //set the subject of the email

//craft the message using the data
$message = "Name: " . $name . "\n\n";
$message .= "Email: " . $email . "\n\n";
$message .= "Feedback:\n " . $feedback . "\n\n";

//set the headers
$headers = "From: $to \r\n";
$headers .= "Reply-To: $email \r\n";

mail($to, $subject, $message, $headers); //use the PHP mail function to send the message

//send an alert to the user and reload the original page
echo "<script>alert('Your feedback has been submitted. Thank you for you comments.');window.location.href='..';</script>";

?>