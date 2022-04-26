"use strict"



const auth_error =(function(state) {
  state.status = "error";
});

const auth_request=(function(state) {
  state.status = "loading";
});


export {  auth_error, auth_request}