"use strict"
import Vue from "vue";
import VueCryptojs from "vue-cryptojs";

const getCurrentUser=(function(state){
    let dUser = Vue.CryptoJS.AES.decrypt(state.user, state.passPhrase).toString(
        Vue.CryptoJS.enc.Utf8
      );
      return JSON.parse(dUser);

});

export default getCurrentUser;