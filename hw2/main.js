class card {
    constructor(pin_self, name, path) {
        this.pin_self = pin_self;
        this.name = name;
        this.path = path;
        let make_node = () => {
            let node = document.createElement("div");
            node.className = "card";
            let remove_bottom = document.createElement("button");
            remove_bottom.className = "remove_bottom screen_bottom";
            remove_bottom.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.4 16.5 2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6L16 9.9l-1.4-1.4-2.6 2.6-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM7 6v13Z"/></svg>';
            remove_bottom.setAttribute("type", "button");

            let three_bottoms = document.createElement("div");
            three_bottoms.className = "three_bottoms";

            let three_bottoms_left = document.createElement("div");
            three_bottoms_left.className = "tooltip left_bottom screen_bottom";
            three_bottoms_left.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" ><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/><g class="currentLayer" ><title>Layer 1</title><path d="m16 12 2 2v2h-5v6l-1 1-1-1v-6H6v-2l2-2V5H7V3h10v2h-1Z" id="svg_1" class=""/><path fill="none" stroke="#fff" stroke-opacity="1" stroke-width="2" stroke-dasharray="none" stroke-linejoin="round" stroke-linecap="butt" stroke-dashoffset="" fill-rule="nonzero" opacity="1" marker-start="" marker-mid="" marker-end="" d="M4.021065903957926,4.1949427251193345 L19.836733573662723,22.285713993362844 " id="svg_2" class=""/></g></svg>';

            let three_bottoms_middle = document.createElement("div");
            three_bottoms_middle.className = "tooltip middle_bottom screen_bottom";
            three_bottoms_middle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 11 V3 h8 v8 Z  m0 10 v-8 h8 v8 Z  m 10 -10 V3 h8 v8 Z  m0 10 v-8 h8 v8 Z  M5 9h 4V 5H 5Z m10 0 h4 V5 h-4 Z  m0 10 h4 v-4 h-4 Z  M5 19 h4 v-4 H5 Z  M15 9 Z  m0 6Zm-6 0Zm0-6Z"/></svg>';
            
            let three_bottoms_right = document.createElement("div");
            three_bottoms_right.className = "tooltip right_bottom screen_bottom";
            three_bottoms_right.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3.4 22 2 20.6 8.6 14H4v-2h8v8h-2v-4.6ZM12 12V4h2v4.6L20.6 2 22 3.4 15.4 10H20v2Z"/></svg>';

            three_bottoms.appendChild(three_bottoms_left);            
            three_bottoms.appendChild(three_bottoms_middle);            
            three_bottoms.appendChild(three_bottoms_right);            

            let block_b1 = document.createElement("div");
            block_b1.className = "block b1";
            let mute = document.createElement("div");
            mute.className = "mute";
            mute.innerHTML = '<span class="material-symbols-outlined">mic_off</span>';
            block_b1.append(remove_bottom);
            block_b1.append(mute);

            let block_b2 = document.createElement("div");
            block_b2.className = "block b2";
            let circle = document.createElement("div");
            circle.className = "circle";
            let text_box = document.createElement("div");
            text_box.className = "text_box";
            let content = document.createElement("content");
            content.className = "content";
            content.innerHTML = name;
            text_box.appendChild(content);
            circle.appendChild(text_box);
            block_b2.appendChild(circle);

            
            let block_b3 = document.createElement("div");
            block_b3.className = "block b3";
            let status = document.createElement("div");
            status.className = "status";
            let name_bar = document.createElement("div");
            name_bar.className = "name";
            name_bar.innerHTML = name;
            status.appendChild(name_bar);
            block_b3.appendChild(status);

            node.appendChild(three_bottoms);
            node.appendChild(block_b1);
            node.appendChild(block_b2);
            node.appendChild(block_b3);
            var s = document.getElementById("side_container");
            s.appendChild(node);

            card.count++;
            card.curr_num++;
            if (this.pin_self) {
                card.pined_Person = this;
                card.pined_bool = true;
            }

            remove_bottom.onclick = () => {
                if (this == card.pined_Person) {
                    card.pined_Person = null;
                    card.pined_bool = false;
                }
                this.clean();
                node.remove();
                if_pined();
            };
        };
        this.node = make_node();

        console.log("construct ", this.name, " == ", this.self);

    }

    swap_pined = () => {
        let tmp_name = this.name;
        let tmp_path = this.path;
        this.name = pined_Person.name;
        this.path = pined_Person.path;
        card.pined_Person.name = tmp_name;
        card.pined_Person.path = tmp_path;
        card.pined_Person = this;
        update_main();
    }
    update_main() {

    }
    clean = () => {
        if (this.pined_self) {
            console.log("clean is pined");
            card.pined_bool = false;
            pined_Person = null;
            if_pined();
        }
        else {
            console.log("clean is unpined");
        }
        card.curr_num--;
        console.log("remove ", this.name);
        console.log("count ", card.count);
        console.log("curr_num ", card.curr_num);
    };
    static pined_Person = null;
    static count = 0;
    static curr_num = 0;
    static pined_bool = true;
    static get_count() {
        console.log("count = ", count);
        return count;
    }
}

function createYou() {
    var you = new card(true, "You", "./");
}

function createNewPeople() {
    if (card.count <= 15) {
        var newPeople = new card(false, card.count, "./");
    }
    else {
        console.log("already 15");
    }
    console.log("pined_person = ", card.pined_Person);
}

function if_pined() {
    let m = document.getElementById("main");
    let s = document.getElementById("side");
    if(card.pined_bool) {
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