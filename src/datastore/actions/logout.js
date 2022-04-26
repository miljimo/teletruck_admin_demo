"use strict"
import axios from "@/axios.js";

const logout =(function({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("adminData");
      delete axios.defaults.headers.common["Authorization"];
      location.reload();
      resolve();
    });
  })

export default logout;