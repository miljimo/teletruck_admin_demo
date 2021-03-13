export default {
  SET_CHURCHES(state, churches) {
    state.churches = churches
  },
  REMOVE_RECORD(state, itemId) {
    const churchIndex = state.churches.findIndex((u) => u.id === itemId)
    state.churches.splice(churchIndex, 1)
  }
}