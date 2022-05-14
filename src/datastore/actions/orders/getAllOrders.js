"use strict"
import getContent from "../get_contents"

var updateError=(function(context, playload){
   
        let errors = new Array();
        errors.push(playload.message);

        let addition_errors = playload.data;
        if (typeof addition_errors != "undefined") {
            for (let attr in addition_errors) {
                errors.push(addition_errors[attr])
            }
        }
        context.commit("createErrors",errors)
        return
})

const getAllOrders = (function (context, playload) {
    let request = {
        path: "admin/orders",
        pageNo: playload,
    }
    getContent(context, request).then((resp) => {
        let success=resp.status;
        if(!success){
            updateError(context, resp.data)
            return
        }
        context.commit("updateOrders", resp.data)

    }).catch((err) => {
        if (err.response) {
            let arr = [];
            arr.push(err.response.message);
            context.commit("createErrors", arr)
        }
    })

})

export { getAllOrders }