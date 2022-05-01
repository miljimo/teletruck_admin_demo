"use strict"

const getAllTrucks=(function(state){
    return state.trucks;
});

const getCurrentTruck = (function(state){
   return state.current_truck
})

const getTruckMeta=(function(state){
    return state.truck_meta;
})

const getAllTrucksMeta =(function(state){
    return state.all_trucks_meta;
})

export { getAllTrucks, getAllTrucksMeta, getCurrentTruck, getTruckMeta}