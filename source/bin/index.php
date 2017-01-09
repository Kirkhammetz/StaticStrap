<?php
  ini_set('display_errors', 'On');
  error_reporting(E_ALL);

  require realpath(__DIR__ . '/main.class.php');

  $main = new Main();

  $Request = [
    'name' => 'TestClass',
    'email' => 'test@example.org',
    'message' => 'Yoo!',
  ];

  $Response = $main->send_email($Request);

  die($Response); // return json response
