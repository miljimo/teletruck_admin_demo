import Vue from 'vue';
import Vuex from 'vuex';

import state from "./states/state"
import getters from "./getters/getters"
import mutations from "./mutations"
import actions from "./actions/actions"


Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})