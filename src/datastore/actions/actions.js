import axios from "@/axios.js";
import getContents from "./get_contents";
import delContent from "./delete_contents";
import getContentsDetail from "./get_content_detail";
import getDatacontent from "./get_data_content";
import update from "./update";
import create from "./create";
import login from "./login";
import logout from "./logout";
import addContent from "./add_content";
import loadReportFromServer from "./load_server_reports"


const actions = {
  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({ commit, dispatch }, width) {
    commit("UPDATE_VERTICAL_NAV_MENU_WIDTH", width);
  },
  // VxAutoSuggest
  updateStarredPage({ commit, dispatch }, payload) {
    commit("UPDATE_STARRED_PAGE", payload);
  },
  // The Navbar
  arrangeStarredPagesLimited({ commit, dispatch }, list) {
    commit("ARRANGE_STARRED_PAGES_LIMITED", list);
  },
  arrangeStarredPagesMore({ commit, dispatch }, list) {
    commit("ARRANGE_STARRED_PAGES_MORE", list);
  },
  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({ commit, dispatch }) {
    commit("TOGGLE_CONTENT_OVERLAY");
  },
  updateTheme({ commit, dispatch }, val) {
    commit("UPDATE_THEME", val);
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({ commit, dispatch }, payload) {
    commit("UPDATE_USER_INFO", payload);
  },

  // Actions
  delContent,
  getContentsDetail,
  getDatacontent,
  getContents,
  update,
  create,
  addContent,
  login,
  logout,
  loadReportFromServer
};

export default actions;
