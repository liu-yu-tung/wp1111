console.log("Hello World");
var p = document.getElementsByClassName('plus')[0];
var q = document.getElementById("pppp");

if (p) {
    console.log("true");
    p.onclick = function() {
        console.log("clicked");
        createNewPeople();    
        console.log(Person.count);
    }
}
else {
    console.log("false");
}

class Person {
    constructor(self, name, path) {
        this.self = self;
        this.name = name;
        this.path = path;
        console.log("construct ", this.name, " == ", this.self);
    }
    static count = 0;
    static get_count() {
        console.log("count = ", count);
        return count;
    }
}
/*
var people = new Array();

for (var i=0; i<16; i++) {
    people.push(new Person(true, i, "./"));
}
*/

function createNewPeople() {
    if (Person.count <= 15) {
        const newPeople = document.createElement("div");
        newPeople.className= "Person";
        newPeople.innerHTML = Person.count;
        var board = document.getElementsByClassName("board");
        board[0].appendChild(newPeople);
        Person.count ++;
    }
    else {
        console.log("already 15");
    }
};