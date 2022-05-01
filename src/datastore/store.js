import Vue from 'vue';
import Vuex from 'vuex';

import state from "./states/state"
import getters from "./getters/getters"
import mutations from "./mutations/mutations"
import actions from "./actions/actions"

Vue.use(Vuex)

export default new Vuex.Store({
  getters:getters,
  mutations:mutations, 
  state:state,
  actions:actions,
  strict: process.env.NODE_ENV !== 'production'
})