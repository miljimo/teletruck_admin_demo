/*"""
  Mutations are way of  manipulate the store using store.commit functions
  help to reduce the component codes.

"""*/
"use strict"

import  UPDATE_STARRED_PAGE from "./pages/update_starred_page"
import  ARRANGE_STARRED_PAGES_MORE from "./pages/arrange_starred_page_more"
import  ARRANGE_STARRED_PAGES_LIMITED  from "./pages/arrange_starred_pages_limited"
import  UPDATE_VERTICAL_NAV_MENU_WIDTH from "./pages/update_vertical_nav_menu_width"
import  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE from "./pages/toggle_vertical_nav_menu_active"
import loading from "./pages/page_loading"
import  UPDATE_USER_INFO from "./users/update_user_info"
import logout  from "./users/logout"
import auth_success from "./users/auth_success.js"
import {auth_error, auth_request} from "./users/auth.js"
import updateReport from "./reports/updateReport"
import {updateTrucks,updateTruck,updateTruckMetadata,updateTruckPosition} from "./trucks/updateTrucks"
import updateTrucksPageMetaData from "./trucks/updateTrucksPageMetaData"
import  {updateManagers, updateManagersMetadata}  from "./updateManagers"
import {createErrors, clearErrors} from "./createErrors"
import updateManagerStatus from "./updateManagerStatus"
import updateOrders from "./orders/updateOrders"



const selectedOrder=(function(state, playload){
  let order   =  state.orders.find((function(order){
       return (order.id==playload)
  }))

  if(order){
      // we find the order with the id , therefore we can select it
      let index= state.selectedOrders.findIndex((id)=>{
        return id == order.id;
      })

      if(index < 0){
        // add the new order id
        state.selectedOrders.push(order.id)
      }
  }

})

const removeSelectedOrder =(function(state, orderID){
  let index= state.selectedOrders.findIndex((id)=>{
    return id ==  orderID;
  })

  if(index >= 0){
    //found then removed
    state.selectedOrders.splice(index, 1)
  }

})

const mutations = {
  UPDATE_USER_INFO,
  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE,
  UPDATE_VERTICAL_NAV_MENU_WIDTH,
  // VxAutoSuggest
  UPDATE_STARRED_PAGE,
  ARRANGE_STARRED_PAGES_LIMITED,
  ARRANGE_STARRED_PAGES_MORE,

  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val;
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val;
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val;
  },
  TOGGLE_CONTENT_OVERLAY(state, val) {
    state.bodyOverlay = val;
  },
  UPDATE_PRIMARY_COLOR(state, val) {
    state.themePrimaryColor = val;
  },
  UPDATE_THEME(state, val) {
    state.theme = val;
  },
  UPDATE_WINDOW_WIDTH(state, width) {
    state.windowWidth = width;
  },
  UPDATE_WINDOW_SCROLL_Y(state, val) {
    state.scrollY = val;
  },

  auth_request,
  auth_success,
  auth_error,
  logout,
  loading,
  pgLoading:loading,
  updateReport,
  updateTrucks,
  updateTruck,
  updateTrucksPageMetaData,
  updateManagers,
  updateManagersMetadata,
  updateTruckMetadata,
  updateTruckPosition,
  createErrors,
  clearErrors,
  updateManagerStatus,
  //Orders
  updateOrders,
  selectedOrder,
  removeSelectedOrder
 
};

export default mutations;
