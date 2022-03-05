function myAlert() {
    alert("Hello! I am an alert box!");
  }
//for the window.confirm property
function myConfirm() {
  let text = "Would you like to be a programmer?\nEither OK or Cancel.";
  if (confirm(text) == true) {
    text = "You pressed OK! Good luck!";
  } else {
    text = "You canceled, your loss!";
  }
  document.getElementById("exConfirm").innerHTML = text;
}
//window.prompt property
const myPrompt = () => {
    let person = prompt("Please enter your name", "Harry Potter");
    if (person != null) {
      document.getElementById("ex-prompt").innerHTML =
      "Hello " + person + "! How are you today?";
    }
  }
//window location object
//The origin property returns the protocol, hostname and port number of a URL.
let origin = location.origin;
document.getElementById("origin").innerHTML = origin;

/*creating cookies
The function below sets a new cookie with parameters:name of the cookie (cname), the value of the cookie (cvalue), 
and the number of days until the cookie should expire (exdays).
The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.*/

const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
//returns the value of the specified cookie
const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//check if the cookie is set, it true it will display a greeting else a prompt box
//will appear asking for the users name, stores it for 365 days
const checkCookie = () => {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}

//animation using setInterval() function to increase the value of the angle by 2
const anime = () => {
const squareElement = document.querySelector('.square');
let angle = 0;
setInterval( () => {
angle = (angle + 2) % 360;
squareElement.style.transform = `rotate(${angle}deg)`
}, 1000/60);

}
//stop the animation
const stopAnime = () =>{
    let myVar = anime();
    clearInterval(myVar);
}