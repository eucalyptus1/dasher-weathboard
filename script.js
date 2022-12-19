var searchBtn = document.getElementById("#search-button");
var searchInput = document.getElementById("#search-input");
var currentSection = document.getElementById("#current-section");



var key = "c118df7a58d35d00efaf3e629f196896";





function searchCity(event) {
    event.preventDefault();
    var currentCity = searchInput.value;

    fetchLocation(currentCity);


};

function fetchLocation(currentCity) {
  var api = `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&appid=${key}`
  fetch (api)
  .then(function(response) {
    var data = response.json();
    console.log(data);
    return data;
  })
  .then (function(data) {
    var lat = data[0].lat;
    var lon = data[0].lon;

    var api2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
    fetch (api2)
    .then(function(response) {
      var data2 = response.json();
      console.log(data2);
      return data2
    })
    .then(function(data2){
      var cityName = data2.city.name;
      var countryAbrv = data2.city.country;
      var desc = data2.list[0].weather[0].description;

      var currentWeather = `
      <h2>${cityName}, ${countryAbrv}</h2>
      <p>${desc}</p>`

      currentSection.innerHTML = currentWeather;
    })
   })
}

searchBtn.addEventListener("click", searchCity);