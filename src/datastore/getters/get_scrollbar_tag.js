"use strict"

const getScrollBarTag = (function (state) {
    return state.is_touch_device ? "div" : "VuePerfectScrollbar";
});


export default getScrollBarTag;