import Vue from "vue";
import Router from "vue-router";
import store from "./datastore/store.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue"),
        },
        {
          path: "/companies",
          name: "companies",
          component: () => import("./views/Companies.vue"),
        },
        {
          path: "/reports",
          name: "reports",
          component: () => import("./views/Reports.vue"),
        },
        {
          path: "/notifications",
          name: "notifications",
          component: () => import("./views/Notifications.vue"),
        },
        {
          path: "/view-profile/:id",
          name: "view-profile",
          component: () => import("./views/ViewProfile.vue"),
        },
        {
          path: "/trucks",
          name: "trucks",
          component: () => import("./views/Trucks.vue"),
        },
        {
          path: "/truck/:id",
          name: "viewtruck",
          component: () => import("./views/TruckView.vue"),
        },
        {
          path: "/material-categories",
          name: "material-categories",
          component: () => import("./views/MaterialCategories.vue"),
        },
        {
          path: "/materials",
          name: "materials",
          component: () => import("./views/Materials.vue"),
        },

        {
          path: "/material/:id",
          name: "materialView",
          component: () => import("./views/MaterialView.vue"),
        },
        {
          path: "/orders",
          name: "orders",
          component: () => import("./views/Orders.vue"),
        },
        {
          path: "/wallet",
          name: "wallet",
          component: () => import("./views/Wallet.vue"),
        },
        {
          path: "/invoices",
          name: "invoices",
          component: () => import("./views/Invoices.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("./views/Profile.vue"),
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "login",
          name: "page-login",
          meta: {
            requiresVisitor: true,
          },
          component: () => import("@/views/pages/login/Login.vue"),
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue"),
        },
      ],
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404",
    },
  ],
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.isLoggedIn) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
