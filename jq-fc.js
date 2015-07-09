$(document).ready(function() {
  var modal = document.getElementById('modal'); 
  var title = document.getElementById('title');
  var date = document.getElementById('date');
  
  $('#calendar').fullCalendar({
    events: 'calendar.php',
    eventClick: function(calEvent, jsEvent, view) {
    },
    eventMouseover: function(calEvent, jsEvent) {
      $(this).css('cursor', 'pointer'); 
      modal.style.display = 'block';  
      title.innerText = calEvent.title; 
      modal.style.left = jsEven.ttarget.position().left + "px";
      modal.style.top = jsEvent.target.position().top + "px";
    },
  eventMouseout: function(calEvent) {
    modal.style.display = 'none';
  }
  });
  console.log(modal.
});
