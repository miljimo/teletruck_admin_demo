"use strict"
import axios from "@/axios.js";

const delContent =(function({ commit, dispatch, getters }, apiData) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `${apiData.path}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
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


export default  delContent;