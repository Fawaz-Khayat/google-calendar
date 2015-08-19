#Google Calendar

 - [Installation](https://github.com/edprince/google-calendar/blob/master/README.md#installation)
 - [Usage](https://github.com/edprince/google-calendar/blob/master/README.md#usage)
 - [Styling](https://github.com/edprince/google-calendar/blob/master/README.md#style)
 - [Adding more calendars](https://github.com/edprince/google-calendar/blob/master/README.md#add)

##<a name="installation"></a>Installation
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


##Making the project Google Calendar-ready
**Step 1**
Sign into your Google Account and go to the [Developer Console](https://console.developers.google.com). Create a new project (this may take a few seconds).
![Create Project](http://i.imgur.com/gtfLDLr.png)

**Step 2**
Enable the Google Calendar API by going to the 'API's', under 'API's&auth'. Then click on 'Google Calendar', and then 'Enable API'.
![Enable API](http://i.imgur.com/0iXdGWq.png)

**Step 3**
Click add credentials, and choose 'API Key', and then 'Server Key'. Ignore the textbox, you can add to that later. Click 'Create'. This gives you your application's **API Key**.
![Add credentials](http://i.imgur.com/CUX742X.png)

**Step 4**
Under the 'credentials' tab, click 'Add Credentials', and choose 'OAuth2 client id'. 
![Click OAuth2](http://i.imgur.com/NImk4MV.png)

You need to click 'Configure consent screen' before you can choose a platform. 
![Consent button](http://i.imgur.com/KAmLCUD.png)

At the consent screen, type in a **name** for your project, and click 'save' at the bottom.
![Consent screen configuration](http://i.imgur.com/1yNWsxN.png)

Now you can select 'Web Application' when you choose 'OAuth2 client id'.


**Step 5**
Under the 'Authorized JavaScript Origins' heading which should now have appeared, type the domain of the server hosting the application, for example: `http://myserver.com`.

**Step 6**
Under the 'Authorized Redirect URI's' heading, type the domain again, but add '/oauth2callback' afterwards, for example: `http://myserver.com/oauth2callback`. Then click 'Create'.
![Adding a domain](http://i.imgur.com/VsKzzug.png)

**Step 7**
Now you need to add your **client id** and **API Key** to the code. Within the folder *gc/* in the google calendar folder, change the key in 'developer_key.php' to your **API Key**. Then go to 'add.js', and change the CLIENT_ID on line 70 to your **client ID**.

###Fullcalendar
Everything that is needed for the fullcalendar is in this repository to and will work on downloading, however you can pick it up independently at the fullcalendar [website](http://fullcalendar.io/).

###PHP JSON extension
Look for the install instructions for whichever OS the server is running.

###Google API php client
If you have cloned the repository, then this will be included (make sure to modify the pathway to this file in the <i>calendar.php</i> file to wherever it is being stored on your server. If you want to install independently, head over [here](https://developers.google.com/api-client-library/php/) and read the installation instructions.

##<a name="usage"></a>Using the application
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

##<a name="style"></a>Styling the calendar
The majority of the styling for this application is all done in <i>calendar.css</i>. There are however some styles that have to applied through javascript in <i>jq-fc.js</i>. To find the identifiers of any element, right click and inspect element. This should open developer tools and show the attributes of the element you have selected. Then go to the css file and modify accordingly.

The list view contains event information for upcoming events. The number of events displayed is, by default, set to 3, but can be modified in <i>jq-fc.js</i>.

By default, the list view does not display descriptions for the events, but can display them if description code in uncommented in <i>jq-fc.js</i>

###Colouring the calendar
The calendar does <b>not</b> use the colours given to the events on the Google Calendar. Therefore, instead you will need to change the colour for the event source (i.e events.php -> Blue, sports.php -> Green). This can be done in <i>jq-fc.js</i>. The sports source is being coloured, this technique can be applied to as many sources as you would like.

###Fullcalendar styles
The fullcalendar module has its own stylesheet, <i>fullcalendar.css</i>, and events in there can be modified, or alternatively (as long as your stylesheet reference lies below the fullcalendar stylesheet reference), you can simply add rules in your own stylesheet to override those being provided by the fullcalendar stylesheet.

##<a name="add"></a>Adding more calendars to the feed
This feature requires you to create a new Google Calendar for other categories of events. Not an entirely new primary calendar, but a secondary calendar. Then, when you create an event, use the drop down box to select the calendar on which to post the event.
In order to display multiple calendars (within your personal Google account), you must add other calendars as feeds. Create a new php file with a sensible name for the calendar feed, then add the following to the file:

  ```php
  <?php
    $calendarId = 'INSERT YOUR CALENDAR ID';
    require 'pathway/to/common.php';
  ?>
  ```
Now go to the <i>jq-fc.js</i> file and add the new file you have created as an event source. The existing event source(s) should look something like this: 

```javascript
eventSource: [
  {
    url: 'events.php'
  },
  {
    url 'new-feed.php',
    color: 'red' //OPTIONAL. This adds a colour to the events to distinguish from which feed it is
  }
]
```
This should then add a new calendar feed to your calendar.
##Errors
If you are getting errors when using this project, here are a few things to check.
 - Check that everything in the head of the html is linked to the correct place (bearing in mind the location of each file).
 - Check in <i>common.php</i> that it is requiring `autoload.php` from the correct location
 - Check in <i>jq-fc.js</i> that the event source url's are pointing to the correct locations

