var searchBtn = document.getElementById("#search-button");
var searchInput = document.getElementById("#search-input");
var currentSection = document.getElementById("#current-section");
var fiveSection = document.getElementById("#five-day-section");
var historyList = document.getElementById("#history-list");

historyArr = [];

var key = "c118df7a58d35d00efaf3e629f196896";

// var currentDate = dayjs(date * 1000).format('MM-D-YYYY, dddd');

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
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;

    console.log(lat);
    console.log(lon);
    var apiTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
    fetch (apiTwo)
    .then(function(response) {
      var data2 = response.json();
      console.log(data2);
      return data2;
    })
      .then(function(data2) {
      var cityName = data2.city.name;
      var countryAbrv = data2.city.country;

      // var date = dayjs.unix(data2.list[0].dt).format("MM-DD-YYYY");
      var date = data2.list[0].dt;
      // var currentDate = new Date((date + data.city.timezone) * 1000).toDateString();
      
      
      

      var currentWeather = 
      `
      <h2>${cityName}, ${countryAbrv}</h2>
      <p>${date}</p>
      <p>${data2.list[0].weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}@2x.png"/>
      <p>Temp: ${data2.list[0].main.temp}&degF</p>
      <p>Humidity: ${data2.list[0].main.humidity}</p>
      <p>Wind Speed: ${data2.list[0].wind.speed}mph</p>`
  
      currentSection.innerHTML = currentWeather;

    //   historyArr.push(cityName);
    //   localStorage.setItem("weatherHistory", JSON.stringify(historyArr));
    //   var historyBtn = document.createElement("button");
    //   historyBtn.innerText = cityName;
    //   historyList.appendChild(historyBtn);
    //   historyBtn.addEventListener("click", fetchLocation);


    //   var clear = document.createElement("button");
    //   clear.innerText = "Clear History";
    //   clear.addEventListener("click", clearHistory);

    //   function clearHistory() {
    //     historyList.innerHTML = "";
    //     localStorage.clear();
    //   };


      
    //   console.log(historyArr);


    //  5 day forecast
      

      for (var i = 1; i < data2.list.length; i+=8) {

      // var fiveDate = data.list[i].dt;
      // var fiveDate = new Date((newDate + data.city.timezone) * 1000).toDateString();
       
        var fiveDay = document.createElement('div');

        // var time = dayjs(data.list[i].dt * 1000).format('MM-D-YYYY, dddd');

        
        
        fiveDay.innerHTML = 
        `<div class="weather-card">
        <p>${data2.list[i].dt_txt}</p>
        <p>${data2.list[i].weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data2.list[i].weather[0].icon}@2x.png"/>
        <p>Temp: ${data2.list[i].main.temp}&degF</p>
        <p>Humidity: ${data2.list[i].main.humidity}</p>
        <p>Wind Speed: ${data2.list[i].wind.speed}</p>
        </div>`;
        fiveSection.appendChild(fiveDay);
        };
    })
  })
}

searchBtn.addEventListener("click", searchCity);