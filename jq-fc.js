$(document).ready(function() {
  //var modal = document.getElementById('modal'); 
  //var title = document.getElementById('title');
  var date;
  //var description = document.getElementById('description');
  var modalBanner = document.getElementById('modal-banner');
  //var overlay = document.getElementById('overlay');
  //var hover = false;
  
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    timeFormat: 'H:mm',
    columnFormat: 'ddd D', //formats date on columns of calendar
    eventLimit: true,
    eventSources: [
    {
      url: 'events.php',
    },
    {  
      url: 'sports.php',
      color: '#257E4A'
    }
    ],
    allDayDefaul: true,
    eventClick: function(calEvent, jsEvent, view) {
      $('#modal').css('display', 'block');
      $('#overlay').css('display', 'block');
      console.log($(this).css('background-color'));
      //$('modalBanner').css('background-color', $(this).css('background-color'));
      modalBanner.style.background = $(this).css('background-color');
      $('#title').text(calEvent.title); 
      date = moment(calEvent.start).format('MMMM Do YYYY, h:mm:ss a');
      $('#date').text(date);
      if (calEvent.description === null) {
        calEvent.description = ' ';
      }
      $('#description').text(calEvent.description);
      //stopPropagation stops a click event bubbling through the DOM and acting on underlying elements
      $('#close').click(function(e) {
        e.stopPropagation();
        console.log("Event listener running");
        overlay.style.display = 'none';
      });
      $(overlay).click(function(e) {
        e.stopPropagation();
        console.log("Overlay clicked");
        overlay.style.display = 'none';
      });
      $('#modal').click(function(e) {
        e.stopPropagation();
        $('#overlay').css('display', 'block');
      });
    },
    eventMouseover: function(calEvent, jsEvent) {
      $(this).css('cursor', 'pointer'); 
      //modal.style.display = 'block';  
    },
    eventMouseout: function(calEvent) {
    }
  });
  //Handles list view
  if (document.getElementById('upcoming')) {
    //Append the 3 most upcoming events to a list in a div id="upcoming"
    $.getJSON( "events.php", function (data) {
      displayList('upcoming', data);
    });
  }
  if (document.getElementById('upcoming-sports')) {
    console.log("Upcoming sports div found");
    $.getJSON('sports.php', function (data) {
      displayList('upcoming-sports', data);
    });
  }
});

function displayList(category, data) {
    var upcoming = document.getElementById(category);
    var maxResults = 3;
    for (var i = 0; i < maxResults; i++) {
      var li = document.createElement('li');
      var h3 = document.createElement('h3');

      h3.appendChild(document.createTextNode(data[i].title));
      h3.setAttribute('id', 'list-title');
      li.appendChild(h3);
      upcoming.appendChild(li);

      var date = data[i].start;
      var listEndDate = data[i].end;
      console.log(listEndDate, "end date");
      

      if (!date) {
        date = data[i].start;
      }
      date = moment(date).format('MMMM Do YYYY, h:mm:ss a');

      var time;
      time = date.split(',')[1];
      date = date.split(',')[0];

      if (listEndDate.split('T')[1]) {
        time = time + " - " + moment(listEndDate).format('h:mm a');
      }

      if (i === maxResults - 1) {
        li.setAttribute('id', 'list-bottom');
      } else {
        li.style.borderBottom = 'dotted 1px #DDD';
      }
      var listDate = document.createElement('p');
      var listTime = document.createElement('p');
      listTime.setAttribute('id', 'list-time');
      listTime.appendChild(document.createTextNode(time));
      listDate.setAttribute('id', 'list-date');
      listDate.appendChild(document.createTextNode(date));
      li.appendChild(listDate);
      li.appendChild(listTime);
    }

}
