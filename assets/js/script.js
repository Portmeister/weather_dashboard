var apiKey = "69fc1986ec912e165f8bfed54768b04b";
var queryURL1 = "http://api.openweathermap.org/data/2.5/weather";
var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi";
var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast";
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

  // resets form
  nameInputEl.val('');
};

formEl.on('submit', handleFormSubmit);