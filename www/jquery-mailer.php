<?php
	header("Content-Type: text/html; charset=utf-8");
	
	# Configuration
	#
	define('DESTINATION', 'anjutalove@gmail.com');
	define('DESTINATION2', 'likamoon@list.ru');
	define('SCRIPT_URI',  'jquery-mailer.php');
		
	###############################################################
	
	function ok ($e = '') {
		header("Content-Type: application/json");
		print json_encode(array("status" => "ok", "error" => $e));
		exit();
	}
	
	function not_ok ($e) {
		header("Content-Type: application/json");
		print json_encode(array("status" => "not ok", "error" => $e));
		exit();
	}
		
	#Форма ПРИСОЕДИНИТЬСЯ
	if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST["formType"] == "join" )
	{				
		
		$_subject = isset($_POST["formSubject"]) ? filter_var($_POST['formSubject'], FILTER_SANITIZE_STRING) :  null;		
		$subject = "Заявка с сайта Яблоко: " . $_subject ;
		
		if (isset($_POST['want']) && is_array($_POST['want'])) {
            $wants = join("; ", $_POST['want']);
		}
		if (isset($_POST['social-network']) && is_array($_POST['social-network'])) {
            $sociallinks = join("; ", $_POST['social-network']);
        }
		
		$message = "Информация:
		Фамилия:            ".(isset($_POST["secondname"]) ?             filter_var($_POST['secondname'],            FILTER_SANITIZE_STRING) :  null)."	
		Имя:            ".(isset($_POST["name"]) ?             filter_var($_POST['name'],            FILTER_SANITIZE_STRING) :  null)."		
		Отчество:            ".(isset($_POST["patronymic"]) ?             filter_var($_POST['patronymic'],            FILTER_SANITIZE_STRING) :  null)."		
		Телефон:            ".(isset($_POST["phone"]) ?             filter_var($_POST['phone'],            FILTER_SANITIZE_STRING) :  null)."
		Почта:            ".(isset($_POST["email"]) ?             filter_var($_POST['email'],            FILTER_SANITIZE_STRING) :  null)."
		Район:            ".(isset($_POST["district"]) ?             filter_var($_POST['district'],            FILTER_SANITIZE_STRING) :  null)."
		Пожелания:            $wants
		Социальные сети:		$sociallinks
		Заявка: 				$_subject 
		Время заявки:       ".date("Y-m-d H:i:s")."
		";
		
		$headers =  "From: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Reply-To: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Content-type: text/plain; charset=\"utf-8\"" . "\r\n" .
		"X-Mailer: PHP/" . phpversion();

		if ( mail(DESTINATION, $subject, $message, $headers) && mail(DESTINATION2, $subject, $message, $headers) )
        ok();
		else
        not_ok("Ошибка. Возможно функция mail отключена. Обратитесь к хостинг-провайдеру.");		
	}

	elseif ($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		not_ok("Все поля обязательны к заполнению");
	}		
	
?>