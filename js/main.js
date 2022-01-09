
const links = [
    {label:'WEEK 1',
    url: 'week1/index.html'},
    {label:'WEEK 2',
    url: 'week2/index.html'},
    {label:'WEEK 3',
    url: 'week3/index.html'},
    {label:'WEEK 4',
    url: 'week4/index.html'},
    {label:'WEEK 5',
    url: 'week5/index.html'}

];
append('tc', links);

function append(listId, arr){

    let ol = document.getElementById(listId);

    for (let i = 0; i<arr.length; i++){

        let li = document.createElement("LI");
        let a = document.createElement("A");

        a.setAttribute('href', arr[i].url);
        a.innerHTML = arr[i].label;

        ol.appendChild(li);
        li.appendChild(a);
        
    }
}