"use strict"

const auth_success =(function(state, token, user) {
     // update the store when authentication is successful.
     console.log("auth_success")
      state.status  = "success";
      state.token   = token;
      state.user   = user;
    });

export default auth_success ;