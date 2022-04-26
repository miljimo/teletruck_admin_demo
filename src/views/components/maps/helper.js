"use strict"

//load the google map scripts
const DEFAULT_API_KEY = "AIzaSyDGBlj7ahb_7eIww1hZW7MhD0sfKS-Vuvc"

function loadGoogleMap(callback, canvasElementID, apiKey = DEFAULT_API_KEY){

    let script   = document.createElement("script");
    script.src   = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=onGoogleMapLoaded`;
    script.async = true;

    window.onGoogleMapLoaded =(function(){
        var mapOptions= {
              center:new google.maps.LatLng(6.575362,3.385793),
              zoom:7,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
        var map = new google.maps.Map(document.getElementById(canvasElementID),mapOptions);
        if(typeof callback === "function"){
            callback(map);
        }
    });

    document.head.appendChild(script);
}






function createTrackerMarker(title, location, iconURL){
    var marker = new google.maps.Marker({
            position:location,
            label:title,
            animation:google.maps.Animation.BOUNCE
    });
    marker.setClickable(true);
    marker.setOpacity(0.98)

    var  icon = {
        url:iconURL ,
        origin:new google.maps.Point(0,0),
        scaledSize : new google.maps.Size(25,26)
        
    };
   // marker.setIcon(icon);
   // marker.setTitle(title)
    return marker;
}

function addClickListener(marker, zoom=10){

    google.maps.event.addListener(marker,'click',function() {
        let map =   marker.getMap();
        let pos =   marker.getMap().getZoom();
        map.setZoom(10);
        map.setCenter(marker.getPosition());
        window.setTimeout(function() {map.setZoom(pos);},3000);
    });
}


export {
    createTrackerMarker , loadGoogleMap, addClickListener
}