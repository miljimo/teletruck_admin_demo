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

  getUser({ commit, dispatch, getters }, userId) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `user/${userId}`,
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
  getUsers({ commit, dispatch, getters }, pageNo) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `users?page=${pageNo}`,
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

  deleteVideo({ commit, dispatch, getters }, contID) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `video/${contID}`,
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
  delContent({ commit, dispatch, getters }, contID) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `content/${contID}`,
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
  deleteContent({ commit, dispatch, getters }, contID) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `blog/${contID}`,
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
  editBlog({ commit, dispatch, getters }, blog) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: "blog/edit",
        data: blog,
        method: "PATCH",
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

  editContent({ commit, dispatch, getters }, content) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `content/${content.path}/edit`,
        data: content.data,
        method: "PATCH",
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
  getVideos({ commit, dispatch, getters }, pageNo) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `videos?page=${pageNo}`,
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
  getBlog({ commit, dispatch, getters }, id) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `blog/${id}`,
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
  getBlogs({ commit, dispatch, getters }, pageNo) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `blogs?page=${pageNo}`,
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
  getBlog({ commit, dispatch, getters }, id) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `blog/${id}`,
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
  getContent({ commit, dispatch, getters }, fetch) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: `content/${id}`,
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

  addVideo({ commit, dispatch, getters }, video) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: "video/add",
        data: video,
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
  addBlog({ commit, dispatch, getters }, blog) {
    return new Promise((resolve, reject) => {
      const userToken = getters.token;
      axios({
        url: "blog/add",
        data: blog,
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
  getMaternal() {
    return new Promise((resolve, reject) => {
      axios({
        url: `maternal`,
        method: "GET",
      })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
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
