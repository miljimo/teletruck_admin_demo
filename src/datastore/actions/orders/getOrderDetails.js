"use strict"

import getContentsDetail from "../get_content_detail";

const getOrderDetail=(function(content, playload){

    let orders = content.state.orders;
    // find order
    let order  =  orders.find((order)=>{
         return order.id ==  playload.id
    })

    if ((typeof order) =="undefined"){
        // query server for order id
       
        return ;
    }
    content.commit("updateSelectedOrder", order)
})


export default getOrderDetail;
