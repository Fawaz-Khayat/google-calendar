
<?php
/**
 * PHP version 5
 * @category Calendar*
 * @package Google_Calendar
 * @author Ed Prince <edward_prince@hotmail.com>
 * @license http://rem.mit-license.org/ MIT license
 * @link '/google-api-php-client/src/Google/autoload.php'
 *
 */
require '/var/www/html/google-calendar-list/google-api-php-client/src/Google/autoload.php'; 
 
$client = new Google_Client();
$client->setApplicationName("My Calendar"); //DON'T THINK THIS MATTERS
$client->setDeveloperKey('AIzaSyAjdyr-Q-ui6EtrgnweukvHmeQdpeKAdSM');
$cal = new Google_Service_Calendar($client);
$calendarId = 'ed.prince5769@gmail.com';

$params = array(
    'singleEvents' => true, 
    'orderBy' => 'startTime',
    'timeMin' => date(DateTime::ATOM)  
);

$events = $cal->events->listEvents($calendarId, $params); 
$calTimeZone = $events->timeZone;

date_default_timezone_set($calTimeZone);

$jsonEvents = json_encode($events->getItems());
$outerArray = array();
$innerArray = array();
foreach ($events->getItems() as $event) {  
    
    if (isset ($event->start->date)) { 
        $array = array("title" => $event->summary, "description" => $event->description, "start" => $event->start->date, "end" => $event->end->date);
    } else {
        $array = array("title" => $event->summary, "description" => $event->description,  "start" => $event->start->dateTime, "end" => $event->end->dateTime); 
    }
    array_push($outerArray, $array);
}
    print_r(json_encode($outerArray)); 
?>
