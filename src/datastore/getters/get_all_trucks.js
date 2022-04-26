"use strict"

const getAllTrucks=(function(state){
    return state.trucks;
});

const getAllTrucksMeta =(function(state){
    return state.all_trucks_meta;
})

export { getAllTrucks, getAllTrucksMeta}