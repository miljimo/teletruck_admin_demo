"use strict"
import Vue from "vue";
import axios from "@/axios.js";

const login = (function (context, data) {
    return new Promise((resolve, reject) => {
        axios({
            url: "auth/login",
            data: data,
            method: "POST",
        }).then((resp) => {
            let user   = JSON.stringify(resp.data.data.user);
            let rawToken  =  resp.data.data.token.access_token;
            
            context.commit("auth_request", rawToken, user);
            resolve(resp);
        }).catch((err) => {
            reject(err);
        });
    });
});


export default login;
