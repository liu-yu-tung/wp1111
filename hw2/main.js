class card {
    constructor(self, name, path) {
        this.self = self;
        this.name = name;
        this.path = path;
        console.log("construct ", this.name, " == ", this.self);
    }
    static count = 0;
    static pined = true;
    static get_count() {
        console.log("count = ", count);
        return count;
    }
}


function createYou() {
    var you_instance = new card(true, "you", "./");
    const you_html = document.createElement("div");
    you_html.innerHTML = you_instance.name;
    you_html.className= "card";
    var board = document.getElementById("side");
    board.appendChild(you_html);
    card.count++;
};

function createNewPeople() {
    if (card.count <= 15) {
        const newPeople_html = document.createElement("div");
        const newPeople_instance = new card(true, card.count, "./");
        newPeople_html.className= "card";
        //newPeople.innerHTML = card.count;
        newPeople_html.innerHTML = newPeople_instance.name;
        var board = document.getElementById("side");
        board.appendChild(newPeople_html);
        card.count ++;
    }
    else {
        console.log("already 15");
    }
};

function if_pined() {
    if(card.pined) {
        var m = document.getElementById("main");
        var s = document.getElementById("side");
        m.style.display = "none";
        s.style.display = "flex";
        s.style.width = "100%";
        console.log("pined");
    }
};

//start
console.log("Hello World");
var p = document.getElementById("pppp");

if (p) {
    console.log("true");
    p.onclick = function() {
        console.log("clicked");
        createNewPeople();    
        console.log(card.count);
        if_pined();
    }
}
else {
    console.log("false");
}


createYou();
card.pined = true;
var m = document.getElementById("main");
var s = document.getElementById("side");
m.style.background = "white";
s.style.background= "orange";

//end