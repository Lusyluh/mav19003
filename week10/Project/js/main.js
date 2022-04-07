//get the api key
const apiKey = "cbd2cdfdd1f438f29af3417a193151ae";
const inputval = document.querySelector('#cityinput');
const inputValue = inputval.value;
const btn = document.querySelector('#add');
const msg = document.querySelector('.err-msg')

// //the user can also press enter after the input
// inputval.addEventListener('keypress', setQuery);

// function setQuery(e) {
//     if(e.keyCode == 13) {
//         getWeather(inputval.value);
//     }
// }
//fetch data and return json
btn.addEventListener('click', e =>{

  getForecast(false, null, null);

  e.preventDefault()
  let inputValue = inputval.value;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&&APPID=${apiKey}&units=metric`;
  
  fetch(apiURL)
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    displayResults(data)
    })
  .catch(err => {
    console.log(err);
  });
})
//display current weather data here
function displayResults(weather) {
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
  let desc = document.querySelector('.desc');
  desc.innerText = weather.weather[0].description;
  //get the icon associated with the current weather
  let imagesrc = 'https://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';
  document.getElementById('icon').setAttribute('src', imagesrc);
  document.getElementById('icon').setAttribute('alt', desc);

  // selecting the element and setting the current min and max temperature of city
  let min_max = document.querySelector('.current .hi-low');
  min_max.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

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
//click button to get forecast for the whole week displayed
const checkDaily = document.querySelector('#checkDaily');
checkDaily.addEventListener('click', getForecast)

function getForecast(isGeolocated, latitude, longitude) {
  // fetch the 7 day forecast using this url
  let inputValue = inputval.value;

  let dayURL;

  if(isGeolocated){
    dayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
  }else{
    dayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&APPID=${apiKey}&units=metric`;
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

    //create a new div for the data
    let dayNum = "<div class='grid-container' id='grid-container'>";
        for( let i = 0; i < jsObject.list.length; i++){
          if(jsObject.list[i].dt_txt.includes("18:00:00")){
            let TimeOfData = jsObject.list[i].dt;
            let currentDate = new Date(TimeOfData * 1000);
            let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let dayofWeek = weekday[currentDate.getDay()];
            var icon = jsObject.list[i].weather[0].icon;
            let max_temp = jsObject.list[i].main.temp_max.toFixed(0);
            let min_temp = jsObject.list[i].main.temp_min.toFixed(0);
            dayNum += `<div class="forecast-day">
                    <h4 class="day">${dateBuilder(currentDate)}</h4>
						        <p><img src='http://openweathermap.org/img/wn/${icon}@2x.png'></p>
						        <div class="forecast-day--temp">${max_temp} / ${min_temp}</div>
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
//automatically get weather by geolocation
if('geolocation' in navigator) {

  navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {

  showError('Geolocation is not supported by this browser.')

}

function setPosition(position) {

  let { latitude, longitude} = position.coords;

  getWeatherByGeo(latitude, longitude);

  getForecast(true, latitude, longitude);

}

function showError(error) { 

}

async function getWeatherByGeo(latitude, longitude) {
  try {
      const query = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;
      const res = await fetch(query);
      console.log("res: ", res);
      const weather = await res.json();
      console.log("weather: ", weather);
      displayResults(weather);
  } catch(err) {
      showError(err);
  }
}