var stred = SMap.Coords.fromWGS84(14.41, 50.08);
var mapa = new SMap(JAK.gel("mapa"), stred, 10);
mapa.addDefaultLayer(SMap.DEF_BASE).enable();
mapa.addDefaultControls();

var data = {
    "zachod1": "50°5'0.511\"N 14°27'25.039\"E",
    "zachod2": "50°4'31.412\"N 14°25'33.571\"E",
    "Kost": "50°29'24.83\"N,15°8'6.38\"E"
};

var markers = [];
var souradnice = [];
var card = new SMap.Card();

for(var xname in data){
    var x = SMap.Coords.fromWGS84(data[xname]);

    var options = {
        title:xname,
        anchor: {left:10, bottom:1}
    }

    var random_number = Math.floor(Math.random() * 11);
    if(random_number > 5){
        card.getBody().innerHTML = "Verejne WC, zdarma.";
    } else {
        card.getBody().innerHTML = "WC je na kod";
    }

    var znacka = new SMap.Marker(x, null, options);
    znacka.decorate(SMap.Marker.Feature.Card, card);
    markers.push(znacka);
    souradnice.push(x);
}

var vrstva = new SMap.Layer.Marker();
mapa.addLayer(vrstva);
vrstva.enable();
for(var i=0; i<markers.length; i++){
    vrstva.addMarker(markers[i]);
}

var cz = mapa.computeCenterZoom(souradnice);
mapa.setCenterZoom(cz[0], cz[1]);  