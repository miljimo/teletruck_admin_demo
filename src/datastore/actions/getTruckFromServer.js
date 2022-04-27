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
          if(success != true){
              //handler unsuccess feedback todo
              return ;
          }
          let meta ={
              message:resp.data.message,
              success:success
          }
          context.commit("updateTruck",({truck:resp.data.data, meta:meta}))
    }).catch((err)=>{
        //handle the error todo
        console.log(err)

    })

});

export default getTruckFromServer;