<?php
  define('__AUTOLOADER__', realpath('../../bin/vendor/autoload.php'));
  define('__BIN__', realpath('../../bin/'));

  require_once __AUTOLOADER__;

  class Main {
    private $mail,  $Response;

    public function __construct() {
      $this->load_env();
      $this->setup_mailer();
    }

    private function load_env() {
      $dotenv = new Dotenv\Dotenv(__BIN__);
      $dotenv->load();
      try {
        $dotenv->required(['SMPT_HOST', 'SMTP_LOGIN', 'SMTP_PWD', 'SMTP_RECIPIENT', 'SMTP_RECIPIENT_NAME']);
      } catch (Exception $e) {
        throw new Exception('Mailer env not set.', 1);
      }
      try {
        $dotenv->required(['SMPT_HOST', 'SMTP_LOGIN', 'SMTP_PWD', 'SMTP_RECIPIENT', 'SMTP_RECIPIENT_NAME'])->notEmpty();
      } catch (Exception $e) {
        throw new Exception('Mailer env are empty.', 1);
      }
    }


    private function setup_mailer() {
      $this->mail = new PHPMailer;
      $this->mail->isSMTP();
      $this->mail->Host = getenv('SMPT_HOST');
      $this->mail->SMTPAuth = true;
      $this->mail->Username = getenv('SMTP_LOGIN');
      $this->mail->Password = getenv('SMTP_PWD');
    }

    /**
     * Send Email
     * @return json response
     */
    public function send_email($Request) {
      $this->Response = [];
      $this->Response['success'] = false;
      $this->Response['message'] = '';
      header('Content-Type: application/json');
      http_response_code(400);

      if (empty($Request['name'])) {
        $this->Response['message'] = "No name provided.";
      } else if (empty($Request['email'])) {
        $this->Response['message'] = "no email provided.";
      } else if (empty($Request['message'])) {
        $this->Response['message'] = "no message provided.";
      } else {
        /**
         * CRAFT RESPONSE
         */
        $this->mail->setFrom($Request['email'], $Request['name']);
        $this->mail->addReplyTo($Request['email'], $Request['name']);
        $this->mail->addAddress(getenv('SMTP_RECIPIENT'), getenv('SMTP_RECIPIENT_NAME') . ' Website');
        $this->mail->isHTML(true);

        $this->mail->Subject = getenv('SMTP_RECIPIENT_NAME') . ': Messaggio inviato dal form del sito web.';

        /**
          * BODY
          */
        $this->mail->Body = 'Message dal sito: ' . getenv('SMTP_RECIPIENT_NAME') . '<br />';
        $this->mail->Body .= 'Nome Cliente: ' . $Request['name'] . '<br />';
        if (isset($Request['phone']) && !empty($Request['phone'])) {
          $this->mail->Body .= 'Telefono Cliente: ' . $Request['phone'] . '<br />';
        }
        $this->mail->Body .= 'Email Cliente: ' . $Request['email'] . '<br />';
        $this->mail->Body .= 'Messaggio Cliente: ' . $Request['message'] . '<br />';

        $this->mail->AltBody = 'Message dal sito: ' . getenv('SMTP_RECIPIENT_NAME') . '\n';
        $this->mail->AltBody .= 'Nome Cliente: ' . $Request['name'] . '\n';
        if (isset($Request['phone']) && !empty($Request['phone'])) {
          $this->mail->AltBody .= 'Telefono Cliente: ' . $Request['phone'] . '\n';
        }
        $this->mail->AltBody .= 'Email Cliente: ' . $Request['email'] . '\n';
        $this->mail->AltBody .= 'Messaggio Cliente: ' . $Request['message'] . '\n';

        /**
         * SEND MAIL
         */
        if(!$this->mail->send()) {
            $this->Response['message'] = 'Message could not be sent.';
            $this->Response['error'] = $this->mail->ErrorInfo;
            http_response_code(403);
        } else {
            $this->Response['success'] = true;
            $this->Response['message'] = 'Message has been sent';
            http_response_code(200);
        }
      }
      return json_encode($this->Response);
    }
  }

?>
