//get the api key
const apiKey = "cbd2cdfdd1f438f29af3417a193151ae";
const inputval = document.querySelector('#cityinput');
const inputValue = inputval.value;
const btn = document.querySelector('#add');
const msg = document.querySelector('.err-msg')

//connect to openweathermap.com


//fetch data and return json
btn.addEventListener('click', e =>{
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

  // fetch the 7 day forecast using this url
  const dayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&APPID=${apiKey}&units=metric`;
  fetch(dayURL)
  .then(res => res.json())
  .then(jsObject => {
    console.log(jsObject);
    
    //connect the html
    let forecastEl = document.querySelector('#forecast');
    //create a new div for the data
    let dayNum = "<div class='grid-container'>";
        for( let i = 0; i < jsObject.list.length; i++){
          if(jsObject.list[i].dt_txt.includes("18:00:00")){
            let TimeOfData = jsObject.list[i].dt;
            let currentDate = new Date(TimeOfData * 1000);
            let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let dayofWeek = weekday[currentDate.getDay()];
            var icon = jsObject.list[i].weather[0].icon;
            var temp = jsObject.list[i].main.temp.toFixed(0);
            dayNum += `<div class="forecast-day">
                    <p>${dayofWeek}</p>
						        <p>Forecast: <img src='http://openweathermap.org/img/wn/${icon}@2x.png'> ${jsObject.list[i].weather[0].description}</p>
						        <div class="forecast-day--temp">${temp}<sup>°C</sup></div>
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
  let temperature = document.getElementById('temp');
  temperature.textContent = weather.main.temp;
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
