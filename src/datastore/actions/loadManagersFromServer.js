"use strict"
import getContents from "./get_contents"

const loadManagersFromServer = (function(context, criteria){
   getContents(context, criteria).then((resp)=>{
        let metadata ={
           current_page: resp.data.data.current_page,
           total :resp.data.data.total
        };
       context.commit("updateManagers",resp.data.data.data)
       context.commit("updateManagersMetadata", metadata)
   
   }).catch((err)=>{
      console.log(err);
   });
    
});

export default loadManagersFromServer;