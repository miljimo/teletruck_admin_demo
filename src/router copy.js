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
      component: () => import("./layouts/main/Main.vue"),
      meta: {
        requiresAuth: true,
      },
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
          path: "/support-email",
          redirect: "/support-email/inbox",
          name: "support-email",
          component: () => import("./views/Email.vue"),
        },
        {
          path: "/support-email/:filter",
          component: () => import("./views/Email.vue"),
          meta: {
            rule: "editor",
            parent: "email",
            no_scroll: true,
          },
        },
        {
          path: "/support-chat",
          name: "support-chat",
          component: () => import("./views/Chat.vue"),
        },
        {
          path: "/support-todo",
          redirect: "/support-todo/all",
          name: "todo",
        },
        {
          path: "/support-todo/:filter",
          component: () => import("./views/Todo.vue"),
          meta: {
            rule: "editor",
            parent: "todo",
            no_scroll: true,
          },
        },
        {
          path: "/support-calendar",
          name: "support-calendar",
          component: () => import("./views/Calendar.vue"),
        },
        {
          path: "/account-admins",
          name: "account-admins",
          component: () => import("./views/Admins.vue"),
        },
        {
          path: "/create-admin-account",
          name: "create-admin-account",
          component: () => import("./views/CreateAdmin.vue"),
        },
        {
          path: "/account-church",
          name: "account-church",
          component: () => import("./views/Church.vue"),
        },
        {
          path: "/create-church-account",
          name: "create-church-account",
          component: () => import("./views/CreateChurch.vue"),
        },
        {
          path: "/create-branch/:id",
          name: "create-branch",
          component: () => import("./views/CreateBranch.vue"),
        },
        {
          path: "/view-branch",
          name: "view-branch",
          component: () => import("./views/ViewBranch.vue"),
        },
        {
          path: "/church-branch",
          name: "church-branch",
          component: () => import("./views/ChurchBranch.vue"),
        },
        {
          path: "/view-church/:id",
          name: "view-church",
          component: () => import("./views/ViewChurch.vue"),
        },
        {
          path: "/edit-church/:id",
          name: "edit-church",
          component: () => import("./views/EditChurch.vue"),
        },
        {
          path: "/edit-branch/:id",
          name: "edit-branch",
          component: () => import("./views/EditBranch.vue"),
        },
        {
          path: "/account-church/:userId",
          name: "account-church-view",
          component: () => import("@/views/ChurchView.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/",
              },
              {
                title: "Church Accounts",
                url: "/account-church",
              },
              {
                title: "View",
                active: true,
              },
            ],
            pageTitle: "Church Account",
            rule: "editor",
          },
        },
        {
          path: "/account-members",
          name: "account-members",
          component: () => import("./views/Members.vue"),
        },
        {
          path: "/view-member/:userId",
          name: "view-member-view",
          component: () => import("@/views/MemberView.vue"),
        },
        {
          path: "/account-members/:userId",
          name: "account-church-view",
          component: () => import("@/views/ChurchView.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/",
              },
              {
                title: "Members Accounts",
                url: "/account-members",
              },
              {
                title: "View",
                active: true,
              },
            ],
            pageTitle: "Church Account",
            rule: "editor",
          },
        },

        {
          path: "/account-all",
          name: "account-all",
          component: () => import("./views/AccountAll.vue"),
        },
        {
          path: "/account-withdrawals",
          name: "account-withdrawals",
          component: () => import("./views/AccountWithdrawals.vue"),
        },
        {
          path: "/transaction",
          name: "transaction",
          component: () => import("./views/Transactions.vue"),
        },
        {
          path: "/blogs",
          name: "blogs",
          component: () => import("./views/Blogs.vue"),
          // Permission
          // meta: {
          //   permissions: [
          //     {
          //       role: "guest",
          //       access: store.getters.userRole === "superAdmin",
          //       redirect: "/",
          //     },
          //   ],
          // },
        },
        {
          path: "/create-blog",
          name: "create-blog",
          component: () => import("./views/CreateBlog.vue"),
        },
        {
          path: "/view-blog/:id",
          name: "view-blog",
          component: () => import("./views/ViewBlog.vue"),
        },
        {
          path: "/edit-blog/:id",
          name: "edit-blog",
          component: () => import("./views/EditBlog.vue"),
        },
        {
          path: "/signup-requests",
          name: "signup-requests",
          component: () => import("./views/SignUpRequests.vue"),
        },
        {
          path: "/referrals",
          name: "referrals",
          component: () => import("./views/Referrals.vue"),
        },
        {
          path: "/app-settings",
          name: "app-settings",
          component: () => import("./views/AppSettings.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("./views/Profile.vue"),
        },
        {
          path: "/update-admin-profile",
          name: "update-admin-profile",
          component: () => import("./views/UpdateProfile.vue"),
        },
        {
          path: "/settings",
          name: "settings",
          component: () => import("./views/Settings.vue"),
        },
        {
          path: "/notifications",
          name: "notifications",
          component: () => import("./views/Notifications.vue"),
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
