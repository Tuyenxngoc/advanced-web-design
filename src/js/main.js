$(function () {
  $("#header").load("../components/header.html");
  $("#navbar").load("../components/navbar.html");
});

$(document).ready(function() {
  $(document).click(function(event) {
      var $target = $(event.target);
      var $logoutElement = $('#logout-id');

      if (!$target.closest('#user-dropdown').length && $logoutElement.hasClass('show')) {
          $logoutElement.collapse('hide');
      }
  });
});

