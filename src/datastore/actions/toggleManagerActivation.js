"use strict"
import create from "./create"

const getStatusFromText = (function (statusText) {
    if (statusText == "activated") {
        return '2'
    }
    return '1'
})

const toggleManagerActivation = (function (context, id) {
    let request = {
        path: `/admin/managers/${id}/toggle-status`,
        "data": {
            id: id
        }
    }
    create(context, request).then((resp) => {
        
        let status = resp.data.status;
       
        if (status != true) {
            let errors = new Array();
            errors.push(resp.data.message);

            let addition_errors = resp.data.data;
            if (typeof addition_errors != "undefined") {
                for (let attr in addition_errors) {
                    errors.push(addition_errors[attr])
                }
            }
            context.commit("createErrors",errors)
            return
        }

        let message = resp.data
        let activateStatus = "1";
        let text = "";

        if (typeof message != "undefined") {
            text = message.data.status
            activateStatus = getStatusFromText(message.data.status);

        }
        context.commit("updateManagerStatus", {
            status: activateStatus,
            id: id,
            status_text: text
        })
    }).catch((err) => {

        if (err.response) {
            let arr = [];
            arr.push(err.response.message);
            context.commit("createErrors",arr)
        }
    })

})


export default toggleManagerActivation;