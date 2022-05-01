"use strict"


const getManagers=(function(state){
    return state.managers;
})

const getManagersMetadata=(function(state){
    return state.managers_meta;
})

export  { getManagers, getManagersMetadata}