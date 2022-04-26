<template>

<div>

    <div class id="googleMap"/>
</div>


</template>

<script>
  import {loadGoogleMap, createTrackerMarker} from "./helper.js" 

  
  export default{
      mounted(){
          loadGoogleMap((map)=>{
              alert(map)
          },"googleMap")
          
          var pos  = new google.maps.LatLng(6.575362,3.385793);
          var marker = createTrackerMarker("IOS APP", pos, "./assets/images/truck.png")
          marker.setMap(map);
      },
  }
</script>

<style  scoped>

 #googleMap{
    width:100% !important;
    height:370px !important;
 }

</style>