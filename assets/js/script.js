var apiKey = "&APPID=69fc1986ec912e165f8bfed54768b04b";
var queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=";
var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=";
var formEl = $('.form-inline');
var nameInputEl = $('.form-control');
var cityListEl = $('#city-list');
var cityDisplay = $('#current');
var cityTitle = $("<h2>");
var cityTemp = $("<p>");
var cityHumid = $("<p>");
var cityWind = $("<p>");
var cityUVI = $("<p>");

var printCity = function (name) {
  var listEl = $('<li>');
  var listDetail = name;
  listEl.addClass('list-group-item').text(listDetail);
  listEl.appendTo(cityListEl);
};

var handleFormSubmit = function (event) {
  event.preventDefault();

  var nameInput = nameInputEl.val();
  localStorage.setItem("city", nameInput);
 
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
    cityTitle.text(response.name + " " + moment().format("MMM Do YYYY")).appendTo(cityDisplay);
    cityTemp.text("Temperature: " + ((response.main.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F").appendTo(cityDisplay);
    cityHumid.text("Humidity: " + response.main.humidity).appendTo(cityDisplay);
    cityWind.text("Wind Speed: " + response.wind.speed).appendTo(cityDisplay);

    var uviParam = response.coord.lat + "&lon=" + response.coord.lon
    var uviURL = queryURL2 + uviParam + apiKey;

    $.ajax({
        url: uviURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        cityUVI.text("UV Index: ");
        cityUVI.append(
            "<span class='primary'>" +
          response.value +
          "</span>"
        ).appendTo(cityDisplay);


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