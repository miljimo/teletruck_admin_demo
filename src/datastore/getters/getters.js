import Vue from "vue";
import VueCryptojs from "vue-cryptojs";
import windowBreakPoint from "./get_window_break_point"
import getUserPermission from "./get_user_permission"
import getCurrentUser from "./get_current_user"
import getToken from "./get_token"
import getScrollBarTag from "./get_scrollbar_tag"
import getReport from "./get_report"
import { getAllTrucks, getAllTrucksMeta,getCurrentTruck, getTruckMeta} from "./get_all_trucks"
import {getManagers, getManagersMetadata} from "./get_managers"



const stopTrackerPolling=(function(state){
  if(state.current_truck == null){
    state.stop_tracker_polling  = true;
  }
  if(state.current_truck.status != '2'){
    state.stop_tracker_polling  = true;
  }
  return state.stop_tracker_polling
})


const getErrors =(function(state){
  return state.errors;
})


const getters = {
  windowBreakPoint: windowBreakPoint,
  scrollbarTag:getScrollBarTag,
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  userRole: (state) => state.role.uRole,
  passPhrase: (state) => state.passPhrase,
  pgLoading: (state) => state.pgLoading,
  token: getToken,
  user:getCurrentUser,
  userPermission: getUserPermission,
  reports:getReport,
  all_trucks:getAllTrucks,
  all_trucks_meta:getAllTrucksMeta,
  getManagers,
  getManagersMetadata,
  getCurrentTruck,
  getTruckMeta,
  getCurrentTruck,
  stopTrackerPolling,
  getErrors
};

export default getters;