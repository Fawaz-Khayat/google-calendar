# google-calendar-list
Web application in JavaScript using Google Calendar API to list upcoming events

##Documentation
This project relies on a Google Service Account. This is used so the user requires no authorization to view the events on the calendar.
The calendar needs to be made public, and the check box labelled 'Share only my free/busy information (Hide details)' must be <b>unchecked</b>

To change the calendar that displays on the page. Go to the function <b>makeApiCall()</b> and find 'calendarId'. Then add a new calendar Id of a calendar
you wish to display.

To modify the query for the events being transferred, head over to the Google Calendar API, and look under 'event list'. These are the potential modifications to the query for data.

