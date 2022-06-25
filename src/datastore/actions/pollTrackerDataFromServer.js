"use strict"
import httpGet from "./get_content_detail"
const TIMEOUT_IN_MS = 1024

const pollTrackerDataFromServer = (function (context, trackID) {

    let data = {
        path: `tracker/get/${trackID}`
    }
    httpGet(context, data).then((resp) => {
        let success = resp.data.status

        if (!success) {
            context.commit("updateTruckMetadata", { message: resp.data.message })
            return;
        }
        context.commit("updateTruckPosition", resp.data.data)
        // Stop the polling
        if (context.getters.stopTrackerPolling != true) {
            // Do the polling here
            let timeoutID = setTimeout((function () {
                pollTrackerDataFromServer(context, trackID)
            }), TIMEOUT_IN_MS)
        }

    }).catch((err) => {
        console.log(err)
        context.commit("updateTruckMetadata", { message: err.response.data.message })
    })

})

export { pollTrackerDataFromServer }