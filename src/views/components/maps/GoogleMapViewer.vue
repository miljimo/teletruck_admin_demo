<template>

<div>

    <div class id="googleMap"/>
</div>


</template>

<script>
  import {loadGoogleMap, createTrackerMarker, addClickListener} from "./helper.js" 

  
  export default{
      props:{
         longitude : Number,
         latitude   : Number,
         name :String,
         disabled : Boolean,
         getPosition:Function
      },
      data:(function(){
          return{
             "threadID": 0
          }
      }),
      mounted(){
          loadGoogleMap(this.onMapViewerCreated,"googleMap")
      },
      beforeUpdate(){
        alert("Heel")
      },
      update:(function(){

      }),
      methods:{
           onMapViewerCreated:(function(map){
                var pos  = new google.maps.LatLng(this.latitude,this.longitude);
                var marker = createTrackerMarker(this.name, pos, "./assets/images/truck.png")
                marker.setMap(map);
                map.setCenter(marker.getPosition());
                addClickListener(marker)

               
                
           })
      },
  }
</script>

<style  scoped>

 #googleMap{
    width:100% !important;
    height:370px !important;
 }

</style>