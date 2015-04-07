var map;

require(["esri/map","esri/SpatialReference", "esri/geometry/Extent", "dojo/domReady!"], function(Map, spatialReference, Extent) {
map = new Map("map", {
  basemap: "topo",  
  center:[73.1096,19.1025],
  zoom: 9
});
map.on("load", function(event){
	
});
});