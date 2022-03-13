//get the api key
const myKey = 'cbd2cdfdd1f438f29af3417a193151ae';
//const inputVal = input.value;
//connect to openweathermap.com
const apiURL = `https://api.openweathermap.org/data/2.5/weather?id=5607916&appid=${myKey}&units=metric`;

//fetch data and return json
fetch(apiURL)
  .then(response => response.json())
  .then(jsObject => {
    console.log(jsObject);
})
//.catch(() => {
  //msg.textContent = "Please search for a valid city 😩";
//});
