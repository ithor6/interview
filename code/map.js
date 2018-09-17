/*
	Thomas Wible interview site
*/

//define the arrays which will be filled the the layer variables
var mapLayers = [];
var mapLayersLive = [];

//intialize the map by loaded the necessary Esri Javascript API modules
require(["esri/Map",
         "esri/views/MapView",
	     "esri/layers/KMLLayer",
		 "esri/layers/MapImageLayer",		 
		 "dojo/domReady!"], 
function(Map, MapView, KMLLayer, MapImageLayer){
		
	//define the layers for the Thursday data map
	var cone = new KMLLayer({
		url: "https://www.nhc.noaa.gov/storm_graphics/api/AL062018_058adv_CONE.kmz"
	});
	
	var track = new KMLLayer({
		url: "https://www.nhc.noaa.gov/storm_graphics/api/AL062018_058adv_TRACK.kmz"
	});
	
	var watchwarn = new KMLLayer({
		url: "https://www.nhc.noaa.gov/storm_graphics/api/AL062018_058adv_WW.kmz"
	});
	
	var timing = new KMLLayer({
		url: "http://www.ithor6.com/data/AL062018_most_likely_toa_34_latest.kmz",
		visible: false
	});
	
	var prob = new KMLLayer({
		url: "http://www.ithor6.com/data/latest_wsp34knt120hr_5km.kmz",
		visible: false
	});
	
	var flood = new KMLLayer({
		url: "http://www.ithor6.com/data/fop_v2.kmz",
		visible: false
	});
	
	var excessiveRain = new KMLLayer({
		url: "http://www.ithor6.com/data/Day_2_Excessive_Rainfall_Outlook.kmz",
		visible: false
	});
	
	var precip = new KMLLayer({
		url: "http://www.ithor6.com/data/QPF72hr_Day1-3_latest.kml",
		opacity: 0.6,
		visible: false
	});	
	
	mapLayers = [cone, track, watchwarn, timing, prob, flood, excessiveRain, precip]; //add the layers to the array

	//create the Thurday data map
	var map = new Map({
		basemap: "topo",
		layers: mapLayers
	});
	
	var view = new MapView({
		container: "map",
		map: map,		
		center: [-77.016389, 38.904722],
		zoom: 7
	});	
	
	//define the layers for the live data map
	var coneLive = new KMLLayer({
		url: "https://www.nhc.noaa.gov/storm_graphics/api/AL062018_CONE_latest.kmz"
	});
	
	var trackLive = new KMLLayer({
		url: "https://www.nhc.noaa.gov/storm_graphics/api/AL062018_TRACK_latest.kmz"
	});
	
	var watchwarnLive = new KMLLayer({
		url: "https://www.nhc.noaa.gov/storm_graphics/api/AL062018_WW_latest.kmz"
	});
	
	var radar = new MapImageLayer({
		url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
		opacity: 0.6
	});
	
	var floodLive = new KMLLayer({
		url: "https://www.wpc.ncep.noaa.gov/kml/fop/fop_v2.kmz",
		visible: false
	});
	
	var excessiveRainLive = new KMLLayer({
		url: "https://www.wpc.ncep.noaa.gov/kml/ero/Day_1_Excessive_Rainfall_Outlook.kmz",
		visible: false
	});
	
	var precipLive = new KMLLayer({
		url: "https://www.wpc.ncep.noaa.gov/kml/qpf/QPF72hr_Day1-3_latest.kml",
		opacity: 0.6,
		visible: false
	});
	
	mapLayersLive = [coneLive, trackLive, watchwarnLive, radar, floodLive, excessiveRainLive, precipLive]; //add the layers to the array

	//create the live data map
	var mapLive = new Map({
		basemap: "topo",
		layers: mapLayersLive
	});
	
	var viewLive = new MapView({
		container: "map-live",
		map: mapLive,		
		center: [-77.016389, 38.904722],
		zoom: 7
	});
	
});

//function to turn layers on or off when a checkbox is turned on or off
function changeCheck(){
	if(this.id.charAt(0) == "c"){ //check if the clicked checkbox is from the "check" or "live" list
		var i = this.id.charAt(5); //get the array index number
	
		//turn a Thurday layer on or off
		if(this.checked){
			mapLayers[i].visible = true;
			console.log("layer " + i + " on");
		}
		else{
			mapLayers[i].visible = false;
			console.log("layer " + i + " off");
		}
	}else{
		var i = this.id.charAt(4); //get the array index number
	
		//turn a live layer on or off
		if(this.checked){
			mapLayersLive[i].visible = true;
			console.log("live layer " + i + " on");
		}
		else{
			mapLayersLive[i].visible = false;
			console.log("live layer " + i + " off");
		}
	}
}

//function to switch between the Thursday data map and the live data map
function switchMap(){
	if($("#map-area").css("display") == "block"){ //check if the Thursday map is visible
		$("#map-area").css("display", "none");
		$("#data-header").css("display", "none");
		$("#map-area-live").css("display", "block");
		$("#switch").html("Switch to Thursday Data");
	}else{
		$("#map-area").css("display", "block");
		$("#data-header").css("display", "block");
		$("#map-area-live").css("display", "none");		
		$("#switch").html("Switch to Live Data");
	}
}

window.onload = function(){	
	$(".cbox").click(changeCheck); //set the click listener for all the checkboxes
	$("#switch").click(switchMap); //set the click listened for the switch map button
	console.log("loaded!");
};