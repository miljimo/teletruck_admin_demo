"use strict"



  // Updates user info in state and localstorage
  const UPDATE_USER_INFO =(function(state, payload) {
    // Get Data localStorage
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser;

    for (const property of Object.keys(payload)) {
      if (payload[property] != null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property];

        // Update key in localStorage
        userInfo[property] = payload[property];
      }
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  });

  export default UPDATE_USER_INFO;
