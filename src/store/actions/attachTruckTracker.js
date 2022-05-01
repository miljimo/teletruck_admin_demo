"use strict"
const API_ENDPOINT= "admin/trucks/device-id";

import update from "./update";

const attachTruckTracker = (function(context, playload){
    let request  = {
         path:API_ENDPOINT,
         data:playload
    }
    // check if the tracker id is same with the already register one
    // to do

    update(context, request).then((resp)=>{
        let success  =  resp.data.status;
        let meta={
            status:success,
            message : resp.data.message
        }
        if(success != true){
            context.commit("updateTruckMetadata", meta)
            console.log(resp.data.message)
            return ;
        }
      
      const playload ={
           truck: resp.data.data
       }
       context.commit("updateTruck", playload);
       context.commit("updateTruckMetadata", meta)
    }).catch((err)=>{
        if(err.response){
            let meta ={
                status:err.response.data.status,
                message : err.response.data.message
            }
            context.commit("updateTruckMetadata", meta)
        }
    });

   
});

//
export default attachTruckTracker;


