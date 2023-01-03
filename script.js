var searchBtn = document.getElementById("#search-button");
var searchInput = document.getElementById("#search-input");
var currentSection = document.getElementById("#current-section");
var fiveSection = document.getElementById("#five-day-section");
var historyList = document.getElementById("#history-list");

historyArr = [];

var key = "c118df7a58d35d00efaf3e629f196896";

// var currentDate = dayjs().format('MM-D-YYYY, dddd');

// var weatherHistory = JSON.parse(localStorage.getItem("weatherHistory"));
// if (weatherHistory) {
//   for (var i = 0; i < weatherHistory.length; i++) {
//     var hist = weatherHistory[i];
//     var historyBtn = document.createElement("button");
//     historyBtn.innerText = hist;
//     historyList.appendChild(historyBtn);
//     historyBtn.addEventListener("click", fetchLocation);
//   }
// }



function searchCity(event) {
    event.preventDefault();
    var currentCity = searchInput.value;

    fetchLocation(currentCity);


};

function fetchLocation(currentCity) {
  fiveSection.innerHTML="";
  searchInput.value = "";
  var api = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${key}`
  fetch (api)
  .then(function(response) {
    var data = response.json();
    console.log(data);
    return data;
  })
  .then (function(data) {

      var cityName = data.city.name;
      var countryAbrv = data.city.country;

      var date = data.list[0].dt;
      var currentDate = new Date((date + data.city.timezone) * 1000).toDateString();
      

      var currentWeather = 
      `
      <h2>${cityName}, ${countryAbrv}</h2>
      <p>${currentDate}</p>
      <p>${data.list[0].weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"/>
      <p>Temp: ${data.list[0].main.temp}&degF</p>
      <p>Humidity: ${data.list[0].main.humidity}</p>
      <p>Wind Speed: ${data.list[0].wind.speed}mph</p>`
  
      currentSection.innerHTML = currentWeather;

      historyArr.push(cityName);
      localStorage.setItem("weatherHistory", JSON.stringify(historyArr));
      var historyBtn = document.createElement("button");
      historyBtn.innerText = cityName;
      historyList.appendChild(historyBtn);
      historyBtn.addEventListener("click", fetchLocation);


      var clear = document.createElement("button");
      clear.innerText = "Clear History";
      clear.addEventListener("click", clearHistory);

      function clearHistory() {
        historyList.innerHTML = "";
        localStorage.clear();
      };


      
      console.log(historyArr);


    //  5 day forecast
      

      for (var i = 0; i < 5; i++) {

      var newDate = data.list[i].dt;
      var fiveDate = new Date((newDate + data.city.timezone) * 1000).toDateString();
       
        

        var fiveDay = document.createElement('div');
        
        fiveDay.innerHTML = 
        `<div class="weather-card">
        <p>${fiveDate}</p>
        <p>${data.list[i].weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>
        <p>Temp: ${data.list[i].main.temp}&degF</p>
        <p>Humidity: ${data.list[i].main.humidity}</p>
        <p>Wind Speed: ${data.list[i].wind.speed}</p>
        </div>`;
        fiveSection.appendChild(fiveDay);
        };
    })
}

searchBtn.addEventListener("click", searchCity);