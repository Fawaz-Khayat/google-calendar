$(document).ready(function() {
  var modal = document.getElementById('modal'); 
  var title = document.getElementById('title');
  var date = document.getElementById('date');
  var description = document.getElementById('description');
  var modalLine = document.getElementById('modal-line');
  
  $('#calendar').fullCalendar({

    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    eventLimit: true,
    events: 'calendar.php',
    eventClick: function(calEvent, jsEvent, view) {
    },
    eventMouseover: function(calEvent, jsEvent) {
      $(this).css('cursor', 'pointer'); 
      modal.style.display = 'block';  
      modalLine.style.background = $(this).css("background-color");
      title.innerText = calEvent.title; 
      date.innerText = (moment(calEvent.start).format('MMMM Do YYYY, h:mm:ss a'));
      description.innerText = calEvent.description;
      modal.style.left = jsEvent.pageX + "px";
      modal.style.top = jsEvent.pageY + "px";
    },
    eventMouseout: function(calEvent) {
    modal.style.display = 'none';
    }
  });
});
