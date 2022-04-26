"use strict"


const updateManagers =(function(state, managers){
    state.managers  =  managers;
})

const updateManagersMetadata  =(function(state, meta){
      state.managers_meta = meta;
})

export {updateManagers, updateManagersMetadata}