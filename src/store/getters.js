import Vue from "vue";
import VueCryptojs from "vue-cryptojs";

const getters = {
  // COMPONENT
  // vx-autosuggest
  // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  windowBreakPoint: (state) => {
    // This should be same as tailwind. So, it stays in sync with tailwind utility classes
    if (state.windowWidth >= 1200) return "xl";
    else if (state.windowWidth >= 992) return "lg";
    else if (state.windowWidth >= 768) return "md";
    else if (state.windowWidth >= 576) return "sm";
    else return "xs";
  },

  scrollbarTag: (state) => {
    return state.is_touch_device ? "div" : "VuePerfectScrollbar";
  },

  // Exalt Getters
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  userRole: (state) => state.role.uRole,
  passPhrase: (state) => state.passPhrase,
  pgLoading: (state) => state.pgLoading,
  token: (state) => {
    let dToken = Vue.CryptoJS.AES.decrypt(
      state.token,
      state.passPhrase
    ).toString(Vue.CryptoJS.enc.Utf8);

    return dToken;
  },
  user: (state) => {
    let dUser = Vue.CryptoJS.AES.decrypt(state.user, state.passPhrase).toString(
      Vue.CryptoJS.enc.Utf8
    );

    return JSON.parse(dUser);
  },
  userPermission: (state) => {
    // return state.role.permissions;

    let userPerm = state.allRoles.find(
      (x) => x.role === localStorage.getItem("userRole")
    );
    console.log(localStorage.getItem("userRole"));
    return userPerm;
  },
};

export default getters;
