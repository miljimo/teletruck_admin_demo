"use strict"
import axios from "@/axios.js";

const getDatacontent = (function ({ commit, dispatch, getters }, fetch) {
    return new Promise((resolve, reject) => {
        const userToken = getters.token;
        axios({
            url: `${fetch.path}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((resp) => {
            resolve(resp);
        }).catch((err) => {
            if (err.response) {
                if (
                    err.response.status === 401 ||
                    err.response.status === 406 ||
                    err.response.status === 403
                ) {
                    dispatch("logout");
                }
            }
            reject(err);
        });
    });
});


export default getDatacontent;