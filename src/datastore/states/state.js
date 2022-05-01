import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList";
import themeConfig from "@/../themeConfig.js";
import colors from "@/../themeConfig.js";

// /////////////////////////////////////////////
// Helper
// /////////////////////////////////////////////

// *From Auth - Data will be received from auth provider

const userDefaults = {
  uid: 0, // From Auth
  displayName: "John Doe", // From Auth
  about:
    "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
  photoURL: require("@/assets/images/portrait/small/avatar-s-11.jpg"), // From Auth
  status: "online",
  userRole: "admin",
};
const accountUser = JSON.parse(localStorage.getItem("adminData"));

// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const is_touch_device = () => {
  var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  var mq = function(query) {
    return window.matchMedia(query).matches;
  };

  if ("ontouchstart" in window || window.DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return mq(query);
};

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

let userRole = window.localStorage.getItem("userRole");

const state = {
  AppActiveUser: accountUser,
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  is_touch_device: is_touch_device(),
  mainLayoutType: themeConfig.mainLayoutType || "vertical",
  navbarSearchAndPinList: navbarSearchAndPinList,
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: "default",
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  starredPages: navbarSearchAndPinList["pages"].data.filter(
    (page) => page.is_bookmarked
  ),
  theme: themeConfig.theme || "light",
  themePrimaryColor: colors.primary,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null,

  // Exalt State
  token: localStorage.getItem("token") || "",
  user: localStorage.getItem("user") || "",

  status: "",
  passPhrase: "!BaByDiaryy@.132]13",
  // Roles & Permission
  role: {
    uRole: localStorage.getItem("userRole")
      ? localStorage.getItem("userRole")
      : "guest",
    permissions: ["blogs"],
  },
  allRoles: [
    {
      role: "superAdmin",
      permissions: [
        "dashboard",
        "support",
        "email-tool",
        "chat-tool",
        "todo-tool",
        "calendar-tool",
        "account-church",
        "account-members",
        "account-admins",
        "account",
        "account-withdrawals",
        "transactions",
        "blog",
        "signup",
        "referrals",
        "app-settings",
        "profile",
        "settings",
      ],
    },
    {
      role: "admin",
      permissions: [
        "dashboard",
        "support",
        "email-tool",
        "chat-tool",
        "todo-tool",
        "calendar-tool",
        "account-church",
        "account-members",
        "account-admins",
        "account",
        "account-withdrawals",
        "transactions",
        "blog",
        "signup",
        "referrals",
        "app-settings",
        "profile",
        "settings",
      ],
    },
    {
      role: "accounting",
      permissions: [
        "dashboard",
        "account",
        "account-withdrawals",
        "transactions",
        "signup",
        "profile",
        "settings",
      ],
    },
    {
      role: "customerCare",
      permissions: [
        "dashboard",
        "support",
        "account-church",
        "account-members",
        "profile",
        "settings",
      ],
    },
  ],
    reports:{
     companies:0,
     trips:0,
     users:0,
     wallet:0,
  },
current_truck_id:0,
current_truck : {longitude:0, latitude:0, name:""},
truck_meta:{message:"some errors"},
trucks: [],
all_trucks_meta:{total:1, current_page:1},
managers:[],
managers_meta:{total:1, current_page:1},
current_tracker : {
    threadID:0,
    long:0 ,
    lat:0,
    name:"this.current_truck.name",
    disabled: true,
},
stop_tracker_polling:false,
};

export default state;
