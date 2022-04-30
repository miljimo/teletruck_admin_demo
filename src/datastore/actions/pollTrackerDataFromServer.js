"use strict"
import httpGet from "./get_content_detail"

const pollTrackerDataFromServer =(function(context, trackID){
  
    let data = {
        path:`admin/trucks/tracker/get/${trackID}`
    }
   
    httpGet(context, data).then((resp)=>{
        let success =  resp.data.status
        if(!success){
            context.commit("updateTruckMetadata", {message:resp.data.message})
            return ;
        }
        context.commit("updateTruckPosition", resp.data.data)

    }).catch((err)=>{
        console.log(err)
        context.commit("updateTruckMetadata", {message:err.response.data.message})
    })

})

export {pollTrackerDataFromServer }