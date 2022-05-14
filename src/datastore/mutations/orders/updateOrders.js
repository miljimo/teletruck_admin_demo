"use strict"

const findOrderIndex=(function(orders, uuid){
    if(!orders) return -1;
    for(var i=0; i < orders.length; i++){
        if(uuid == orders[i].uuid){
            return i;
        }
    }
    return -1;
})

const updateOrders =(function(state, playload){
    let orders  =  playload.data.data;
    for(var i=0; i < orders.length; i++){
        let order  =  orders[i]
        let index = findOrderIndex(state.orders, order.uuid);
        if(index >= 0){
            state.orders[index] = order;
            continue;
        }
        state.orders.push(order);
    }

    let ordersMeta={
        current_page:  playload.data.current_page,
        total : playload.data.total
    }

    state.ordersMeta  =  ordersMeta;

})

export default updateOrders