
const city_country = document.querySelector('.city-country');
const temp = document.querySelector('.temperature ');
const description = document.querySelector('.description p');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const notification = document.querySelector('.notification');
const weatherIcon = document.querySelector('.icon');
const temperature = document.querySelector('temperature p');
const container = document.querySelector('.container');

const weather = {};

// weather.temperature = {
//     unit: 'celsius'
// };

KELVIN = 273;
 
const key = '9bb8e44608705302e495ca23fbec8cbd';
    


// CHECK IF BROWSER SUPPORTS GEOLOCATION SERVICES
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notification.style.display = 'block';
    notification.innerHTML = "<p>Browser doesn't support GeoLocation</p>";
}

// GET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error){
    notification.style.display = 'block';
    notification.innerHTML = `<p>${error.message}</p>`
    container.style.height = '130vh';
    
}


function getWeather(latitude, longitude){
    let api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`; 
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })

        .then(function(data){
            weather.city = data.name;
            weather.country = data.sys.country
            weather.iconId = data.weather[0].icon;
            weather.temperature = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.feelsLike = Math.floor(data.main.feels_like - KELVIN);
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;           
        })

        .then(function(){
            displayWeather()
        })
}

function displayWeather() {
    city_country.textContent = `${weather.city}, ${weather.country}`;
    weatherIcon.innerHTML = `<img src="icons/${weather.iconId}.png">`;
    temp.innerHTML = `${weather.temperature}°<span>C</span>`;
    description.textContent = `${weather.description}`;
    feelsLike.innerHTML = `<p>Feels like: ${weather.feelsLike}<span>°</span>C</p>`;
    wind.innerHTML = `<p>Wind: ${weather.wind}<span>m/s</span></p>`;
    humidity.innerHTML = `<p>Humidity: ${weather.humidity}<span>%</span><p>`
}