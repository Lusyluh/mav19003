
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
    url: 'week5/index.html'},
    {label:'WEEK 6: TO-DO LIST',
    url: 'week6/index.html'},
    {label:'WEEK 7',
    url: 'week7/index.html'},
    {label:'WEEK 8',
    url: 'week8/w8notes.html'},
    {label:'WEEK 9',
    url: 'week9/w9notes.html'},
    {label:'WEEK 10',
    url: 'week10/w10notes.html'}

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