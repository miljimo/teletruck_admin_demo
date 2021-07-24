import axios from "@/axios.js";

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
  delContent({ commit, dispatch, getters }, apiData) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `${apiData.path}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.status === 401 ||
              err.response.status === 406 ||
              err.response.status === 403
            ) {
              dispatch("logout");
            }
          }
          reject(err);
        });
    });
  },
  getContentsDetail({ commit, dispatch, getters }, fetch) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `${fetch.path}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.status === 401 ||
              err.response.status === 406 ||
              err.response.status === 403
            ) {
              dispatch("logout");
            }
          }
          reject(err);
        });
    });
  },
  getDatacontent({ commit, dispatch, getters }, fetch) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `${fetch.path}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.status === 401 ||
              err.response.status === 406 ||
              err.response.status === 403
            ) {
              dispatch("logout");
            }
          }
          reject(err);
        });
    });
  },
  getContents({ commit, dispatch, getters }, fetch) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `${fetch.path}?&page=${fetch.pageNo}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.status === 401 ||
              err.response.status === 406 ||
              err.response.status === 403
            ) {
              dispatch("logout");
            }
          }
          reject(err);
        });
    });
  },
  update({ commit, dispatch, getters }, apiData) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `${apiData.path}`,
        data: apiData.data,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.status === 401 ||
              err.response.status === 406 ||
              err.response.status === 403
            ) {
              dispatch("logout");
            }
          }
          reject(err);
        });
    });
  },
  create({ commit, dispatch, getters }, apiData) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `${apiData.path}`,
        data: apiData.data,
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.status === 401 ||
              err.response.status === 406 ||
              err.response.status === 403
            ) {
              dispatch("logout");
            }
          }
          reject(err);
        });
    });
  },
  addContent({ commit, dispatch, getters }, content) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `content/${content.path}/add`,
        data: content.data,
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.status === 401 ||
              err.response.status === 406 ||
              err.response.status === 403
            ) {
              dispatch("logout");
            }
          }
          reject(err);
        });
    });
  },
  login({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: "auth/login",
        data: data,
        method: "POST",
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("adminData");

      delete axios.defaults.headers.common["Authorization"];
      location.reload();
      resolve();
    });
  },
};

export default actions;
