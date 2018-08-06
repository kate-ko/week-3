$( document ).ready(function() {
    $('button').click(function () {
        var name = $('#my-input').val();
        $('ul').append('<li>' + name + '</li>');
        bindEvents();
      });
      
      var bindEvents = function () {
        $('li').click(function () {
            console.log("invoked");  
          $(this).remove();
        });
      }
    });
