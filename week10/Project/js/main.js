//get the api key
//const myKey = "de2541487961a6575b9b3b199b422c45"
const inputval = document.querySelector('#cityinput');
const inputValue = inputval.value;
const btn = document.querySelector('#add');
const msg = document.querySelector('.err-msg')
//connect to openweathermap.com


//fetch data and return json
btn.addEventListener('click', e =>{
  e.preventDefault()
  let inputValue = inputval.value;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=cbd2cdfdd1f438f29af3417a193151ae&units=metric`;
  fetch(apiURL)
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    displayResults(data)
    //document.getElementById('temp').textContent = data.main.temp;
    //let myCity = document.querySelector('.location .myCity');
    //myCity.innerText = `${data.name}, ${data.sys.country}`;
    })
  
  .catch(() => {
    msg.textContent = "Please search for a valid city";})
  })
//data to fetch and display
const displayResults = (weather) =>{
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
  document.getElementById('icon').setAttribute('src',imagesrc);
  document.getElementById('icon').setAttribute('alt',desc);

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