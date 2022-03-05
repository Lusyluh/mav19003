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