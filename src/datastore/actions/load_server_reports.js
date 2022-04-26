"use strict"
import { ScalerFilter } from "ag-grid-community";
import httpGetContent from "./get_data_content";



const loadReportFromServer=(function(context, fetchData){    
    httpGetContent(context, fetchData).then((resp)=>{
        if(!resp.data.status){
            return ;
        }
        let report = resp.data.data;
        context.commit("updateReport", report)
        context.commit("pgLoading", false);

    }).catch((err)=>{
      console.log(err);
    });
});


export default loadReportFromServer;