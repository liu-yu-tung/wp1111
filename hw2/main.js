class card {
    constructor(pin_self, name, path) {
        this.pin_self = pin_self;
        this.name = name;
        this.path = path;
        let make_node = () => {
            let node = document.createElement("div");
            node.className = "card";
            let remove_bottom = document.createElement("div");
            remove_bottom.className = "remove_bottom screen_bottom";
            remove_bottom.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.5 17q-.625 0-1.062-.438Q3 16.125 3 15.5v-11q0-.625.438-1.062Q3.875 3 4.5 3H10v1.5H4.5v11H10V17Zm9-3.5-1.062-1.062 1.687-1.688H8v-1.5h6.125l-1.687-1.688L13.5 6.5 17 10Z"/></svg>';
            //remove_bottom.setAttribute("type", "button");

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
            mute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M14.604 12.479 13.5 11.375q.229-.437.365-.906Q14 10 14 9.5h1.5q0 .792-.229 1.552t-.667 1.427Zm-2.229-2.229L7.5 5.375V4.5q0-1.042.729-1.771Q8.958 2 10 2q1.042 0 1.771.729.729.729.729 1.771v5q0 .188-.031.375t-.094.375ZM9.25 17v-2.062q-2.062-.25-3.406-1.803Q4.5 11.583 4.5 9.5H6q0 1.667 1.167 2.833Q8.333 13.5 10 13.5q.708 0 1.344-.271.635-.271 1.177-.729l1.083 1.083q-.604.521-1.333.886-.729.364-1.521.469V17ZM16 18.125 1.875 3.979l1.063-1.062 14.124 14.145Z"/></svg>';
            if (name == "you") {
                remove_bottom.id = "main_remove";
            }
            block_b1.append(remove_bottom);
            block_b1.append(mute);

            let block_b2 = document.createElement("div");
            block_b2.className = "block b2";
            let circle = document.createElement("div");
            circle.className = "circle";
            let text_box = document.createElement("div");
            text_box.className = "text_box";
            let content = document.createElement("div");
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

            if (pin_self) {
                var m = document.getElementById("main_container");
                content.classList.add("main_content");
                m.appendChild(node);
                document.getElementById("main_remove").style.display = "visible";
            }
            else {
                var s = document.getElementById("side_container");
                s.appendChild(node);
            }
            card.count++;
            card.curr_num++;
            if (this.pin_self) {
                card.pined_Person_name = this.name;
                card.pined_bool = true;
            }

            remove_bottom.onclick = () => {
                if (this.name == MAIN.name) {
                    card.pined_Person_name = "";
                    card.pined_bool = false;
                }
                else {
                    this.clean();
                    node.remove();
                }
                if_pined();
            };

            three_bottoms_left.onclick = () => {
                if (card.pined_bool) {
                    if(card.pined_Person_name == this.name) {
                        if (card.curr_num > 1) {
                            var main_txt = document.getElementsByClassName("main_content");
                            main_txt.innerHTML = "empty";
                            this.push_to_side();
                            if_pined();
                        }
                    }
                    else {
                        this.swap_pined();
                        node.remove();
                        console.log("this.name: ", this.name);
                        console.log("pined.name: ", card.pined_Person_name);
                    }
                }
                else {
                    this.push_to_main();
                    node.remove();
                    if_pined();
                }
                if_pined();
            };
        };
        this.node = make_node();

        console.log("construct ", this.name, " == ", this.self);
    }
    swap_pined = () => {
        if (this.name != card.pined_Person_name) {
            var tmp_name = MAIN.name;
            var tmp_path = MAIN.path;
            MAIN.name = this.name;
            MAIN.path = this.path;
            this.clean();
            var old_main_to_side = new card(false, tmp_name, tmp_path);
            let main_txt = document.getElementsByClassName("main_content");
            main_txt[0].innerHTML = MAIN.name; 
            if (MAIN.name != "you") {
                var display_main_remove = document.getElementById("main_remove");
                display_main_remove.style.display = "visible";
            }
            card.pined_bool = true;
        }
    }
    push_to_main = () => {
        let main_txt = document.getElementsByClassName("main_content");
        main_txt[0].innerHTML = this.name; 
        card.pined_bool = true;
        var tmp_name = this.name;
        var tmp_path = this.path;
        this.clean();
        MAIN.name = tmp_name;
        MAIN.path = tmp_path;
        card.pined_Person_name = this.name;
        card.pined_Person_path = this.path;
    }

    push_to_side = () => {
        var push = new card(false, card.pined_Person_name, card.pined_Person_path);
        card.pined_bool = false;
        MAIN.name = "";
        MAIN.path = "";
        card.pined_Person_name = "";
        card.pined_Person_path = "";
        if_pined();
    }

    clean = () => {
        if (this.name == card.pined_Person_name) {
            console.log("clean is pined");
            card.pined_bool = false;
            card.pined_Person_name = "";
            card.pined_Person_path = "";
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
    update_apperence = () => {
        this.content = this.name;
    }

    static pined_Person_name = "";
    static pined_Person_path = "";
    static count = 0;
    static curr_num = 0;
    static pined_bool = true;
    static get_count() {
        console.log("count = ", count);
        return count;
    }
}

function createNewPeople() {
    if (card.curr_num <= 15) {
        var newPeople = new card(false, card.count, "./");
    }
    else {
        console.log("already 15");
    }
    console.log("pined_person = ", card.pined_Person_name);
}

function if_pined() {
    let m = document.getElementById("main");
    let s = document.getElementById("side");
    if(card.pined_bool) {
        m.style.display = "block";
        m.style.width = "70%";
        s.style.display = "sticky";
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
update_time();
function update_time() {
    let time = new Date();
    document.getElementById("curr_time").innerHTML = time.toLocaleTimeString('em-US', {hour:'numeric', minute:'numeric', hour12: true});
};
setInterval(update_time, 1000);

MAIN = new card(true, "you", "./");
//createYou();

//end