var map;

require(["esri/map","esri/SpatialReference", "esri/geometry/Extent","dojo/dom" "dojo/domReady!"], function(Map, spatialReference, Extent, dom) {
map = new Map("map", {
  basemap: "topo",  
  center:[73.1096,19.1025],
  zoom: 9
});
map.on("load", function(event){
	
});

//Click Events
var Clear_btn = dom.byId("Clr_input"),add_btn = dom.byId("Add_input"),
 on(Clear_btn, "click", function(evt){
            console.log("inClear");
        });
		
 on(add_btn, "click", function(evt){
            console.log("inAdd");
        });

});