"use strict"

const auth_success =(function(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  });

const auth_error =(function(state) {
  state.status = "error";
});

const auth_request=(function(state) {
  state.status = "loading";
});


export { auth_success , auth_error, auth_request}