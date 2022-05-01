"use strict"

const updateManagerStatus = (function (state, playload) {

    let managerIndex = state.managers.findIndex((manager) => {
        return (manager.id == playload.id)
    })

    if (managerIndex >= 0) {
        let manager  =  state.managers[managerIndex];
        if (manager != null) {
            manager.status = playload.status;
            manager.status_text = playload.status_text
        }
    }

});

export default updateManagerStatus;
