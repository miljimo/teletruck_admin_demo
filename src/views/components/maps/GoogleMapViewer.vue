<template>

<div>
    <div class id="googleMap"/>
   
</div>


</template>

<script>

  import {loadGoogleMap, createTrackerMarker, addClickListener} from "./helper.js" 

  
  export default{
      props:{
         longitude : String,
         latitude   : String,
         name :String,
         getPosition:Function,
         iconUrl:String

      },
      data:(function(){
          return{
           tracker :  null
          }
      }),
      mounted(){
          loadGoogleMap(this.onMapViewerCreated,"googleMap")
      },
      methods:{
           onMapViewerCreated:(function(map){
              
                var pos  = new google.maps.LatLng(parseFloat(this.latitude),parseFloat(this.longitude));
                this.tracker = createTrackerMarker(this.name, pos, this.iconUrl)
                this.tracker.setMap(map);
                map.setCenter(this.tracker.getPosition());
                addClickListener(this.tracker)
           }),
           updateMarkerPosition(pos){
              let cur = this.tracker.getPosition();
              
           }
      },

      watch:{
          latitude:(function(newVal, oldVal){
              if(this.tracker == null){
                  return 
              }
              if(newVal != oldVal){
                  
                  let cur = this.tracker.getPosition();
                  let newPosition = new google.maps.LatLng(parseFloat(newVal) , cur.lng());
                  this.tracker.setPosition(newPosition);
                  let  map = this.tracker.getMap();
                  map.setCenter(newPosition);
              }
             
          }),
          longitude:(function(newVal, oldVal){
             
             if(this.tracker == null){
                  return 
              }
              if(newVal != oldVal){
                  let cur = this.tracker.getPosition();
                  let newPosition = new google.maps.LatLng(cur.lat(),parseFloat(newVal));
                  this.tracker.setPosition(newPosition);
                  let  map = this.tracker.getMap();
                  map.setCenter(newPosition);
              }
           
          })
      }
     
  }
</script>

<style  scoped>

 #googleMap{
    width:100% !important;
    height:370px !important;
 }

</style>