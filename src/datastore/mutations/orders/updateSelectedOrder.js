

let updateSelectedOrder = (function(state, order){
    state.selectedOrder  =  order;
   console.log(JSON.stringify(order))
})

export {updateSelectedOrder}