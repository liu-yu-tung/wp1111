class card {
    constructor(self, name, path) {
        this.self = self;
        this.name = name;
        this.path = path;
        let make_node = () => {
            console.log("make node");
            let node = document.createElement("div");
            node.className = "card";
            node.innerHTML = this.name;

            let three_bottoms = document.createElement("div");
            three_bottoms.className = "three_bottoms";

            let three_bottoms_left = document.createElement("div");
            three_bottoms_left.className = "tooltip left_bottom screen_bottom";

            let three_bottoms_middle = document.createElement("div");
            three_bottoms_middle.className = "tooltip middle_bottom screen_bottom";
            
            let three_bottoms_right = document.createElement("div");
            three_bottoms_right.className = "tooltip right_bottom screen_bottom";

            three_bottoms.appendChild(three_bottoms_left);            
            three_bottoms.appendChild(three_bottoms_middle);            
            three_bottoms.appendChild(three_bottoms_right);            

            node.appendChild(three_bottoms);
            var s = document.getElementById("side_container");
            s.appendChild(node);
        }
        this.node = make_node();

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
    var you = new card(true, "You", "./");
    card.count++;
    card.pined = false;
}

function createNewPeople() {
    if (card.count <= 15) {
        var newPeople = new card(true, card.count, "./");
        card.count ++;
    }
    else {
        console.log("already 15");
    }
}

function if_pined() {
    let m = document.getElementById("main");
    let s = document.getElementById("side");
    if(card.pined) {
        m.style.display = "flex"; 
        s.style.display = "flex";
        m.style.width = "70%";
        s.style.width = "30%";
        console.log("pined");
    }
    else {
        m.style.display = "none";
        s.style.width = "100%";
        console.log("unpined");
    }
}

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
var m = document.getElementById("main");
var s = document.getElementById("side");
m.style.background = "white";
s.style.background= "orange";

//end