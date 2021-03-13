import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
import Vue2Filters from "vue2-filters";
import InputTag from "vue-input-tag";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */);
import VueYouTubeEmbed from "vue-youtube-embed";

import VueCryptojs from "vue-cryptojs";
Vue.use(VueCryptojs);
Vue.use(Vue2Filters);
Vue.use(VueYouTubeEmbed);

// axios
// import axios from './axios.js'
// Vue.prototype.$http = axios

// Vuexy Admin Filters
import "./filters/filters";

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

// Theme Configurations
import "../themeConfig.js";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// API Calls
import "./http/requests";

// mock
import "./fake-db/index.js";

// Vuex Store
import store from "./store/store";

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Feather font icon
require("./assets/css/iconfont.css");

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

import moment from "moment";

Vue.prototype.moment = moment;

// Roles & Permission
import VueRouterUserRoles from "vue-router-user-roles";
Vue.use(VueRouterUserRoles, { router });

// This would usually be an AJAX call to the server or a cookie check
// Let's assume the user hasn't logged in yet so they're a guest for now.

Vue.mixin({
  methods: {
    // trunc(content, limit) {},
  },
});

Vue.config.productionTip = false;
Vue.prototype.$passPhrase = store.getters.passPhrase;
Vue.component("input-tag", InputTag);

let authenticate = Promise.resolve({ role: "guest" });
authenticate.then((user) => {
  Vue.prototype.$user.set(user);
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
