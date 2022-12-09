var searchBtn = document.getElementById("#search-button");
var searchInput = document.getElementById("#search-input");

var key = "c118df7a58d35d00efaf3e629f196896";




function searchCity(event) {
    event.preventDefault();
    var currentCity = searchInput.value;
    console.log(currentCity);
    return currentCity
    


};

searchBtn.addEventListener("click", searchCity);