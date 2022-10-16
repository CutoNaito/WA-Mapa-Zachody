const stred = SMap.Coords.fromWGS84(14.41, 50.08);
const mapa = new SMap(JAK.gel("mapa"), stred, 10);
mapa.addDefaultLayer(SMap.DEF_BASE).enable();
mapa.addDefaultControls();

function generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 14; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getValueInput(inputvalue, xname){
    console.log(inputvalue, xname);
}

function appendForm(){
    var form = document.createElement("form");
    var input = document.createElement("input");
    var markerName = document.createElement("input");
    markerName.type = "text";
    markerName.className = "hidden markerName";
    input.type = "text";
    input.className = "kod-input";
    var submit = document.createElement("input");
    submit.type = "submit";
    form.appendChild(input);
    form.appendChild(submit);
    return form;
}

// var data = {
//     "zachod1": "{'sourandice' : '50°5'0.511\"N 14°27'25.039\"E', 'isPaid' : 'true'}",
//     "zachod2": "{'souradnice' : '50°4'31.412\"N 14°25'33.571\"E', 'isPaid : 'false'}",
//     "Kost": "{'souradnice' : '50°29'24.83\"N,15°8'6.38\"E', 'isPaid : 'false'}",
//     "beroun": "{'souradnice' : '50°1'33.591\"N 14°15'19.529\"E', 'isPaid : 'false'}",
//     "dalsi zachod": "{'souradnice' : '50°3'23.133\"N 14°19'4.474\"E', 'isPaid : 'false'}"
// };


const data = {
    "zachod1": {
        "sourandice" : "50°5'0.511\"N 14°27'25.039\"E",
        "isPaid" : true
    },
    "zachod2": {
        "sourandice" : "50°4'31.412\"N 14°25'33.571\"E",
        "isPaid" : false
    }
};

const markers = [];
const coordinates = [];

for(let xname in data){
    let card = new SMap.Card();
    let x = SMap.Coords.fromWGS84(data[xname].sourandice);

    let options = {
        title:xname,
        anchor: {left:10, bottom:1}
    }

    if(!data[xname].isPaid){
        card.getBody().innerHTML = "Verejne WC, zdarma.";
    }
    if(data[xname].isPaid){
        card.getBody().appendChild(appendForm());
        appendForm().addEventListener("submit", getValueInput(appendForm().firstChild.value, xname));
    }

    let znacka = new SMap.Marker(x, null, options);
    znacka.decorate(SMap.Marker.Feature.Card, card);
    markers.push(znacka);
    coordinates.push(x);
}

let vrstva = new SMap.Layer.Marker();
mapa.addLayer(vrstva);
vrstva.enable();
for(let i=0; i<markers.length; i++){
    vrstva.addMarker(markers[i]);
}

let cz = mapa.computeCenterZoom(coordinates);
mapa.setCenterZoom(cz[0], cz[1]);
