"use strict"
import Vue from "vue"

const getToken=(function(state){
    let dToken = Vue.CryptoJS.AES.decrypt(
        state.token,
        state.passPhrase
      ).toString(Vue.CryptoJS.enc.Utf8);
  
      return dToken;
})
export default getToken;

