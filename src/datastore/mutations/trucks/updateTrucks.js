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

export {updateTrucks, updateTruck,updateTruckMetadata}