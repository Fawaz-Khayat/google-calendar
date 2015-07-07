var apiKey = 'AIzaSyBnv4Qew7NmjUUW-7tJ21dBCV7l2-bN_Nc';
var clientId = '837078947181-cua2g11v5hpbgfeaaq8buacdg935t2sj.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/calendar';

//Handles authorization

//function called when javascript client library loads
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeOut(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    makeApiCall();
  } else {
  }
}


//called on button click, calls library authorize method
function handleAuthClick(event) {
  gapi.auth.authorize(
    {
      client_id: clientId,
      scope: scopes,
      immediate: false
    },
    handleAuthResult);
    return false;
}

//request data
function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var d = new Date();
    d = d.toISOString();
    d = d.split(".")[0] + "Z";
    console.log(d, ' = date');
    var request = gapi.client.calendar.events.list({
      'calendarId': 'ed.prince5769@gmail.com',
      'timeMin': d,
      'orderBy': 'startTime',
      'singleEvents': 'true',
      'maxResults': 10
     });

    request.execute(function(resp) {
      //function that calculates current date and only keeps values of 


      //Set the max number of items to display
      //loop over all results, appending summary and date to the list element
      for (var i = 0; i < resp.items.length; i++) {
        console.log(resp.items[i].summary);
        console.log(resp.items[i].description);
        
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(resp.items[i].summary));
        document.getElementById('events').appendChild(li);
        var br = document.createElement('br');
        //li.appendChild(br);
        var p = document.createElement('p');
        p.className = 'date';
        li.appendChild(p);

        var date = (resp.items[i].start.date);

        //Reverse format of the date from yyyy-mm-dd to dd-mm-yyyy to make  more readable
        date = date.split('-').reverse().join("-");

        //Present date in language format
        var date0 = date.split('-')[0];
        var date1 = date.split('-')[1];
        var date2 = date.split('-')[2]; 
        var dateEnding;

        if (date0.charAt(0) === '1') {
          dateEnding = 'th';
        } else {
          switch (date0.charAt(1)) {
            case '1':
              dateEnding = 'st';
              break;
            case '2':
              dateEnding = 'nd';
              break;
            case '3':
              dateEnding = 'rd';
              break;
            case '4':
              dateEnding = 'th';
              break;
            case '5': 
              dateEnding = 'th';
              break;
            case '6':
              dateEnding = 'th';
              break;
            case '7':
              dateEnding = 'th';
              break;
            case '8':
              dateEnding = 'th';
              break;
            case '9':
              dateEnding = 'th';
              break;
            case '0':
              dateEnding = 'th';
              break;
          }
        }
        if (date0.charAt(0) === '0') {
          date0 = date0.substring(1);
        }

        var month;

        switch (date1) {
          case '01':
            month = 'January';
            break;
          case '02':
            month = 'February';
            break;
          case '03':
            month = 'March';
            break;
          case '04':
            month = 'April';
            break;
          case '05':
            month = 'May';
            break;
          case '06':
            month = 'June';
            break;
          case '07':
            month = 'July';
            break;
          case '08':
            month = 'August';
            break;
          case '09':
            month = 'September';
            break;
          case '10':
            month = 'October';
            break;
          case '11':
            month = 'November';
            break;
          case '12':
            month = 'December';
            break;
        }

        date = date0 + dateEnding +  " " + month + " " + date2;
        console.log(date); 






        p.appendChild(document.createTextNode(date));
        p.style.color = '#AEAEAE'; 
        p.style.marginTop = '0';
        p.style.marginBottom = '0';
        p.style.fontSize = 'small';
      
        console.log(resp.items[i].start.date);
      }
    });
  });
}

//calculate unix timestamp from an input x
function calculateUnixTimestamp(x) {
  return Date.parse(x)/1000;
}

//make sure page is loaded before executing code
window.addEventListener('load', function() {  
  handleAuthClick();  
});
