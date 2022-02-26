//fetch the data from an external source and return it in JSON format
const = url {
    base: 'https://swapi.dev/api/',
    people: 'people/',
    url: "https://swapi.dev/api/people/1/",
};
function getJSON(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
