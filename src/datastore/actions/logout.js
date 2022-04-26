"use strict"
import axios from "@/axios.js";

// logout user interface logic action.
//
const logout = (function (context) {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userRole");
            localStorage.removeItem("adminData");
            delete axios.defaults.headers.common["Authorization"];
            context.commit("logout");
            resolve();
        } catch (e) {
            reject(e);
        }
    });
})

export default logout;