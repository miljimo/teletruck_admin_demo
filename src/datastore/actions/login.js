"use strict"
import axios from "@/axios.js";

const login = (function (context, data) {
    return new Promise((resolve, reject) => {
        axios({
            url: "auth/login",
            data: data,
            method: "POST",
        }).then((resp) => {
            let user   = null;
            let token  =  null;
            context.commit("auth_request", token, user);
            resolve(resp);
        }).catch((err) => {
            reject(err);
        });
    });
});


export default login;
