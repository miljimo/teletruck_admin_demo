"use strict"
import getContents from "./get_contents";


const loadTrucksFromServer  =(function(context , criteria){

    getContents(context, criteria).then((resp)=>{
      
        if(!resp.data.status){
            //do nothing
            return  ;
        }
        let truckWithMeta =  resp.data.data;
        let trucks        =  truckWithMeta.data;
        context.commit("updateTrucks", trucks)
        context.commit("pgLoading", false);

    }).catch((err)=>{
       console.log(err);
    });
})


export default loadTrucksFromServer;