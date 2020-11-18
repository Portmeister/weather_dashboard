var apiKey = "&APPID=69fc1986ec912e165f8bfed54768b04b";
var queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=";
var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=";
var formEl = $('.form-inline');
var nameInputEl = $('.form-control');
var cityListEl = $('#city-list');
var cityDisplay = $('#current');
var cityUviDisplay = $('#uvIndex');
var cityForecastDisplay = $('#forecast')
var cityTitle = $("<h2>");
var cityTemp = $("<p>");
var cityHumid = $("<p>");
var cityWind = $("<p>");
var cityUVI = $("<p>");
var dayOne = $("<div class='secondary'>");
var dayOneDate = $("<h3>");
var dayOneTemp = $("<p>");
var dayOneHumid = $("<p>");
var dayTwo = $("<div class='secondary'>");
var dayTwoDate = $("<h3>");
var dayTwoTemp = $("<p>");
var dayTwoHumid = $("<p>");
var dayThree = $("<div class='secondary'>");
var dayThreeDate = $("<h3>");
var dayThreeTemp = $("<p>");
var dayThreeHumid = $("<p>");
var dayFour = $("<div class='secondary'>");
var dayFourDate = $("<h3>");
var dayFourTemp = $("<p>");
var dayFourHumid = $("<p>");
var dayFive = $("<div class='secondary'>");
var dayFiveDate = $("<h3>");
var dayFiveTemp = $("<p>");
var dayFiveHumid = $("<p>");

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
    cityHumid.text("Humidity: " + response.main.humidity + "%").appendTo(cityDisplay);
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
        ).appendTo(cityUviDisplay);


        var forecastURL = queryURL3 + nameInput + apiKey;

        $.ajax({
            url: forecastURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            dayOne.append(dayOneDate.text(moment().add(1, 'days').format('dddd')), dayOneTemp.text("Temp: " + ((response.list[5].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F"), dayOneHumid.text("Humidity: " + response.list[5].main.humidity + "%"));
            dayTwo.append(dayTwoDate.text(moment().add(2, 'days').format('dddd')), dayTwoTemp.text("Temp: " + ((response.list[13].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F"), dayTwoHumid.text("Humidity: " + response.list[13].main.humidity + "%"));
            dayThree.append(dayThreeDate.text(moment().add(3, 'days').format('dddd')), dayThreeTemp.text("Temp: " + ((response.list[21].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F"), dayThreeHumid.text("Humidity: " + response.list[21].main.humidity + "%"));
            dayFour.append(dayFourDate.text(moment().add(4, 'days').format('dddd')), dayFourTemp.text("Temp: " + ((response.list[29].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F"), dayFourHumid.text("Humidity: " + response.list[29].main.humidity + "%"));
            dayFive.append(dayFiveDate.text(moment().add(5, 'days').format('dddd')), dayFiveTemp.text("Temp: " + ((response.list[37].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F"), dayFiveHumid.text("Humidity: " + response.list[37].main.humidity + "%"));
            cityForecastDisplay.append(dayOne, dayTwo, dayThree, dayFour, dayFive);
          });

      });

  });

  // resets form
  nameInputEl.val('');
  
};

formEl.on('submit', handleFormSubmit);