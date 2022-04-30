"use strict"
import getContents from "./get_contents";


const loadTrucksFromServer  =(function(context , criteria){

    getContents(context, criteria).then((resp)=>{      
        if(!resp.data.status){
            //do nothing
            context.commit("updateTrucksPageMetaData", {message:resp.data.message})
            return  ;
        }
        let truckWithMeta =  resp.data.data;
        let trucks        =  truckWithMeta.data;

        let meta = {
             current_page:resp.data.data.current_page,
             total:resp.data.data.total,
        }
        context.commit("updateTrucks", trucks)
        context.commit("updateTrucksPageMetaData", meta)
        context.commit("pgLoading", false);

    }).catch((err)=>{
       console.log(err);
    });
})


export default loadTrucksFromServer;