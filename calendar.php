
<?php
 
 
//TO DEBUG UNCOMMENT THESE LINES
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
 
//INCLUDE THE GOOGLE API PHP CLIENT LIBRARY FOUND HERE
//https://github.com/google/google-api-php-client
//DOWNLOAD IT AND PUT IT ON YOUR WEBSERVER IN THE ROOT FOLDER.
require '/var/www/html/google-calendar-list/google-api-php-client/src/Google/autoload.php'; 
 
$client = new Google_Client();
$client->setApplicationName("My Calendar"); //DON'T THINK THIS MATTERS
$client->setDeveloperKey('AIzaSyAjdyr-Q-ui6EtrgnweukvHmeQdpeKAdSM');
$cal = new Google_Service_Calendar($client);
$calendarId = 'ed.prince5769@gmail.com';

$params = array(
    'singleEvents' => true, //REQUIRED
    'orderBy' => 'startTime',
    'timeMin' => date(DateTime::ATOM)  
);

$events = $cal->events->listEvents($calendarId, $params); 
//print_r(json_encode($events->getItems()));
$calTimeZone = $events->timeZone; //GET THE TZ OF THE CALENDAR

date_default_timezone_set($calTimeZone);

$jsonEvents = json_encode($events->getItems());
$outerArray = array();
$innerArray = array();
foreach ($events->getItems() as $event) {  
    
    if (isset ($event->start->date)) { 
        $array = array("title" => $event->summary, "color" => "red", "description" => $event->description, "start" => $event->start->date, "end" => $event->end->date);
    } else {
        $array = array("title" => $event->summary, "color" => "red", "description" => $event->description,  "start" => $event->start->dateTime, "end" => $event->end->dateTime); 
    }
    array_push($outerArray, $array);
}
    print_r(json_encode($outerArray)); 
?>
