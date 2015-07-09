<head>
  <link href="calendar.css" type="text/css" rel="stylesheet"/> 
  <link rel='stylesheet' href='fullcalendar/fullcalendar.css'/>
  <script src='fullcalendar/lib/jquery.min.js' type='text/javascript'></script>
  <script src='fullcalendar/lib/moment.min.js' type='text/javascript'></script>
  <script src='fullcalendar/fullcalendar.js' type='text/javascript'></script>
  <script src='jq-fc.js' type='text/javascript'></script>
</head>

<?php require "calendar.php"; ?>

<div class="event-container">
  <div class="event-data">
    <span class="day">
        <?php
          echo $newday;
          echo " ";
          echo $newmonth;
        ?>
    </span>
   </div>
    <span>
    
    </span>
    <div class="event-body">
    <?php
        echo $event->summary;
    ?>
  </div>
</div>

<div id='calendar'>
</div>
