//get the api key
const apiKey = "cbd2cdfdd1f438f29af3417a193151ae";
const inputval = document.querySelector('#cityinput');
const btn = document.querySelector('#add');
const msg = document.querySelector('.err-msg')
const base ="https://api.openweathermap.org/data/2.5/";

//automatically get weather by geolocation
if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  showError('Geolocation is not supported by this browser.')
}
//get user's current position using lat and long
function setPosition(position) {
  let { latitude, longitude} = position.coords;
  getWeatherByGeo(latitude, longitude);
  getForecast(true, latitude, longitude, inputval.value);
}
function showError(error) { 
}
//fetch weather using geo location
async function getWeatherByGeo(latitude, longitude) {
  try {
      const query = `${base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;
      const res = await fetch(query);
      console.log("res: ", res);
      const weather = await res.json();
      console.log("weather: ", weather);
      renderCondition(weather);
      displayCurrentWeather(weather);
  } catch(err) {
      showError(err);
  }
}
//event listener for getting favorite city from local storage
let faveCity = document.querySelector('#fave');
faveCity.addEventListener('click',e =>{
  let faveCity = document.querySelector('#fave');
  faveCity.innerHTML = localStorage.getItem('Favorite');
  getForecast(false, null, null,localStorage.getItem('Favorite'));

  e.preventDefault()
  let inputValue = localStorage.getItem('Favorite');
  const apiURL = `${base}weather?q=${inputValue}&&APPID=${apiKey}&units=metric`;
  
  fetch(apiURL)
  .then(response => response.json())
  .then(data =>{
    console.log(data.main);
    renderCondition(data);
    localStorage.setItem("Favorite", data.name);
    displayCurrentWeather(data)
    
    })
  .catch(err => {
    console.log(err);
  });
})
//click this button to fetch data of the city and return json
btn.addEventListener('click', e =>{

  getForecast(false, null, null, inputval.value);

  e.preventDefault()
  let inputValue = inputval.value;
  const apiURL = `${base}weather?q=${inputValue}&&APPID=${apiKey}&units=metric`;
  
  fetch(apiURL)
  .then(response => response.json())
  .then(data =>{
    console.log(data.main);
    renderCondition(data);
    localStorage.setItem("Favorite", data.name);
    displayCurrentWeather(data)
    
    })
  .catch(err => {
    console.log(err);
  });
})
//render weather conditions
function renderCondition (weather){
  let conditions = document.querySelector('#weatherDetails');
      conditions.innerHTML = `
                          <ul class = "list-unstyled list-group">
                          <li class="list-group-item"><span class="wi wi-humidity"></span> Feels Like </a>
                          <a><span class="pull-right humiditySide">${weather.main.feels_like}</span></a>
                          </li>
                          <li class="list-group-item"><a><span class="wi wi-humidity"></span> Humidity </a>
                          <a><span class="pull-right humiditySide">${weather.main.humidity}%</span></a>
                          </li>
                          <li class="list-group-item"><a><span class="wi wi-thermometer"></span> Min Temperature </a><a><span class="pull-right minSide celsi">$${Math.round(weather.main.temp_min)}&deg;C</span></a></li>
                          <li class="list-group-item"><a><span class="wi wi-thermometer"></span> Max Temperature </a><a><span class="pull-right maxSide celsi">${Math.round(weather.main.temp_max)}°c &deg;C</span></a></li>
                          <li class="list-group-item"><a><span class="wi wi-raindrop"></span> Weather Condition </a><a><span class="pull-right cloudiSide" style="text-transform: capitalize;">${weather.weather[0].main}</span></a></li>
                          <li class="list-group-item"><a><span class="wi wi-wind-direction"></span> Wind Direction </a><a><span class="pull-right windDirecSide">${windDirection(weather.wind.deg)}</span></a></li>
                          <li class="list-group-item"><a><span class="wi wi-windy"></span> Wind Speed </a><a><span class="pull-right windSpeedSide">${weather.wind.speed} meter/sec &nbsp;</span></a></li>
                          <li class="list-group-item"><a><span class="wi wi-sunrise"></span> Sunrise / Sunset </a><a><span class="pull-right sunsetSide">${niceTime(weather.sys.sunset, weather.timezone)} </span> <span class="pull-right sunriseSide">${niceTime(weather.sys.sunrise, weather.timezone)}/</span></a></li>                      
                          </ul>
      `
}
//display current weather data here
function displayCurrentWeather(weather) {
  let myCity = document.querySelector('.location .myCity');
  myCity.innerText = `${weather.name}, ${weather.sys.country}`;

  //get the current date and display it as Day Month Date and year
  let todayDate = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(todayDate);

  //get the temperature, weather and weather description
  let temperature = document.querySelector('.temp');
  temperature.textContent = `${Math.round(weather.main.temp)}°c`;

  let currentWeather = document.querySelector('.weather');
  currentWeather.textContent = weather.weather[0].main;

  //get the icon associated with the current weather
  let imagesrc = 'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
  document.getElementById('icon').setAttribute('src', imagesrc);
  document.getElementById('icon').setAttribute('alt', desc);

}


// returns today's date
const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
}
//determine wind direction
function windDirection(degrees) {
  let direction = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

  degrees = Math.round(degrees + 11.25) % 360;
  let index = Math.floor(degrees / 22.5);
  return direction[index];
}
//  Strip and get the HH:MM:SS AM/PM from the date
function niceTime(time, offset) {
  let day = new Date(time * 1000 + offset);
  day = day.toLocaleString();
  let ampm = day.indexOf('M', 11) + 1;
  return day.substring(11, ampm);
}
//click button to get forecast for the whole week displayed
const checkDaily = document.querySelector('#checkDaily');
checkDaily.addEventListener('click', getForecast)

//get 5 day extended forecast
function getForecast(isGeolocated, latitude, longitude, input) {
  let inputValue = input;
  let dayURL;
  //fetch forecast for the geolocation or else get for using city name
  if(isGeolocated){
    dayURL = `${base}forecast?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
  }else{
    dayURL = `${base}forecast?q=${inputValue}&APPID=${apiKey}&units=metric`;
  }
   fetch(dayURL)
  .then(res => res.json())
  .then(jsObject => {
    console.log(jsObject);
    
    //connect the html
    let forecastEl = document.querySelector('#forecast');

    // fetch container div if it exists
    let gridContainer = document.querySelector('#grid-container');

    // clear the container element if it exists
    if(gridContainer){

      gridContainer.parentNode.removeChild(gridContainer);

    }

    //create a new div for the 5 day forecast data 
    let dayNum = "<div class='grid-container' id='grid-container'>";
        for( let i = 0; i < jsObject.list.length; i++){
          if(jsObject.list[i].dt_txt.includes("18:00:00")){
            let TimeOfData = jsObject.list[i].dt;
            let currentDate = new Date(TimeOfData * 1000);
            let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let dayofWeek = weekday[currentDate.getDay()];
            let icon = jsObject.list[i].weather[0].icon;
            let max_temp = Math.round(jsObject.list[i].main.temp_max);
            let min_temp = Math.round(jsObject.list[i].main.temp_min);
            dayNum += `<div class="forecast-day">
                    <h4 class="day">${dayofWeek}</h4>
						        <p><img src='http://openweathermap.org/img/wn/${icon}@2x.png'></p>
						        <div class="ctemp-0"><span class="celsi" style="color:red;">${max_temp}&deg;</span> / ${min_temp}&deg;</div>
                    <div class="forecast-descr">${jsObject.list[i].weather[0].description}</div>
					          </div>`;
                  }
        }
        dayNum += "</div>";
        //  display data into a web page
        forecastEl.innerHTML += dayNum;
		})
    .catch(err => {

      msg.textContent = "Please search for a valid city";
      console.log(err);
    })
}

