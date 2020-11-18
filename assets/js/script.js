var apiKey = "&APPID=69fc1986ec912e165f8bfed54768b04b";
var queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=";
var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=";
var formEl = $('.form-inline');
var nameInputEl = $('.form-control');
var cityListEl = $('#city-list');

var printCity = function (name) {
  var listEl = $('<li>');
  var listDetail = name;
  listEl.addClass('list-group-item').text(listDetail);
  listEl.appendTo(cityListEl);
};

var handleFormSubmit = function (event) {
  event.preventDefault();

  var nameInput = nameInputEl.val();
 
  if (!nameInput) {
    console.log('You need to fill out the form!');
    return;
  }

  printCity(nameInput);

  var weatherURL = queryURL1 + nameInput + apiKey;

  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var uviParam = response.coord.lat + "&lon=" + response.coord.lon
    var uviURL = queryURL2 + uviParam + apiKey;

    $.ajax({
        url: uviURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var forecastURL = queryURL3 + nameInput + apiKey;

        $.ajax({
            url: forecastURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
          });

      });

  });

  // resets form
  nameInputEl.val('');
  
};

formEl.on('submit', handleFormSubmit);