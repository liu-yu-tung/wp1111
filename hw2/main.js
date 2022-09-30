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

createYou();

function createYou() {
    var you_instance = new Person(true, "you", "./");
    const you_html = document.createElement("div");
    you_html.innerHTML = you_instance.name;
    you_html.className= "Person";
    Person.count++;
    var board = document.getElementsByClassName("board");
    board[0].appendChild(you_html);
};

function createNewPeople() {
    if (Person.count <= 15) {
        const newPeople_html = document.createElement("div");
        const newPeople_instance = new Person(true, Person.count, "./");
        newPeople_html.className= "Person";
        //newPeople.innerHTML = Person.count;
        newPeople_html.innerHTML = newPeople_instance.name;
        var board = document.getElementsByClassName("board");
        board[0].appendChild(newPeople_html);
        Person.count ++;
    }
    else {
        console.log("already 15");
    }
};