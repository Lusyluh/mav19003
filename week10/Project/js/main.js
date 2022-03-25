//get the api key
//const myKey = "de2541487961a6575b9b3b199b422c45"
const inputval = document.querySelector('#cityinput');
const inputValue = inputval.value;
const btn = document.querySelector('#add');
//connect to openweathermap.com


//fetch data and return json
btn.addEventListener('click', e =>{
  e.preventDefault()
  let inputValue = inputval.value;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=cbd2cdfdd1f438f29af3417a193151ae&units=imperial`;
  fetch(apiURL)
  .then(response => response.json())
  .then(data => console.log(data))
  //.then(jsObject => {
    //console.log(jsObject);
//})
//.catch(() => {
  //msg.textContent = "Please search for a valid city 😩";
});
