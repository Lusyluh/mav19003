/* const form = document.forms['search'];

const input = form.elements.searchInput; //or use a square bracket notationconst input = form['searchInput']
//input.addEventListener('focus', () => alert('focused'),false);

//input.addEventListener('blur', () => alert('blurred'),false);
//the change event will only happen when the user moves the focus away from the element
input.addEventListener('change', () => alert('changed'),false);

//submit event, the JS code will intercept the form before it is sent
//by adding submit event listener
form.addEventListener ('submit', search, false);
function search() {
alert(' Form Submitted');
}
//retrieving and changing values from a form
function search(event) {
    alert(`You Searched for: ${input.value}`);
    event.preventDefault();
    } */

const form = document.forms['hero']
/*The event listener will invoke the makeHero() function when the form is
submitted. This function will return an object based on the information provided
in the form.*/
form.addEventListener('submit', makeHero, false);
function makeHero(event){
    event.preventDefault(); //prevents the form from being submitted

    const hero = {}; //create an empty object

    hero.name = form.heroName.value; //creates a name property based on the input field's value
    alert(JSON.stringify(hero)); //convert object to JSON string and display in alert dialog
    return hero;
}