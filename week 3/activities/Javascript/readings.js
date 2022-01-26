// let  user = {
//    name: "Lusanda",
//     age: "21",


// sayHi(){
//     alert(this.name);
// }
// };
// user.sayHi();


//exercise---create a calculator

let calculator = {
    read(){
        this.a = +prompt('a?',0);
        this.b = +prompt('b?',0);

    },
    sum(){
        return this.a + this.b;
    },
    mul(){
        return this.a * this.b;
    }
};
calculator.read();
alert(calculator.sum());
alert(calculator.mul());
