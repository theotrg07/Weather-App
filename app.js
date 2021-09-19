// SELECTORS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector("notification");


const weather = {};

weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;
const key = "9bb8e44608705302e495ca23fbec8cbd";


if("geolocation" in navigator){
    navigator.geolocationCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coord.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN),
            weather.description = data.weather[0].icon;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })

        .then(function(){
            displayWeather();
        })
}

function displayWeather(){
    iconElement.innerHTML = 
}