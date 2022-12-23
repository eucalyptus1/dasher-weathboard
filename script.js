var searchBtn = document.getElementById("#search-button");
var searchInput = document.getElementById("#search-input");
var currentSection = document.getElementById("#current-section");
var fiveSection = document.getElementById("#five-day-section");



var key = "c118df7a58d35d00efaf3e629f196896";

var currentDate = dayjs().format('MM-D-YYYY, dddd');





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

    var api2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`
    fetch (api2)
    .then(function(response) {
      var data2 = response.json();
      console.log(data2);
      return data2
    })
    .then(function(data2){
      var cityName = data2.city.name;
      var countryAbrv = data2.city.country;
      

      var currentWeather = 
      `<h2>${cityName}, ${countryAbrv}</h2>
      <p>${currentDate}</p>
      <p>${data2.list[0].weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}@2x.png"/>
      <p>Temp: ${data2.list[0].main.temp}&degF</p>
      <p>Humidity: ${data2.list[0].main.humidity}</p>
      <p>Wind Speed: ${data2.list[0].wind.speed}mph</p>`

      currentSection.innerHTML = currentWeather;

      for (var i = 1; i < 5; i++) {

        var date = data2.list[i].dt;
        var newDate = new Date((date + data2.city.timezone) * 1000).toDateString();

        var fiveDay = document.createElement('div');
        
        fiveDay.innerHTML = 
        `<p>${newDate}</p>
        <p>${data2.list[i].weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data2.list[i].weather[0].icon}@2x.png"/>
        <p>Temp: ${data2.list[i].main.temp}&degF</p>
        <p>Humidity: ${data2.list[i].main.humidity}</p>
        <p>Wind Speed: ${data2.list[i].wind.speed}</p>`;
        fiveSection.appendChild(fiveDay);
        };
    })
   })
}

searchBtn.addEventListener("click", searchCity);