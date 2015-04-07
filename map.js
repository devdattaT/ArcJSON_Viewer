var map;

require(["esri/map","esri/SpatialReference", "esri/geometry/Extent","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol", "esri/Color","esri/symbols/SimpleMarkerSymbol","dojo/on","dojo/dom", "dojo/domReady!"], function(Map, spatialReference, Extent, SimpleFillSymbol,SimpleLineSymbol, Color, SimpleMarkerSymbol,on, dom) {
map = new Map("map", {
  basemap: "topo",  
  center:[73.1096,19.1025],
  zoom: 9
});
map.on("load", function(event){
	
});
//symbols
var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
    new Color([255,0,0]), 2),new Color([255,255,0,0.25])
  );
  
var sls = new SimpleLineSymbol(
    SimpleLineSymbol.STYLE_DASH,
    new Color([5,0,255]),
    3
  );

var sms=new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 5,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    new Color([5, 0, 255]), 1),
    new Color([0,255,0,0.25]));



//Click Events
var Clear_btn = dom.byId("Clr_input"),add_btn = dom.byId("Add_input");
 on(Clear_btn, "click", function(evt){
            console.log("inClear");
        });
		
 on(add_btn, "click", function(evt){
            console.log("inAdd");
        });

});