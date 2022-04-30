import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList";
import themeConfig from "@/../themeConfig.js";
import colors from "@/../themeConfig.js";



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

const state = {
  bodyOverlay: false,
  is_touch_device: is_touch_device(),
  mainLayoutType: themeConfig.mainLayoutType || "vertical",
  navbarSearchAndPinList: navbarSearchAndPinList,
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: "default",
  verticalNavMenuItemsMin: false,
  // Exalt State
  token: localStorage.getItem("token") || "",
  user: localStorage.getItem("user") || "",
  pgLoading: false,
  status: "",
  passPhrase: "!BaByDiaryy@.132]13",
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
}
};

export default state;
