// DEFINE VARIABLES
// Define size of map group
// Full world map is 2:1 ratio
// Using 12:5 because we will crop top and bottom of map
w = 3000;
h = 1250;
// variables for catching min and max zoom factors
var minZoom;
var maxZoom;

// we can probably change it 
var projection = d3
   .geoEquirectangular()
   .center([0, 15]) // set centre to further North
   .scale([w/(2*Math.PI)]) // scale to fit group width
   .translate([w/2,h/2]) // ensure centred in group
;

// map path
var path = d3.geoPath().projection(projection);

// zoom behavior

function zoomed() {
    t = d3.event.transform;
    countriesGroup.attr("transform", "translate(" + [t.x,t.y] + ")scale(" + t.k + ")");
}

// pass in function zoomed()
var zoom = d3.zoom().on("zoom", zoomed);

function getTextBox(selection) {
    selection.each(function(d) {
        // bounded box
        d.bbox = this.getBBox();
    });
}