var fetch = function (searchData) {
    var googleapis = 'https://www.googleapis.com/books/v1/volumes?q=:';
    var url = googleapis + searchData;

    $.ajax({
      method: "GET",
      url: url,
      success: function(data) {
        showBooks(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); 
  };

function showBooks(data) {
  $(".books").empty();
  var obj, source, template, newHTML;
  var numBooksToShow = Math.min(5, data.items.length);

  for (let i = 0; i < numBooksToShow; i++) {
    obj = data.items[i].volumeInfo;
    source = $('#book-template').html();
    template = Handlebars.compile(source);
    newHTML = template(obj);
    $('.books').append(newHTML);
  }
}

$(".search-book").on("click", function() {
  var searchData = $("#searchData").val();
  fetch(searchData);
});

$(".books").on("click",".title", function() {
  $(this).closest("div").find(".book-info").toggleClass('show');
});

$(document).ready(function () {
  $(document).ajaxStart(function () {
      $("#loading").show();
  }).ajaxStop(function () {
      $("#loading").hide();
  });
});