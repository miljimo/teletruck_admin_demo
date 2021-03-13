import Vue from "vue";
import Router from "vue-router";
import store from "./store/store.js";

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
          path: "/pregnancy",
          name: "pregnancy",
          component: () => import("./views/Pregnancy.vue"),
        },
        {
          path: "/add-pregnancy-content",
          name: "add-pregnancy-content",
          component: () => import("./views/AddPregnancy.vue"),
        },
        {
          path: "/add-child-content",
          name: "add-child-content",
          component: () => import("./views/AddChild.vue"),
        },
        {
          path: "/add-blog",
          name: "add-blog",
          component: () => import("./views/AddBlog.vue"),
        },
        {
          path: "/child",
          name: "child",
          component: () => import("./views/Child.vue"),
        },
        {
          path: "/blogs",
          name: "blogs",
          component: () => import("./views/Blogs.vue"),
        },
        {
          path: "/blog/:id",
          name: "blog",
          component: () => import("./views/BlogView.vue"),
        },
        {
          path: "/view-content/:id",
          name: "view-content",
          component: () => import("./views/ViewContent.vue"),
        },

        {
          path: "/edit-blog/:id",
          name: "editblog",
          component: () => import("./views/EditBlog.vue"),
        },
        {
          path: "/edit-child-content/:id",
          name: "edit-child-content",
          component: () => import("./views/EditChild.vue"),
        },
        {
          path: "/edit-pregnancy-content/:id",
          name: "edit-pregnancy-content",
          component: () => import("./views/EditPregnancy.vue"),
        },
        {
          path: "/users",
          name: "users",
          component: () => import("./views/Users.vue"),
        },
        {
          path: "/videos",
          name: "videos",
          component: () => import("./views/Videos.vue"),
        },
        {
          path: "/add-video",
          name: "add-video",
          component: () => import("./views/AddVideo.vue"),
        },
        {
          path: "/settings",
          name: "settings",
          component: () => import("./views/Settings.vue"),
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
          component: () => import("@/views/pages/Login.vue"),
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
