"use strict"

const getOrders=(function(state){
   return state.orders;
})

const getOrdersMeta = (function(state){
    return state.ordersMeta
})

export {getOrders,getOrdersMeta }