"use strict"


const updateTrucks=(function(state , trucks){
     state.trucks  =  trucks;
});

const findTruckIndex = (function(trucks, truckID){
   let index =   trucks.findIndex((truck)=>{
          return (truck.id  ==  truckID);
     });
     return index;
})

const updateTruck=(function(state, playload){
      if(!Array.isArray(state.trucks)){
           state.trucks  = new Array();
      }
      let truck  =  Object.assign({}, playload.truck);
     state.current_truck    = truck;   
     state.current_truck_id = playload.truck.id;  
     let truckIndex =  findTruckIndex(state.trucks, truck.id);
     if(truckIndex <  0){
          state.trucks.push(truck);                   
          return ;
     }
     state.trucks[truckIndex]  =  truck; 
})

const updateTruckMetadata =(function(state, meta){
   state.truck_meta  = Object.assign({},meta);
})

const updateTruckPosition = (function(state, data){

     if(state.current_truck != null){
          state.current_truck.latitude  = data.lat;
          state.current_truck.longitude = data.long;
          state.current_truck.update_at  = data.date
     }
})

export {updateTrucks, updateTruck,updateTruckMetadata, updateTruckPosition}