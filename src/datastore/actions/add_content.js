"use strict"

const addContent = (function ({ commit, dispatch, getters }, content) {
    return new Promise((resolve, reject) => {
        const userToken = getters.token;
        axios({
            url: `content/${content.path}/add`,
            data: content.data,
            method: "POST",
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


export default addContent;