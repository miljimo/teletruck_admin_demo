import state from './moduleChurchManagementState.js'
import mutations from './moduleChurchManagementMutations.js'
import actions from './moduleChurchManagementActions.js'
import getters from './moduleChurchManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}