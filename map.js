var map;

require(["esri/map","esri/SpatialReference", "esri/geometry/Extent","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol", "esri/Color","esri/symbols/SimpleMarkerSymbol","esri/geometry/jsonUtils","esri/layers/GraphicsLayer","esri/geometry/webMercatorUtils","esri/graphic","dojo/on","dojo/dom", "dojo/domReady!"], function(Map, spatialReference, Extent, SimpleFillSymbol,SimpleLineSymbol, Color, SimpleMarkerSymbol,geometryJsonUtils,GraphicsLayer,webMercatorUtils, Graphic,on, dom) {
map = new Map("map", {
  basemap: "topo",  
  center:[73.1096,19.1025],
  zoom: 9
});
//initilise 2 graphics layers
var allGraphicsLayer, selectedGraphicsLayer;
map.on("load", function(event){
	 allGraphicsLayer = new GraphicsLayer();
	  selectedGraphicsLayer = new GraphicsLayer();
	  //add them
	  map.addLayers([allGraphicsLayer, selectedGraphicsLayer]);
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

var input_text=dom.byId("text");


//Click Events
var Clear_btn = dom.byId("Clr_input"),add_btn = dom.byId("Add_input");
 on(Clear_btn, "click", function(evt){
            input_text.value = "";
        });
		
 on(add_btn, "click", function(evt){
            var txt=input_text.value ;
			if(IsJsonString(txt)){
				var obj=JSON.parse(txt);
				//try to convert to geometry
				var geom=geometryJsonUtils.fromJson(obj);
				if(geom){
					console.dir(geom);
					addGeometry(geom);
				}else{
					ParseErrorMessage();
				}
			}else{
				ParseErrorMessage();
			}
        });

function addGeometry(geom){
	geom=getWMObject(geom);
	 var graphic = new Graphic(geom);
	var geomType=geom.type;
	switch(geomType){
		case "point":
			graphic.setSymbol(sms);
			break;
		case "polyline":
			graphic.setSymbol(sls);
			break;
		case "polygon":
			graphic.setSymbol(sfs);
			break;
		
	}
	
	//add to all Graphic Layer
	allGraphicsLayer.add(graphic);
	
	//zoom to extent
	map.setExtent(geom.getExtent());
}		

function getWMObject(geom){
	//get the spatial reference
	var sr=geom.spatialReference;
	if(!sr){
		//assume that we have a Geographic Lat long geometry
		geom.setSpatialReference(new SpatialReference(4326));
		sr=new SpatialReference(4326);
	}
	//return Web mercator Geometry if it EPSG:4326
	if(sr.wkid===4326){
		return webMercatorUtils.geographicToWebMercator(geom);
	}
	
	//return if it web mercator
	if(sr.wkid===102100){
		return geom;
	}
	
}


function ParseErrorMessage(){
	alert("Sorry! I couldn't parse this text");
}
		
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}		
});