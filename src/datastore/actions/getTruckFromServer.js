"use strict"
import httpGetDetail from "./get_content_detail"
const API =  "admin/trucks/";

const getTruckFromServer =(function(context, playload){
    const requestData ={
        path: API + playload,
        data:playload
    } 
    httpGetDetail(context, requestData).then((resp)=>{
            //get all the data from the response.
          let success  =  resp.data.status;
          let meta ={
                message:resp.data.message,
                success:success
            }

          if(success != true){
              //handler unsuccess feedback todo
              context.commit("updateTruckMetadata", meta)
              return ;
          }
          context.commit("updateTruck",({truck:resp.data.data}))
          context.commit("updateTruckMetadata", {})
    }).catch((err)=>{
        if(err.response){
            let meta ={
                status:err.response.data.status,
                message : err.response.data.message
            }
            context.commit("updateTruckMetadata", meta)
        }
        console.log(err)

    })

});

export default getTruckFromServer;