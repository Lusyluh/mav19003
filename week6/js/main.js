const toDoItems = document.querySelector("#to_do_items")[0];
const myInput = document.querySelector("#myInput");

//if user press enter, then call function to add items
myInput.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
    addItem(myInput.value);
    }
});

function addItem(inputValue){
    const divParent = document.createElement("div");
    const divChild = document.createElement("div");
    const txt = document.createElement("p");
    const myInput = document.querySelector("#myInput").value;
    
    divParent.className = "item";   
    txt.textContent = inputValue;
    if (myInput === ''){
        alert("You must add a task!");
    }else{
        document.querySelector("#to_do_items").appendChild(divParent);
    }
    //document.querySelector("#myInput").value = "";

    //create delete and check icons - class names are from font awesome
    var checkedIcon = document.createElement("i");
    var deleteIcon = document.createElement("i");
    checkedIcon.className = "fa-solid fa-circle-check";
    checkedIcon.style.color = "#888";
    checkedIcon.addEventListener("click", function(){
        checkedIcon.style.color = "limegreen";
        txt.style.textDecoration = "line-through";
    })
    // add the icon to the right div
    divChild.appendChild(checkedIcon);

    //create delete icon and add next to the div
    deleteIcon.className = "fa-solid fa-trash-can";
    deleteIcon.style.color = "#888";
    deleteIcon.addEventListener("click", function(){
        divParent.remove();
    })
    divChild.appendChild(deleteIcon);

    divParent.appendChild(txt);
    divParent.appendChild(divChild);

    //clear input to add another item
    document.querySelector("#myInput").value = "";

}