"use strict"


const getReport=(function(state){
    if(state.reports != null){
        return state.reports;
    }
    return {trips:0, companies:0, users:0, wallet:0};
})

export default getReport;
