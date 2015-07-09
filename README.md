#Google Calendar

##Installation
###Requirements
 * A <b>Public</b> Google Calendar
 * Your calendarId
 * An API key
 * The JQuery fullcalendar plugin
 * PHP JSON extension
 * Google API php client


###Making your Google Calendar public
Navigate to your Google Calendar. Look down the left hand side, and click the drop down arrow next to the calendar you wish to use for this project. Click on <i>calendar settings</i>. Along the top, click <i>Share this calendar</i>. Then make sure that <i>Make this calendar public</i> is checked, and <i>Share only my free/busy information (Hide details)</i> is unchecked.

###Retrieving your calendarId
Go to the calendar settings described in the previous paragraph, but stay on the <i>Calendar details</i>. Scroll down and you will find your calendarId (probably the email address of the google account).

###Creating an API key
Logged into your Google Account, go to the [Google Developers Console](https://console.developers.google.com/project). Then create a new project. Click on your project once it has been created, and go to <i>Apis & auth</i>. Select <i>APIs</i> and enable the Google Calendar API. Then go to credentials and click on the <i>Create new key</i> button under Public API access. Click <i>Server key</i>. Leave the box blank and click <i>Create</i>. Now it will display your API key.

###Fullcalendar
Everything that is needed for the fullcalendar is in this repository to and will work on downloading, however you can pick it up independently at the fullcalendar [website](http://fullcalendar.io/).

###PHP JSON extension
Look for the install instructions for whatever OS the server is running

###Google API php client
If you have cloned the repository, then this will be included (make sure to modify the pathway to this file in the <i>calendar.php</i> file to wherever it is being stored on your server. If you want to install independently, head over [here](https://developers.google.com/api-client-library/php/) and read the installation instructions.

##Using the application
###Purpose of each file
| File | Description |
|------|-------------|
| calendar.php | This file connects to Google's server and retrieves all the data from the calendar. Then encodes it into a json and prints the result. |
| jq-fc.js | This handles all the fullcalendar code. It also links to the calandar.php, using that as it's source. It reads the json that is printed by calendar.php and uses that data to populate the calendar. |
| display-calendar.html | This page displays the calendar and references everything that the project needs. That can all be found in the head of the document. |
| calendar.css | This styles the page. |

###Link to your calendar
You need to add your API key into the calendar.php file at the top under the `setDeveloperKey`
Go into the calendar.php file, and find where the calendarId variable is being set. Enter your calendarId here.
