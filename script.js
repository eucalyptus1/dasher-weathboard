var searchBtn = document.getElementById("#search-button");
var searchInput = document.getElementById("#search-input");

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
}

// function fetchWeather(currentCity) {
//    var api = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
//    fetch (api)
//    .then(function(response) {

//     var data = response.json();
//     console.log(data);
//     return data;
//    })

// }

searchBtn.addEventListener("click", searchCity);