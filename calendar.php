
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
    'timeMin' => date(DateTime::ATOM),
    'maxResults' => 7 
 
);
$events = $cal->events->listEvents($calendarId, $params); 
$calTimeZone = $events->timeZone; //GET THE TZ OF THE CALENDAR

//SET THE DEFAULT TIMEZONE SO PHP DOESN'T COMPLAIN. SET TO YOUR LOCAL TIME ZONE.
date_default_timezone_set($calTimeZone);

$jsonEvents = json_encode($events->getItems());
//print_r($events->getItems());
//$jsonEventDate = json_encode($events->getItems()->start->dateTime);
//echo $jsonEvents;
//echo $jsonEventDate;
$outerArray = array();
$innerArray = array();
foreach ($events->getItems() as $event) {  
    
    if (isset ($event->start->date)) { 
        $array = array("title" => $event->summary, "start" => $event->start->date);
    } else {
        $array = array("title" => $event->summary, "start" => $event->start->dateTime); 
    }
    array_push($outerArray, $array);
    //print_r(json_encode($array));
    //print_r($array);
    if (isset ($event->start->date)) {
        $innerArray = array('title'=> $event->summary, 'date'=> $event->start->date); 
    } else {
        $innerArray = array('title'=> $event->summary, 'date'=> $event->start->dateTime); 
    }

    //echo array_values($innerArray());
    //echo json_encode($event->start->date);
    //echo "<br />";
    //echo json_encode($event->start->dateTime);
    $eventDateStr = $event->start->dateTime;
    if (empty($eventDateStr)) {
        // it's an all day event
        $eventDateStr = $event->start->date;
    }
 
         $temp_timezone = $event->start->timeZone;
    //THIS OVERRIDES THE CALENDAR TIMEZONE IF THE EVENT HAS A SPECIAL TZ
    if (!empty($temp_timezone)) {
         $timezone = new DateTimeZone($temp_timezone); //GET THE TIME ZONE
                 //Set your default timezone in case your events don't have one
    } else { 
        $timezone = new DateTimeZone($calTimeZone);
    }
 
         $eventdate = new DateTime($eventDateStr, $timezone);
    $link = $event->htmlLink;
    $TZlink = $link . "&ctz=" . $calTimeZone; //ADD TZ TO EVENT LINK
    //PREVENTS GOOGLE FROM DISPLAYING EVERYTHING IN GMT
    $newmonth = $eventdate->format("M");
    //CONVERT REGULAR EVENT DATE TO LEGIBLE MONTH
    $newday = $eventdate->format("j");
    //CONVERT REGULAR EVENT DATE TO LEGIBLE DAY
/* 
        ?>
        <div class="event-container">
          <div class="eventDate">
            <span class="day"><?php
 
               echo $newday;
               echo " ";
               echo $newmonth;
 
            ?></span><span class="dayTrail"></span>
    </div>
    <div class="eventBody">
        <a href="<?php echo $TZlink;
                //ECHO DIRECT LINK TO EVENT
?>">
 
        <?php echo $event->summary; //SUMMARY = TITLE
 
        ?>
        </a>
    </div>
    </div>
 */
    //<?php
    }
    print_r(json_encode($outerArray)); 
?>
