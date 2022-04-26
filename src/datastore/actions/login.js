"use strict"
import axios from "@/axios.js";

const login = (function ({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
        commit("auth_request");

        axios({
            url: "auth/login",
            data: data,
            method: "POST",
        }).then((resp) => {
            resolve(resp);
        }).catch((err) => {
            reject(err);
        });
    });
});


export default login;
