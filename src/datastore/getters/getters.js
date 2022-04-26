import Vue from "vue";
import VueCryptojs from "vue-cryptojs";
import windowBreakPoint from "./get_window_break_point"
import getUserPermission from "./get_user_permission"
import getCurrentUser from "./get_current_user"
import getToken from "./get_token"
import getScrollBarTag from "./get_scrollbar_tag"

const getters = {
  windowBreakPoint: windowBreakPoint,
  scrollbarTag:getScrollBarTag,
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  userRole: (state) => state.role.uRole,
  passPhrase: (state) => state.passPhrase,
  pgLoading: (state) => state.pgLoading,
  token: getToken,
  user:getCurrentUser,
  userPermission: getUserPermission,
};

export default getters;
